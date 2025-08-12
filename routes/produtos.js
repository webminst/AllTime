const express = require('express');
const router = express.Router();

// Rota de exemplo para listar produtos
router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      nome: 'Relógio Clássico',
      preco: 499.99,
      imagem: 'https://placehold.co/300x200/CBD5E0/4A5568?text=Relógio+1',
      descricao: 'Um relógio clássico para todos os momentos.'
    },
    {
      id: 2,
      nome: 'Relógio Esportivo',
      preco: 799.99,
      imagem: 'https://placehold.co/300x200/A0AEC0/2D3748?text=Relógio+2',
      descricao: 'Perfeito para quem gosta de esportes e aventuras.'
    },
    {
      id: 3,
      nome: 'Relógio de Luxo',
      preco: 1999.99,
      imagem: 'https://placehold.co/300x200/718096/1A202C?text=Relógio+3',
      descricao: 'Elegância e sofisticação para ocasiões especiais.'
    },
    {
      id: 4,
      nome: 'Relógio Moderno',
      preco: 899.99,
      imagem: 'https://placehold.co/300x200/6B7280/FFFFFF?text=Relógio+4',
      descricao: 'Design moderno e inovador para o dia a dia.'
    }
  ]);
});

// Rota para obter um produto específico
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // Em uma aplicação real, você buscaria isso do banco de dados
  const produto = {
    id: parseInt(id),
    nome: `Relógio ${id}`,
    preco: 499.99,
    imagem: `https://placehold.co/300x200/CBD5E0/4A5568?text=Relógio+${id}`,
    descricao: `Descrição detalhada do relógio ${id}`
  };
  res.json(produto);
});

module.exports = router;
