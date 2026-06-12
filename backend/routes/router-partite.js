'use strict';

import express from 'express';

import { PartiteController } from '../controllers/controller-partite.js';
import { validazioneQueryPartite } from '../middleware/validazione-query-partite.js';
import { validazioneJWT } from '../middleware/validazione-jwt-token.js';

export const router = express.Router();

router.get('/', [validazioneQueryPartite], (request, response, next) => {
    PartiteController.getAll(request)
        .then(partite => response.json(partite))
        .catch(error => next(error));
});

router.post('/', [validazioneJWT], (request, response, next) => {
    response.send('POST partite!');
});

router.get('/:id', (request, response, next) => {
    PartiteController.getByID(request)
        .then(partita => response.json(partita))
        .catch(error => next(error));
});

router.patch('/:id', [validazioneJWT], (request, response, next) => {
    response.send('PATCH partita con id ' + request.params['id']);
});
