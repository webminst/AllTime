
const mongoose = require('mongoose');
const logger = require('../utils/logger');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB conectado com sucesso');
  } catch (err) {
    logger.error(`Erro ao conectar ao MongoDB: ${err && err.message ? err.message : err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
