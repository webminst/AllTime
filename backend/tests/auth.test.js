const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/auth');

describe('Auth API', () => {
    let app;
    beforeAll(() => {
        app = express();
        app.use(bodyParser.json());
        app.use('/api/auth', authRoutes);
    });

    it('deve retornar erro ao tentar registrar usuário sem dados', async () => {
        const res = await request(app)
            .post('/api/auth/registrar')
            .send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('errors');
    });

    it('deve retornar erro ao tentar registrar usuário com e-mail inválido', async () => {
        const res = await request(app)
            .post('/api/auth/registrar')
            .send({ nome: 'Teste', email: 'invalido', senha: '123456' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('errors');
    });
});
