'use strict';

import { ClassificheController } from '../controllers/controller-classifiche.js';
import { validazioneQueryClassifichePartite, validazioneQueryClassificheUtenti } from '../middleware/validazione-query-classifiche.js';

import express from 'express';

export const router = express.Router();

router.get('/partite', [validazioneQueryClassifichePartite], (request, response, next) => {
    const { tipologia, limite } = request.query;

    switch (tipologia) {
        case 'numero-passi':
            ClassificheController.getPartiteByNumeroPassi(request)
                .then(partite => response.json(partite))
                .catch(error => next(error));
            break;
    };
});

router.get('/utenti', [validazioneQueryClassificheUtenti], (request, response, next) => {
    const { tipologia, limite } = request.query;

    switch (tipologia) {
        case 'sfide-completate':
            ClassificheController.getUtentiBySfideCompletate(request)
                .then(utenti => response.json(utenti))
                .catch(error => next(error));
    };
});
