const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

// Rotas públicas
router.post(
  '/registrar',
  [
    check('nome', 'Por favor, adicione um nome').not().isEmpty(),
    check('email', 'Por favor, inclua um email válido').isEmail(),
    check('senha', 'Por favor, insira uma senha com 6 ou mais caracteres').isLength({ min: 6 }),
  ],
  authController.registrar
);

router.post(
  '/login',
  [
    check('email', 'Por favor, inclua um email válido').isEmail(),
    check('senha', 'Senha é obrigatória').exists(),
  ],
  authController.login
);

// Rotas protegidas
router.get('/perfil', protect, userController.getUserProfile);
router.put('/perfil', protect, userController.updateUserProfile);

// Rotas de administrador
router.get('/', protect, admin, userController.getAllUsers);
router.get('/:id', protect, admin, userController.getUserById);
router.put('/:id', protect, admin, userController.updateUser);
router.delete('/:id', protect, admin, userController.deleteUser);

module.exports = router;
