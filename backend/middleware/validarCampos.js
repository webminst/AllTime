const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }
  next();
};

module.exports = validarCampos;
