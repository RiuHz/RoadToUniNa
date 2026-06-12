'use strict';

import express from 'express';

import { PartiteController } from '../controllers/controller-partite.js';
import { validazioneQueryPartite } from '../middleware/validazione-query-partite.js';
import { validazioneJWT } from '../middleware/validazione-jwt-token.js';
import { validazioneStatusPartite } from '../middleware/validazione-body-partite.js';

export const router = express.Router();

router.get('/', [validazioneQueryPartite], (request, response, next) => {
    PartiteController.getAll(request)
        .then(partite => response.json(partite))
        .catch(error => next(error));
});

router.post('/', [validazioneJWT], (request, response, next) => {
    PartiteController.create(request)
        .then(linkIniziale => response.json(linkIniziale))
        .catch(error => next(error));
});

router.get('/:id', (request, response, next) => {
    PartiteController.getByID(request)
        .then(partita => response.json(partita))
        .catch(error => next(error));
});

router.patch('/:id/status', [validazioneJWT, validazioneStatusPartite], (request, response, next) => {
    PartiteController.updateStatoByID(request)
        .then(request.send())
        .catch(error => next(error));
});

router.patch('/:id/sequenza', [validazioneJWT], (request, response, next) => {
    PartiteController.updateSequenzaByID(request)
        .then(request.send())
        .catch(error => next(error));
});
