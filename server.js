const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./backend/config/db');
const { notFound, errorHandler } = require('./backend/middleware/errorMiddleware');

// Carregar variáveis de ambiente
dotenv.config({ path: '.env' });

// Conectar ao MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/products', require('./backend/routes/productRoutes'));
app.use('/api/users', require('./backend/routes/userRoutes'));
app.use('/api/orders', require('./backend/routes/orderRoutes'));
app.use('/api/auth', require('./backend/routes/auth'));

// Rota para configuração do PayPal
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ message: 'API da All Time está funcionando!' });
});

// Configuração para produção
if (process.env.NODE_ENV === 'production') {
  // Definir pasta estática
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Qualquer rota que não seja da API será redirecionada para o index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API está rodando...');
  });
}

// Middleware de tratamento de erros
app.use(notFound);
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em ${process.env.NODE_ENV || 'development'} na porta ${PORT}`);
});
