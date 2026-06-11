'use strict';

import express from 'express';

import {router as RouterPartite} from './routes/router-partite.js';
import {router as RouterClassifiche} from './routes/router-classifiche.js';
import {router as RouterLogin} from './routes/router-login.js';
import {router as RouterSignUp} from './routes/router-sign-up.js';

const app = express();
const PORT = 3000;

app.use('/partite', RouterPartite);
app.use('/classifiche', RouterClassifiche);
app.use('/login', RouterLogin);
app.use('/sign-up', RouterSignUp);

app.use(/.*/, express.static('public'));

app.use((error, request, response, next) => {
    console.error(error.stack);

    response.status(error.status || 500).json({
        error: error.message || 'Ops... Il server ha deciso di non funzionare'
    });
});

app.listen(PORT);
