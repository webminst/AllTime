const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Rota de login
router.post('/login', (req, res) => {
  // Em uma aplicação real, você validaria as credenciais no banco de dados
  const { email, senha } = req.body;
  
  if (email === 'admin@alltime.com' && senha === 'admin123') {
    const token = jwt.sign({ userId: 1, email: 'admin@alltime.com' }, 'seuSegredoMuitoSecreto', { expiresIn: '1h' });
    return res.json({ token });
  }
  
  res.status(401).json({ message: 'Credenciais inválidas' });
});

// Rota de registro
router.post('/registro', (req, res) => {
  // Em uma aplicação real, você criaria um novo usuário no banco de dados
  const { nome, email, senha } = req.body;
  
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos' });
  }
  
  // Simulando criação de usuário
  const usuario = {
    id: 1,
    nome,
    email,
    senha: 'senha_criptografada',
    dataCriacao: new Date()
  };
  
  const token = jwt.sign({ userId: usuario.id, email: usuario.email }, 'seuSegredoMuitoSecreto', { expiresIn: '1h' });
  
  res.status(201).json({ 
    message: 'Usuário cadastrado com sucesso',
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }
  });
});

module.exports = router;
