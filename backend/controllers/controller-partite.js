'use strict';

import { Partite, Utenti, Link, Sequenze, database } from '../models/database.js';
import { HttpError } from '../errors/http-error.js';
import { WikiController } from './controller-wiki.js';


export class PartiteController {
    
    static async getAll(request) {
        const { giocatore, limite, status, ordine } = request.query;

        const query = {};

        if (giocatore || status) {
            query.where = {};
        }

        if (giocatore) {
            query.where.UtentiUsername = giocatore;
        }

        if (status) {
            query.where.status = status;
        }

        if (limite) {
            query.limit = limite;
        }

        if (ordine) {
            query.order = [
                ['id', ordine]
            ];
        }

        const partite =  await Partite.findAll({
            ...query,
            include: [
                {
                    model: Utenti,
                    attributes: ['username']
                },
                {
                    model: Link,
                    through: {
                        attributes: ['numeroSequenza']
                    }
                }
            ]
        });

        return partite.map(partita => {
            const linkIniziale = partita.Link.find(link => link.Sequenze.numeroSequenza === 0);

            return {
                'id': partita.id,
                'giocatore': partita.Utenti?.username,
                'secondi-trascorsi': partita.secondi,
                'link-iniziale': linkIniziale?.url,
                'numero-passaggi': partita.Links.length
            };
        });
    }

    static async create(request) {
        const conflitto = await Partite.findOne({
            where: {
                UtentiUsername: request.username,
                status: ['in-corso', 'in-pausa']
            }
        });

        if (conflitto) {
            throw new HttpError(409, 'L\'utente ha già una partita in corso');
        }

        const linkIniziale = await WikiController.getRandomLink();

        database.transaction(async (t) => {
            const partita = await Partite.create(
                {
                    UtentiUsername: request.username
                },
                {
                    transaction: t
                }
            );

            const link = await Link.create(
                {
                    url: linkIniziale
                },
                {
                    transaction: t
                }
            );

            await Sequenze.create(
                {
                    PartiteId: partita.id,
                    LinkId: link.id,
                    numeroSequenza: 0
                },
                {
                    transaction: t
                }
            );
        });

        return {
            'link-iniziale': linkIniziale
        }
    }

    static async getByID(request) {
        const partita = await Partite.findByPk(request.params.id, {
            include: [
                {
                    model: Link,
                    through: {
                        attributes: ['numeroSequenza']
                    },
                    attributes: ['url']
                }
            ],
            order: [[Link, Sequenze, 'numeroSequenza', 'ASC']]
        });

        if (!partita) {
            throw new HttpError(404, 'ID della partita non valido');
        }

        return {
            'secondi-trascorsi': partita.secondi,
            'stato': partita.status,
            'sequenza': partita.Links.map(link => ({
                'numero-sequenza': link.Sequenze.numeroSequenza,
                'link': link.url
            }))
        }
    }

    static async updateStatoByID(request) {
        const partita = await Partite.findByPk(request.params.id);

        if (!partita) {
            throw new HttpError(404, 'ID della partita non valido');
        }

        if (partita.username !== request.username) {
            throw new HttpError(403, 'L\'utente non può modificare questa risorsa');
        }

        await Partite.update(
            {
                status: request.body['stato']
            },
            {
                where: {
                    id: request.params.id
                }
            }
        );
    }

    static async updateSequenzaByID(request) {
        const link = request.body['link-successivo'];

        if (!WikiController.isValidLink(link)) {
            throw new HttpError(400, 'Link non valido');
        }

        const partita = await Partite.findByPk(request.params.id, {
            include: [
                {
                    model: Link,
                    through: {
                        attributes: ['numeroSequenza']
                    },
                    attributes: ['url']
                }
            ],
            order: [[Link, Sequenze, 'numeroSequenza', 'ASC']]
        });

        if (!partita) {
            throw new HttpError(404, 'ID della partita non valido');
        }

        if (partita.username !== request.username) {
            throw new HttpError(403, 'L\'utente non può modificare questa risorsa');
        }

        database.transaction(async (t) => {
            const ultimaSequenza = await Sequenze.findOne(
                {
                    where: { PartiteId: request.params.id },
                    order: [['numeroSequenza', 'DESC']],
                    transaction: t
                }
            );

            const link = await Link.create(
                {
                    url
                },
                {
                    transaction: t
                }
            );

            await Sequenze.create(
                {
                    PartiteId: id,
                    LinkId: link.id,
                    numeroSequenza: ultimaSequenza.numeroSequenza + 1
                },
                {
                    transaction: t
                }
            );
        });
    }

}
