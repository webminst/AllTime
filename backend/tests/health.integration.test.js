describe('GET /health', () => {
    describe('GET /health', () => {
        const request = require('supertest');
        const mongoose = require('mongoose');
        const app = require('../../server');

        describe('GET /health', () => {
            afterAll(async () => {
                await mongoose.connection.close();
            });

            it('deve retornar status ok e informações do health check', async () => {
                const res = await request(app).get('/health');
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status', 'ok');
                expect(res.body).toHaveProperty('db');
                expect(res.body).toHaveProperty('uptime');
                expect(res.body).toHaveProperty('timestamp');
            });
        });
