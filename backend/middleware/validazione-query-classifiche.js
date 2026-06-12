'use strict';

import { HttpError } from '../errors/http-error.js';


export function validazioneQueryClassifichePartite(request, response, next) {
    const { tipologia, limite } = request.query;

    if (tipologia === undefined) {
        throw new HttpError(400, 'Tipologia non valida');
    }

    const tipologieValide = [
        'numero-passi'
    ];

    if (!tipologieValide.includes(tipologia)) {
        throw new HttpError(400, 'Tipologia non valida');
    }

    if (limite !== undefined) {
        const parse = Number(limite);

        if (!Number.isInteger(parse) || parse <= 0) {
            throw new HttpError(400, 'Limite non valido');
        }

        request.query.limite = parse;
    }

    next();
}

export function validazioneQueryClassificheUtenti(request, response, next) {
    const { tipologia, limite } = request.query;

    if (tipologia === undefined) {
        throw new HttpError(400, 'Tipologia non valida');
    }

    const tipologieValide = [
        'sfide-completate'
    ];

    if (!tipologieValide.includes(tipologia)) {
        throw new HttpError(400, 'Tipologia non valida');
    }

    if (limite !== undefined) {
        const parse = Number(limite);

        if (!Number.isInteger(parse) || parse <= 0) {
            throw new HttpError(400, 'Limite non valido');
        }

        request.query.limite = parse;
    }

    next();
}
