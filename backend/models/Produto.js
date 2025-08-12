const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
    default: 0,
  },
  imagem: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
    enum: ['Masculino', 'Feminino', 'Unissex'],
  },
  marca: {
    type: String,
    required: true,
  },
  estoque: {
    type: Number,
    required: true,
    default: 0,
  },
  avaliacao: {
    type: Number,
    default: 0,
  },
  numAvaliacoes: {
    type: Number,
    default: 0,
  },
  emDestaque: {
    type: Boolean,
    default: false,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Produto', ProdutoSchema);
