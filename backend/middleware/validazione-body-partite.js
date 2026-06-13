'use strict';


import { HttpError } from '../errors/http-error.js';


export function validazioneStatusPartite(request, response, next) {
    const status = request.body['stato'];

    if (status === undefined) {
        throw new HttpError(400, 'Stato della partita non valido');
    }

    const statusValidi = [
        'in-corso',
        'in-pausa'
    ];

    if (!statusValidi.includes(status)) {
        throw new HttpError(400, 'Stato non valido');
    }

    next();
}
