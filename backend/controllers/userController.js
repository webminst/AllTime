const User = require('../models/User');

// @desc    Obter perfil do usuário
// @route   GET /api/users/profile
// @access  Privado
exports.getUserProfile = async (req, res) => {
  const logger = require('../utils/logger');
  try {
    const user = await User.findById(req.user.id).select('-senha');
    res.json(user);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao buscar perfil do usuário' });
  }
};

// @desc    Atualizar perfil do usuário
// @route   PUT /api/users/profile
// @access  Privado
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.nome = req.body.nome || user.nome;
      user.email = req.body.email || user.email;

      if (req.body.senha) {
        user.senha = req.body.senha;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        nome: updatedUser.nome,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao atualizar perfil do usuário' });
  }
};

// @desc    Obter todos os usuários (apenas admin)
// @route   GET /api/users
// @access  Privado/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-senha');
    res.json(users);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

// @desc    Obter usuário por ID (apenas admin)
// @route   GET /api/users/:id
// @access  Privado/Admin
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-senha');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

// @desc    Atualizar usuário (apenas admin)
// @route   PUT /api/users/:id
// @access  Privado/Admin
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.nome = req.body.nome || user.nome;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        nome: updatedUser.nome,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

// @desc    Deletar usuário
// @route   DELETE /api/users/:id
// @access  Privado/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: 'Usuário removido' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Erro ao remover usuário' });
  }
};

// Função auxiliar para gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
