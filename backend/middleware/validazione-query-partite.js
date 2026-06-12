'use strict';

import { HttpError } from '../errors/http-error.js';


export function validazioneQueryPartite(request, response, next) {
    const { giocatore, limite, status, ordine } = request.query;

    if (status !== undefined) {
        const statusValidi = [
            'in-corso',
            'in-partita',
            'terminata'
        ];

        if (!statusValidi.includes(status)) {
            throw new HttpError(400, 'Status non valido');
        }
    }

    if (ordine !== undefined) {
        const values = ['asc', 'desc'];

        if (!values.includes(ordine)) {
            throw new HttpError(400, 'Ordine non valido');
        }
    }

    if (limite !== undefined) {
        const parse = Number(limite);

        if (!Number.isInteger(parse) || parse <= 0) {
            throw new HttpError(400, 'Limite non valido');
        }

        request.query.limite = parse;
    }

    if (giocatore !== undefined && typeof giocatore !== 'string') {
        throw new HttpError(400, 'Giocatore non valido');
    }

    next();
}
