'use strict';

import { DataTypes } from 'sequelize';

import bcrypt from 'bcrypt';


export function createModel(database) {
    database.define('Utenti', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('password', bcrypt.hashSync(value, 12));
            }
        },      
    });
}
