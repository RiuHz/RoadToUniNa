'use strict';

import { ClassificheController } from '../controllers/controller-classifiche.js';
import { validazioneQueryClassifichePartite, validazioneQueryClassificheUtenti } from '../middleware/validazione-query-classifiche.js';

import express from 'express';

export const router = express.Router();

router.get('/partite', [validazioneQueryClassifichePartite], (request, response, next) => {
    const { tipo, limite } = request.query;

    switch (tipo) {
        case 'numero-passi':
            ClassificheController.getPartiteByNumeroPassi(request)
                .then(partite => response.json({ classifica: partite }))
                .catch(error => next(error));
    };
});

router.get('/utenti', [validazioneQueryClassificheUtenti], (request, response, next) => {
    const { tipo, limite } = request.query;

    switch (tipo) {
        case 'sfide-completate':
            ClassificheController.getUtentiBySfideCompletate(request)
                .then(utenti => response.json({ classifica: utenti }))
                .catch(error => next(error));
    };
});
