'use strict';

import express from 'express';

export const router = express.Router();

router.get('/partite', (request, response, next) => {
    response.send('GET classifica delle partite');
});

router.get('/utenti', (request, response, next) => {
    response.send('GET classifica degli utenti');
});
