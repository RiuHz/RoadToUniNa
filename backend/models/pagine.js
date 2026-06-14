'use strict';

import { DataTypes } from 'sequelize';


export function createModel(database) {
    database.define('Pagine',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey: true
            },
            titolo: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );
}
