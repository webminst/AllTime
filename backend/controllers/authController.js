const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
// @desc    Solicitar recuperação de senha
// @route   POST /api/auth/forgot-password
// @access  Público
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const logger = require('../utils/logger');
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    // Gerar token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();
    // Montar link de reset
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/resetar-senha/${token}`;
    // Enviar e-mail
    await sendEmail({
      to: user.email,
      subject: 'Recuperação de senha - AllTime',
      text: `Você solicitou a recuperação de senha. Clique no link para redefinir: ${resetUrl}`,
      html: `<p>Você solicitou a recuperação de senha.</p><p><a href="${resetUrl}">Clique aqui para redefinir sua senha</a></p>`
    });
    res.json({ message: 'E-mail de recuperação enviado' });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao enviar e-mail de recuperação' });
  }
};

// @desc    Redefinir senha
// @route   POST /api/auth/reset-password/:token
// @access  Público
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { senha } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Token inválido ou expirado' });
    }
    user.senha = senha;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao redefinir senha' });
  }
};
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Registrar um novo usuário
// @route   POST /api/auth/registrar
// @access  Público
exports.registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificar se o usuário já existe
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // Criar novo usuário
    user = new User({
      nome,
      email,
      senha,
    });

    await user.save();

    // Criar e retornar o token JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    logger.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// @desc    Autenticar usuário e obter token
// @route   POST /api/auth/login
// @access  Público
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ email }).select('+senha');

    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Verificar senha
    const isMatch = await user.matchPassword(senha);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Criar e retornar o token JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user._id,
            nome: user.nome,
            email: user.email,
            isAdmin: user.isAdmin
          }
        });
      }
    );
  } catch (err) {
    logger.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// @desc    Obter informações do usuário logado
// @route   GET /api/auth/usuario
// @access  Privado
exports.getUsuario = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-senha');
    res.json(user);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};
