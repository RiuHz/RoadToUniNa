'use strict';

import { Partite, Utenti, Pagine, Sequenze, database } from '../models/database.js';
import { HttpError } from '../errors/http-error.js';
import { WikiController } from './controller-wiki.js';


export class PartiteController {
    
    static async getAll(request) {
        const { giocatore, limite, stato, ordine } = request.query;

        const query = {};

        if (giocatore || stato) {
            query.where = {};
        }

        if (giocatore) {
            query.where.UtentiUsername = giocatore;
        }

        if (stato) {
            query.where.status = stato;
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
                    model: Pagine,
                    through: {
                        attributes: ['numeroSequenza']
                    }
                }
            ]
        });

        return partite.map(partita => {
            return {
                'id': partita.id,
                'giocatore': partita.Utenti?.username,
                'secondi-trascorsi': partita.secondi,
                'stato': partita.status,
                'sequenza': partita.Pagines.map(pagina => ({
                    'numero-sequenza': pagina.Sequenze.numeroSequenza,
                    'link': '/wiki/' + pagina.titolo
                }))
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

        const paginaIniziale = await WikiController.getPaginaRandom();

        database.transaction(async (t) => {
            const partita = await Partite.create(
                {
                    UtentiUsername: request.username
                },
                {
                    transaction: t
                }
            );

            const pagina = await Pagine.create(
                {
                    titolo: paginaIniziale
                },
                {
                    transaction: t
                }
            );

            await Sequenze.create(
                {
                    PartiteId: partita.id,
                    PagineId: pagina.id,
                    numeroSequenza: 0
                },
                {
                    transaction: t
                }
            );
        });

        return {
            'link-iniziale': '/wiki/' + paginaIniziale
        }
    }

    static async getByID(request) {
        const partita = await Partite.findByPk(request.params.id, {
            include: [
                {
                    model: Pagine,
                    through: {
                        attributes: ['numeroSequenza']
                    },
                    attributes: ['titolo']
                }
            ],
            order: [[Pagine, Sequenze, 'numeroSequenza', 'ASC']]
        });

        if (!partita) {
            throw new HttpError(404, 'ID della partita non valido');
        }

        return {
            'id': partita.id,
            'giocatore': partita.Utenti?.username,
            'secondi-trascorsi': partita.secondi,
            'stato': partita.status,
            'sequenza': partita.Pagines.map(pagina => ({
                'numero-sequenza': pagina.Sequenze.numeroSequenza,
                'link': '/wiki/' + pagina.titolo
            }))
        }
    }

    static async updateStatoByID(request) {
        const partita = await Partite.findByPk(request.params.id);

        if (!partita) {
            throw new HttpError(404, 'ID della partita non valido');
        }

        if (partita.UtentiUsername !== request.username) {
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

        if (!WikiController.checkEsistenzaPagina(link)) {
            throw new HttpError(400, 'Link non valido');
        }

        const partita = await Partite.findByPk(request.params.id, {
            include: [
                {
                    model: Pagine,
                    through: {
                        attributes: ['numeroSequenza']
                    },
                    attributes: ['titolo']
                }
            ],
            order: [[Pagine, Sequenze, 'numeroSequenza', 'ASC']]
        });

        if (!partita) {
            throw new HttpError(404, 'ID della partita non valido');
        }

        if (partita.UtentiUsername !== request.username) {
            throw new HttpError(403, 'L\'utente non può modificare questa risorsa');
        }

        const titolo = encodeURIComponent(link.replace('/wiki/', ''));

        database.transaction(async (t) => {
            const ultimaSequenza = await Sequenze.findOne(
                {
                    where: { PartiteId: request.params.id },
                    order: [['numeroSequenza', 'DESC']],
                    transaction: t
                }
            );

            const pagina = await Pagine.create(
                {
                    titolo: titolo
                },
                {
                    transaction: t
                }
            );

            await Sequenze.create(
                {
                    PartiteId: request.params.id,
                    PagineId: pagina.id,
                    numeroSequenza: ultimaSequenza.numeroSequenza + 1
                },
                {
                    transaction: t
                }
            );
        });
    }

}
