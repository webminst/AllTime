const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const { protect, admin } = require('../middleware/auth');
const { check } = require('express-validator');
const validarCampos = require('../middleware/validarCampos');


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', produtoController.getProdutos);

/**
 * @swagger
 * /api/products/top:
 *   get:
 *     summary: Lista produtos em destaque
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos em destaque
 */
router.get('/top', produtoController.getProdutosDestaque);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Busca produto por ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', produtoController.getProdutoPorId);


/**
 * @swagger
 * /api/products/{id}/avaliacoes:
 *   post:
 *     summary: Adiciona avaliação a um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: number
 *                 example: 5
 *               comentario:
 *                 type: string
 *                 example: Produto excelente!
 *     responses:
 *       201:
 *         description: Avaliação criada
 *       401:
 *         description: Não autorizado
 */
router.post('/:id/avaliacoes', protect, produtoController.criarAvaliacaoProduto);


/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto (admin)
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Produto Teste
 *               price:
 *                 type: number
 *                 example: 199.99
 *               description:
 *                 type: string
 *                 example: Descrição do produto
 *     responses:
 *       201:
 *         description: Produto criado
 *       401:
 *         description: Não autorizado
 */
router.post(
    '/',
    protect,
    admin,
    [
        check('nome', 'Nome é obrigatório').trim().not().isEmpty().escape(),
        check('preco', 'Preço deve ser um número').isNumeric(),
        check('descricao', 'Descrição é obrigatória').trim().not().isEmpty().escape(),
        validarCampos
    ],
    produtoController.criarProduto
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza um produto (admin)
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Produto Atualizado
 *               price:
 *                 type: number
 *                 example: 299.99
 *               description:
 *                 type: string
 *                 example: Nova descrição
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 */
router.put(
    '/:id',
    protect,
    admin,
    [
        check('nome', 'Nome é obrigatório').optional().trim().not().isEmpty().escape(),
        check('preco', 'Preço deve ser um número').optional().isNumeric(),
        check('descricao', 'Descrição é obrigatória').optional().trim().not().isEmpty().escape(),
        validarCampos
    ],
    produtoController.atualizarProduto
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deleta um produto (admin)
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', protect, admin, produtoController.deletarProduto);

module.exports = router;
