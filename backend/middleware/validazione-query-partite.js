'use strict';

import { HttpError } from '../errors/http-error.js';


export function validazioneQueryPartite(request, response, next) {
    const { giocatore, limite, stato, ordine } = request.query;

    if (stato !== undefined) {
        const statusValidi = [
            'in-corso',
            'in-pausa',
            'terminata'
        ];

        if (!statusValidi.includes(stato)) {
            throw new HttpError(400, 'Stato non valido');
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
