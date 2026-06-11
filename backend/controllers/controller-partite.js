'use strict';

import { Partite, Utenti, Link } from '../models/database.js';


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
        await Partite.create({
            UtentiUsername: ''// ! Need to link the user to the Partita
        }).save();
    }

    static async getByID(request) {
        return Partite.findByPk(request.params.id);
    }

    static async updateByID(request) {

    }

}
