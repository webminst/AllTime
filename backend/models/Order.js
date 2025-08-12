const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true },
  imagem: { type: String, required: true },
  preco: { type: Number, required: true },
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Produto',
  },
});

const enderecoEntregaSchema = new mongoose.Schema({
  endereco: { type: String, required: true },
  cidade: { type: String, required: true },
  cep: { type: String, required: true },
  pais: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    itensPedido: [orderItemSchema],
    enderecoEntrega: enderecoEntregaSchema,
    metodoPagamento: {
      type: String,
      required: true,
    },
    resultadoPagamento: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    precoItens: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxaEnvio: {
      type: Number,
      required: true,
      default: 0.0,
    },
    precoTotal: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPago: {
      type: Boolean,
      required: true,
      default: false,
    },
    pagoEm: {
      type: Date,
    },
    isEntregue: {
      type: Boolean,
      required: true,
      default: false,
    },
    entregueEm: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
