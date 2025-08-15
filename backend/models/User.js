const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

// Criptografar senha antes de salvar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Método para comparar senha
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.senha);
};

module.exports = mongoose.model('User', UserSchema);
