'use strict';

import { Sequelize } from 'sequelize';
import { Partite, Utenti, Link } from '../models/database.js';


export class ClassificheController {

    static async getPartiteByNumeroPassi(request) {
        const { tipo, limite } = request.query;

        const partite = await Partite.findAll({
            attributes: [
                'id',
                [Sequelize.col('Utenti.username'), 'giocatore'],
                [Sequelize.fn('COUNT', Sequelize.col('Links.id')), 'punteggio']
            ],
            include: [
                {
                    model: Utenti,
                    required: true
                },
                {
                    model: Link,
                    required: false
                }
            ],
            group: ['Partite.id', 'Utenti.username'],
            order: [[Sequelize.literal('punteggio'), 'DESC']],
            limit: limite ? Number(limite) : undefined
        });


        return partite.map(partita => ({
            'id': partita.id,
            'giocatore': partita.getDataValue('giocatore'),
            'punteggio': Number(partita.getDataValue('punteggio'))
        }));
    }

    static async getUtentiBySfideCompletate(request) {
        const { tipo, limite } = request.query;

        const utenti = await Utenti.findAll({
            attributes: [
                'username',
                [Sequelize.fn('COUNT', Sequelize.col('Partites.id')), 'punteggio']
            ],
            include: [
                {
                    model: Partite,
                    where: {
                        status: 'terminata'
                    },
                    required: false
                }
            ],
            group: ['Utenti.username'],
            order: [[Sequelize.literal('punteggio'), 'DESC']],
            limit: limite ? limite : undefined
        })

        return utenti.map(utente => ({
            'giocatore': utente.username,
            'punteggio': Number(utente.getDataValue('punteggio'))
        }));
    }

}
