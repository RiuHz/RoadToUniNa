'use strict';

import { DataTypes } from "sequelize";


export function createModel(database) {
    database.define('Partite', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        secondi: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('in-corso', 'in-pausa', 'terminata'),
            defaultValue: 'in-corso',
            allowNull: false
        }
    })
}
