const Order = require('../models/Order');
const Produto = require('../models/Produto');

// @desc    Criar um novo pedido
// @route   POST /api/orders
// @access  Privado
exports.criarPedido = async (req, res) => {
  try {
    const {
      itensPedido,
      enderecoEntrega,
      metodoPagamento,
      precoItens,
      taxaEnvio,
      precoTotal,
    } = req.body;

    if (itensPedido && itensPedido.length === 0) {
      return res.status(400).json({ message: 'Nenhum item no pedido' });
    }

    // Verificar se os produtos existem e têm estoque suficiente
    for (const item of itensPedido) {
      const produto = await Produto.findById(item.produto);
      
      if (!produto) {
        return res.status(404).json({ message: `Produto não encontrado: ${item.produto}` });
      }
      
      if (produto.estoque < item.quantidade) {
        return res.status(400).json({ 
          message: `Estoque insuficiente para o produto: ${produto.nome}` 
        });
      }
    }

    const pedido = new Order({
      usuario: req.user._id,
      itensPedido,
      enderecoEntrega,
      metodoPagamento,
      precoItens,
      taxaEnvio,
      precoTotal,
    });

    // Atualizar o estoque dos produtos
    for (const item of itensPedido) {
      const produto = await Produto.findById(item.produto);
      produto.estoque -= item.quantidade;
      await produto.save();
    }

    const pedidoCriado = await pedido.save();
    res.status(201).json(pedidoCriado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar o pedido' });
  }
};

// @desc    Obter pedido por ID
// @route   GET /api/orders/:id
// @access  Privado
exports.getPedidoPorId = async (req, res) => {
  try {
    const pedido = await Order.findById(req.params.id).populate('usuario', 'nome email');

    if (pedido) {
      res.json(pedido);
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o pedido' });
  }
};

// @desc    Atualizar pedido para pago
// @route   PUT /api/orders/:id/pay
// @access  Privado
exports.atualizarParaPago = async (req, res) => {
  try {
    const pedido = await Order.findById(req.params.id);

    if (pedido) {
      pedido.isPago = true;
      pedido.pagoEm = Date.now();
      pedido.resultadoPagamento = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const pedidoAtualizado = await pedido.save();
      res.json(pedidoAtualizado);
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o pedido' });
  }
};

// @desc    Atualizar pedido para entregue
// @route   PUT /api/orders/:id/deliver
// @access  Privado/Admin
exports.atualizarParaEntregue = async (req, res) => {
  try {
    const pedido = await Order.findById(req.params.id);

    if (pedido) {
      pedido.isEntregue = true;
      pedido.entregueEm = Date.now();

      const pedidoAtualizado = await pedido.save();
      res.json(pedidoAtualizado);
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o pedido' });
  }
};

// @desc    Obter pedidos do usuário logado
// @route   GET /api/orders/myorders
// @access  Privado
exports.getMeusPedidos = async (req, res) => {
  try {
    const pedidos = await Order.find({ usuario: req.user._id });
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar os pedidos' });
  }
};

// @desc    Obter todos os pedidos
// @route   GET /api/orders
// @access  Privado/Admin
exports.getPedidos = async (req, res) => {
  try {
    const pedidos = await Order.find({}).populate('usuario', 'id nome');
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar os pedidos' });
  }
};
