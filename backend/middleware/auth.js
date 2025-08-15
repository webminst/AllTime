const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rotas
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Obter o token do header
      token = req.headers.authorization.split(' ')[1];

      // Verificar o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obter o usuário do token
      req.user = await User.findById(decoded.id).select('-senha');

      next();
    } catch (error) {
      const logger = require('../utils/logger');
      logger.error(error);
      res.status(401).json({ msg: 'Token inválido' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'Não autorizado, token não fornecido' });
  }
};

// Middleware para verificar se o usuário é admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ msg: 'Não autorizado como administrador' });
  }
};
