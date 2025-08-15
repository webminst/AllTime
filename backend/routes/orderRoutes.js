const express = require('express');
const router = express.Router();
const {
  criarPedido,
  getPedidoPorId,
  atualizarParaPago,
  atualizarParaEntregue,
  getMeusPedidos,
  getPedidos,
  iniciarPagamentoPix,
  confirmarPagamentoPix,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

// Rotas privadas

// Pagamento PIX
router.post('/:id/pix', protect, iniciarPagamentoPix);
router.put('/:id/pix/confirmar', protect, confirmarPagamentoPix);

router.route('/').post(protect, criarPedido).get(protect, admin, getPedidos);
router.route('/myorders').get(protect, getMeusPedidos);
router.route('/:id').get(protect, getPedidoPorId);
router.route('/:id/pay').put(protect, atualizarParaPago);
router.route('/:id/deliver').put(protect, admin, atualizarParaEntregue);

module.exports = router;
