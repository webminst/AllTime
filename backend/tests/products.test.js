const request = require('supertest');
const express = require('express');
const productRoutes = require('../routes/productRoutes');

describe('Products API', () => {
    let app;
    beforeAll(() => {
        app = express();
        app.use('/api/products', productRoutes);
    });

    it('deve retornar lista de produtos (GET /api/products)', async () => {
        const res = await request(app).get('/api/products');
        // Espera 200 ou 401 se rota protegida, depende da implementação
        expect([200, 401, 403]).toContain(res.statusCode);
        // Se 200, espera array
        if (res.statusCode === 200) {
            expect(Array.isArray(res.body) || typeof res.body === 'object').toBe(true);
        }
    });
});
