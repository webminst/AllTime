const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/auth');

describe('Login API', () => {
    let app;
    beforeAll(() => {
        app = express();
        app.use(bodyParser.json());
        app.use('/api/auth', authRoutes);
    });

    it('deve retornar erro ao tentar login sem dados', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('errors');
    });

    it('deve retornar erro ao tentar login com dados inválidos', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'naoexiste@email.com', senha: 'senhaerrada' });
        expect([400, 401]).toContain(res.statusCode);
    });
});
