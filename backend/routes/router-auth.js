import express from 'express';

export const router = express.Router();

router.post('/login', (request, response, next) => {
    response.send('POST del login');
});

router.post('/sign-up', (request, response, next) => {
    response.send('POST del sign-up');
});
