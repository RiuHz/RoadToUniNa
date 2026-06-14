'use strict';

import { DataTypes } from "sequelize";


export function createModel(database) {
    database.define('Sequenze',
        {
            numeroSequenza: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }
    );
}
