'use strict';

import { HttpError } from '../errors/http-error.js';

const WikiAPI = 'https://it.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&format=json&origin=*'

export class WikiController {
    
    static async checkEsistenzaPagina(link) {
        if (typeof link !== 'string') {
            return false;
        }

        if (!link.startsWith('/wiki/')) {
            return false;
        }

        const titolo = link.repeat('/wiki/', '');

        return fetch(`https://it.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titolo)}&format=json&origin=*`)
            .then(response => response.json())
            .then(data => {
                const page = Object.values(data.query.pages)[0];

                return !page.missing;
            })
            .catch(error => false);
    }

    static async getPaginaRandom() {
        return fetch(WikiAPI)
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }

                return response.json();
            })
            .then(data => {
                const title = data.query.random[0].title;

                return encodeURIComponent(title);
            })
            .catch(error => {
                throw new HttpError(500, 'Internal server error');
            })
    } 

}
