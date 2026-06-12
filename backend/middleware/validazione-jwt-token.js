'use strict';

import { HttpError } from '../errors/http-error.js';

import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;


export function validazioneJWT(request, response, next) {
    const header = request.headers['authorization'];

    if (!header) {
        throw new HttpError(401, 'Token mancante');
    }

    const token = header.split(' ')[1];

    if (!token) {
        throw new HttpError(401, 'Token mancante');
    }

    jwt.verify(token, JWT_SECRET, (error, utente) => {
        if (error) {
            throw new HttpError(401, 'Token non valido');
        }

        request.username = utente.username;

        next();
    });
}
