const request = require('supertest');
const express = require('express');
const orderRoutes = require('../routes/orderRoutes');

describe('Orders API', () => {
    let app;
    beforeAll(() => {
        app = express();
        app.use('/api/orders', orderRoutes);
    });

    it('deve retornar erro ao tentar acessar pedidos sem autenticação', async () => {
        const res = await request(app).get('/api/orders');
        expect([401, 403]).toContain(res.statusCode);
    });
});
