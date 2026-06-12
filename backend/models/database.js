'use strict';

import { Sequelize } from 'sequelize';
import { createModel as createPagineModel } from './pagine.js';
import { createModel as createPartiteModel } from './partite.js';
import { createModel as createSequenzeModel } from './sequenze.js';
import { createModel as createUtentiModel } from './utenti.js';

import 'dotenv/config.js';

export const database = new Sequelize(
    process.env.DB_CONNECTION_URI,
    { dialect: process.env.DIALECT }
);

createPagineModel(database);
createPartiteModel(database);
createSequenzeModel(database);
createUtentiModel(database);

export const {Pagine, Partite, Sequenze, Utenti} = database.models;

Utenti.hasMany(Partite);
Partite.belongsTo(Utenti);

Partite.belongsToMany(Pagine, { through: Sequenze });
Pagine.belongsToMany(Partite, { through: Sequenze });

database.sync()
    .then( () => {
        console.log('Database sincronizzato con successo');
    })
    .catch( error => {
        console.err('Errore nella sincronizzazione col database: ' + error.message);
    });
