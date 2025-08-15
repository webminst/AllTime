const Produto = require('../models/Produto');

// @desc    Buscar todos os produtos
// @route   GET /api/produtos
// @access  Público
exports.getProdutos = async (req, res) => {
  const logger = require('../utils/logger');
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    // Filtros avançados
    const keyword = req.query.keyword
      ? { nome: { $regex: req.query.keyword, $options: 'i' } }
      : {};
    const categoria = req.query.categoria ? { categoria: req.query.categoria } : {};
    const marca = req.query.marca ? { marca: req.query.marca } : {};
    const precoMin = req.query.precoMin ? { preco: { $gte: Number(req.query.precoMin) } } : {};
    const precoMax = req.query.precoMax ? { preco: { $lte: Number(req.query.precoMax) } } : {};
    const avaliacaoMin = req.query.avaliacaoMin ? { avaliacao: { $gte: Number(req.query.avaliacaoMin) } } : {};

    // Combinar todos os filtros
    const filtro = {
      ...keyword,
      ...categoria,
      ...marca,
      ...precoMin,
      ...precoMax,
      ...avaliacaoMin,
    };

    const count = await Produto.countDocuments(filtro);
    const produtos = await Produto.find(filtro)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ produtos, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
};

// @desc    Buscar um produto por ID
// @route   GET /api/produtos/:id
// @access  Público
exports.getProdutoPorId = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);

    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao buscar o produto' });
  }
};

// @desc    Criar um novo produto
// @route   POST /api/produtos
// @access  Privado/Admin
exports.criarProduto = async (req, res) => {
  try {
    const produto = new Produto({
      nome: 'Nome do produto',
      preco: 0,
      usuario: req.user.id,
      imagem: '/images/sample.jpg',
      marca: 'Marca',
      categoria: 'Categoria',
      contagemEmEstoque: 0,
      numAvaliacoes: 0,
      descricao: 'Descrição do produto',
    });

    const produtoCriado = await produto.save();
    res.status(201).json(produtoCriado);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao criar o produto' });
  }
};

// @desc    Atualizar um produto
// @route   PUT /api/produtos/:id
// @access  Privado/Admin
exports.atualizarProduto = async (req, res) => {
  try {
    const {
      nome,
      preco,
      descricao,
      imagem,
      marca,
      categoria,
      contagemEmEstoque,
    } = req.body;

    const produto = await Produto.findById(req.params.id);

    if (produto) {
      produto.nome = nome || produto.nome;
      produto.preco = preco || produto.preco;
      produto.descricao = descricao || produto.descricao;
      produto.imagem = imagem || produto.imagem;
      produto.marca = marca || produto.marca;
      produto.categoria = categoria || produto.categoria;
      produto.contagemEmEstoque = contagemEmEstoque || produto.contagemEmEstoque;

      const produtoAtualizado = await produto.save();
      res.json(produtoAtualizado);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o produto' });
  }
};

// @desc    Deletar um produto
// @route   DELETE /api/produtos/:id
// @access  Privado/Admin
exports.deletarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);

    if (produto) {
      await produto.remove();
      res.json({ message: 'Produto removido' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao remover o produto' });
  }
};

// @desc    Criar uma avaliação de produto
// @route   POST /api/produtos/:id/avaliacoes
// @access  Privado
exports.criarAvaliacaoProduto = async (req, res) => {
  try {
    const { classificacao, comentario } = req.body;

    const produto = await Produto.findById(req.params.id);

    if (produto) {
      const jaAvaliou = produto.avaliacoes.find(
        (r) => r.usuario.toString() === req.user.id.toString()
      );

      if (jaAvaliou) {
        return res
          .status(400)
          .json({ message: 'Você já avaliou este produto' });
      }

      const avaliacao = {
        nome: req.user.nome,
        classificacao: Number(classificacao),
        comentario,
        usuario: req.user.id,
      };

      produto.avaliacoes.push(avaliacao);

      produto.numAvaliacoes = produto.avaliacoes.length;

      produto.avaliacao =
        produto.avaliacoes.reduce((acc, item) => item.classificacao + acc, 0) /
        produto.avaliacoes.length;

      await produto.save();
      res.status(201).json({ message: 'Avaliação adicionada' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao adicionar avaliação' });
  }
};

// @desc    Obter produtos em destaque
// @route   GET /api/produtos/destaque
// @access  Público
exports.getProdutosDestaque = async (req, res) => {
  try {
    const produtos = await Produto.find({ emDestaque: true }).limit(3);
    // Mapear para o formato esperado pelo front-end
    const produtosMapeados = produtos.map((p) => ({
      _id: p._id,
      name: p.nome,
      description: p.descricao,
      price: p.preco,
      image: p.imagem,
      // outros campos se necessário
    }));
    res.json(produtosMapeados);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao buscar produtos em destaque' });
  }
};
