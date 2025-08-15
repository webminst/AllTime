const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');

describe('Users API', () => {
    let app;
    beforeAll(() => {
        app = express();
        app.use('/api/users', userRoutes);
    });

    it('deve retornar erro ao tentar acessar usuários sem autenticação', async () => {
        const res = await request(app).get('/api/users');
        expect([401, 403]).toContain(res.statusCode);
    });
});
