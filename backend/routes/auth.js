const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// @route    POST api/auth/registrar
// @desc     Registrar usuário
// @access   Público
router.post(
  '/registrar',
  [
    check('nome', 'Por favor, adicione um nome').not().isEmpty(),
    check('email', 'Por favor, inclua um email válido').isEmail(),
    check(
      'senha',
      'Por favor, insira uma senha com 6 ou mais caracteres'
    ).isLength({ min: 6 }),
  ],
  authController.registrar
);

// @route    POST api/auth/login
// @desc     Autenticar usuário e obter token
// @access   Público
router.post(
  '/login',
  [
    check('email', 'Por favor, inclua um email válido').isEmail(),
    check('senha', 'Senha é obrigatória').exists(),
  ],
  authController.login
);

// @route    GET api/auth/usuario
// @desc     Obter informações do usuário logado
// @access   Privado
router.get('/usuario', protect, authController.getUsuario);

module.exports = router;
