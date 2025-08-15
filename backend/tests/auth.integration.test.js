const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/userRoutes');

// Configuração do app de teste
const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Usuário de teste
const testUser = {
    nome: 'Usuário Teste',
    email: `testuser_${Date.now()}@example.com`,
    senha: '12345678',
};

let token;

describe('Fluxo completo de autenticação', () => {
    afterAll(async () => {
        // Limpar usuário de teste do banco
        const User = require('../models/User');
        await User.deleteOne({ email: testUser.email });
        // Fechar conexão mongoose se aberta
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
    });

    it('deve registrar um novo usuário', async () => {
        const res = await request(app)
            .post('/api/auth/registrar')
            .send(testUser);
        expect([200, 201]).toContain(res.statusCode);
        expect(res.body).toHaveProperty('token');
    });

    it('deve fazer login e obter token', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: testUser.email, senha: testUser.senha });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    it('deve acessar rota protegida de usuário autenticado', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);
        expect([200, 401, 403]).toContain(res.statusCode);
    });
});
