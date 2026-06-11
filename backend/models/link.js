'use strict';

import { DataTypes } from 'sequelize';


export function createModel(database) {
    database.define('Link', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}
