const request = require('supertest');
const express = require('express');

// Cria uma instância mínima do app para teste
const app = express();
app.get('/api', (req, res) => {
    res.json({ message: 'API da All Time está funcionando!' });
});

describe('GET /api', () => {
    it('deve retornar mensagem de status', async () => {
        const res = await request(app).get('/api');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'API da All Time está funcionando!');
    });
});
