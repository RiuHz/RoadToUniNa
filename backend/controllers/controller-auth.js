'use strict';

import { HttpError } from '../errors/http-error.js';
import { Utenti } from '../models/database.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const JWT_SECRET = process.env.JWT_SECRET;


export class AuthController {

    static async login(request) {
        const { username, password } = request.body;

        const utente = await Utenti.findByPk(username);

        if (!utente || !bcrypt.compareSync(password, utente.password)) {
            throw new HttpError(400, 'Credenziali non valide');
        }

        return jwt.sign({ username: request.body.username}, JWT_SECRET, { expiresIn: '1h' });
    }

    static async signUp(request) {
        const { username, password } = request.body;

        const conflitto = await Utenti.findByPk(username);

        if (conflitto) {
            throw new HttpError(409, 'Username già esistente');
        }

        await Utenti.create({
            username: username,
            password: password
        });
    }

}
