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
    console.error(err.message);
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
    console.error(err.message);
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
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};
