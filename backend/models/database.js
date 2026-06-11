'use strict';

import { Sequelize } from 'sequelize';
import { createModel as createLinkModel } from './link.js';
import { createModel as createPartiteModel } from './partite.js';
import { createModel as createSequenzeModel } from './sequenze.js';
import { createModel as createUtentiModel } from './utenti.js';

import 'dotenv/config.js';

export const database = new Sequelize(
    process.env.DB_CONNECTION_URI,
    { dialect: process.env.DIALECT }
);

createLinkModel(database);
createPartiteModel(database);
createSequenzeModel(database);
createUtentiModel(database);

export const {Link, Partite, Sequenze, Utenti} = database.models;

Utenti.hasMany(Partite);
Partite.belongsTo(Utenti);

Partite.belongsToMany(Link, { through: Sequenze });
Link.belongsToMany(Partite, { through: Sequenze });

database.sync()
    .then( () => {
        console.log('Database sincronizzato con successo');
    })
    .catch( error => {
        console.err('Errore nella sincronizzazione col database: ' + error.message);
    });
