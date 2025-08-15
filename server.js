const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./backend/config/db');
const { notFound, errorHandler } = require('./backend/middleware/errorMiddleware');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const logger = require('./backend/utils/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Carregar variáveis de ambiente
dotenv.config({ path: '.env' });

// Conectar ao MongoDB
connectDB();

const app = express();

// Health check endpoint
app.get('/health', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  let dbStatus = 'unknown';
  if (dbState === 1) dbStatus = 'connected';
  else if (dbState === 2) dbStatus = 'connecting';
  else if (dbState === 0) dbStatus = 'disconnected';
  else if (dbState === 3) dbStatus = 'disconnecting';
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    db: dbStatus,
    timestamp: new Date().toISOString(),
  });
});


// Middleware
app.use(helmet());

// CORS restritivo
const allowedOrigins = [
  'http://localhost:3000',
  'https://alltime.yourdomain.com' // ajuste conforme necessário
];
app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sem origin (ex: mobile, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Not allowed by CORS'));
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Morgan HTTP request logger
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'All Time API',
      version: '1.0.0',
      description: 'Documentação da API All Time',
    },
    servers: [
      { url: 'http://localhost:5000' },
    ],
  },
  apis: ['./backend/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da API
app.use('/api/products', require('./backend/routes/productRoutes'));
app.use('/api/produtos', require('./backend/routes/produtos'));
app.use('/api/users', require('./backend/routes/userRoutes'));
app.use('/api/orders', require('./backend/routes/orderRoutes'));
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/upload', require('./backend/routes/upload'));

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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
  app.get(/^((?!\/api).)*$/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get(/^((?!\/api).)*$/, (req, res) => {
    res.send(''); // Não retorna mensagem de erro para rotas desconhecidas em dev
  });
}

// Middleware de tratamento de erros
app.use(notFound);
app.use(errorHandler);

// Exemplo de uso do logger
logger.info('Servidor iniciado com logs estruturados');

// Iniciar servidor
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Servidor rodando em ${process.env.NODE_ENV || 'development'} na porta ${PORT}`);
  });
}

module.exports = app;
