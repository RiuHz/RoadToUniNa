'use strict';

import { AuthController } from '../controllers/controller-auth.js';
import { validazioneCredenziali } from '../middleware/validazione-credenziali.js';

import express from 'express';

export const router = express.Router();

router.post('/login', [validazioneCredenziali], (request, response, next) => {
    AuthController.login(request)
        .then(token => response.json({ token: token }))
        .catch(error => next(error));
});

router.post('/sign-up', [validazioneCredenziali], (request, response, next) => {
    AuthController.signUp(request)
        .then(() => response.send())
        .catch(error => next(error));
});
