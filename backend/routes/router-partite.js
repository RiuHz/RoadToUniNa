'use strict';

import express from 'express';

import { PartiteController } from '../controllers/controller-partite.js';
import { validateQueryPartite } from '../middleware/validazione-query-partite.js';

export const router = express.Router();

router.get('/', [validateQueryPartite], (request, response, next) => {
    PartiteController.getAll(request)
        .then(partite => response.send(partite))
        .catch(error => next(error));
});

router.post('/', (request, response, next) => {
    response.send('POST partite!');
});

router.get('/:id', (request, response, next) => {
    response.send('GET partita con id ' + request.params['id']);
});

router.patch('/:id', (request, response, next) => {
    response.send('PATCH partita con id ' + request.params['id']);
});
