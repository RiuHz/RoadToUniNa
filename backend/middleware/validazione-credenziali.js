'use strict';

import { HttpError } from "../errors/http-error.js";

export function validazioneCredenziali(request, response, next) {
    const { username, password } = request.body;

    if (username === undefined || typeof username !== 'string') {
        throw new HttpError(400, 'Username non valido');
    }

    if (username.length < 4) {
        throw new HttpError(400, 'Username troppo breve');
    }

    if (username.length > 16) {
        throw new HttpError(400, 'Username troppo lungo');
    }

    if (password === undefined || typeof password !== 'string') {
        throw new HttpError(400, 'Password non valida');
    }

    if (password.length < 4) {
        throw new HttpError(400, 'Password troppo breve');
    }

    if (password.length > 16) {
        throw new HttpError(400, 'Password troppo lunga');
    }

    next();
}
