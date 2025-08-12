const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Definir rotas
app.use('/api/auth', require('../routes/auth'));
app.use('/api/produtos', require('../routes/produtos'));

// Servir arquivos estáticos em produção
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
