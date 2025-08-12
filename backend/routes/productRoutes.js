const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const { protect, admin } = require('../middleware/auth');

// Rotas públicas
router.get('/', produtoController.getProdutos);
router.get('/top', produtoController.getProdutosDestaque);
router.get('/:id', produtoController.getProdutoPorId);

// Rotas protegidas por autenticação
router.post('/:id/avaliacoes', protect, produtoController.criarAvaliacaoProduto);

// Rotas de administrador
router.post('/', protect, admin, produtoController.criarProduto);
router.put('/:id', protect, admin, produtoController.atualizarProduto);
router.delete('/:id', protect, admin, produtoController.deletarProduto);

module.exports = router;
