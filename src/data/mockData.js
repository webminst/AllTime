// Dados fictícios para testes no ambiente de desenvolvimento - Loja de Relógios

export const mockProducts = [
  {
    _id: '1',
    name: 'Relógio Masculino Chronograph',
    image: '/images/watch1.jpg',
    description: 'Relógio masculino com cronógrafo, mostrador preto e pulseira em aço inoxidável. À prova d\'água até 50m.',
    brand: 'TimeMaster',
    category: 'Relógios Masculinos',
    price: 1299.90,
    countInStock: 15,
    rating: 4.7,
    numReviews: 42,
  },
  {
    _id: '2',
    name: 'Relógio Feminino Dourado',
    image: '/images/watch2.jpg',
    description: 'Relógio feminino dourado com pulseira em couro genuíno e detalhes em cristais Swarovski.',
    brand: 'LuxTime',
    category: 'Relógios Femininos',
    price: 899.90,
    countInStock: 10,
    rating: 4.8,
    numReviews: 36,
  },
  {
    _id: '3',
    name: 'Smartwatch Esportivo',
    image: '/images/watch3.jpg',
    description: 'Smartwatch com monitor cardíaco, GPS integrado e resistência à água. Ideal para atividades físicas.',
    brand: 'TechWrist',
    category: 'Smartwatches',
    price: 1599.90,
    countInStock: 8,
    rating: 4.9,
    numReviews: 58,
  },
  {
    _id: '4',
    name: 'Relógio de Mergulho Profissional',
    image: '/images/watch4.jpg',
    description: 'Relógio de mergulho profissional à prova d\'água até 300m, com ponteiro luminoso e pulseira de borracha.',
    brand: 'DiveMaster',
    category: 'Relógios Esportivos',
    price: 2499.90,
    countInStock: 5,
    rating: 4.9,
    numReviews: 27,
  },
  {
    _id: '5',
    name: 'Relógio Clássico de Bolso',
    image: '/images/watch5.jpg',
    description: 'Elegante relógio de bolso em prata esterlina com corrente e detalhes gravados a laser.',
    brand: 'ClassicTime',
    category: 'Relógios de Bolso',
    price: 1799.90,
    countInStock: 3,
    rating: 4.6,
    numReviews: 14,
  },
  {
    _id: '6',
    name: 'Relógio Esportivo à Prova de Choque',
    image: '/images/watch6.jpg',
    description: 'Relógio esportivo resistente a impactos, com cronômetro e calendário. Ideal para esportes radicais.',
    brand: 'ExtremeGear',
    category: 'Relógios Esportivos',
    price: 1299.90,
    countInStock: 12,
    rating: 4.5,
    numReviews: 31,
  },
];

export const mockUsers = [
  {
    _id: '1',
    name: 'Carlos Mendonça',
    email: 'carlos@email.com',
    password: 'senha123',
    isAdmin: false,
    shippingAddress: {
      address: 'Av. Paulista, 1000',
      city: 'São Paulo',
      postalCode: '01310-100',
      country: 'Brasil',
    },
    phone: '(11) 98765-4321',
  },
  {
    _id: '2',
    name: 'Fernanda Lima',
    email: 'fernanda@email.com',
    password: 'senha123',
    isAdmin: false,
    shippingAddress: {
      address: 'Rua Oscar Freire, 500',
      city: 'São Paulo',
      postalCode: '01426-001',
      country: 'Brasil',
    },
    phone: '(11) 91234-5678',
  },
  {
    _id: '3',
    name: 'Admin TimeMaster',
    email: 'admin@timemaster.com',
    password: 'admin123',
    isAdmin: true,
    phone: '(11) 4002-8922',
  },
];

export const mockOrders = [
  {
    _id: '1',
    user: {
      _id: '1',
      name: 'Carlos Mendonça',
      email: 'carlos@email.com',
    },
    orderItems: [
      {
        _id: '1',
        name: 'Relógio Masculino Chronograph',
        qty: 1,
        image: '/images/watch1.jpg',
        price: 1299.90,
        product: '1',
      },
      {
        _id: '6',
        name: 'Relógio Esportivo à Prova de Choque',
        qty: 1,
        image: '/images/watch6.jpg',
        price: 1299.90,
        product: '6',
      },
    ],
    shippingAddress: {
      address: 'Av. Paulista, 1000',
      city: 'São Paulo',
      postalCode: '01310-100',
      country: 'Brasil',
    },
    paymentMethod: 'Cartão de Crédito',
    paymentResult: {
      id: 'PAY-XYZ123456',
      status: 'COMPLETED',
      update_time: '2025-07-21T14:30:00-03:00',
      email_address: 'carlos@email.com',
    },
    itemsPrice: 2599.80,
    taxPrice: 259.98,
    shippingPrice: 0.00,
    totalPrice: 2859.78,
    isPaid: true,
    paidAt: '2025-07-21T14:35:00-03:00',
    isDelivered: true,
    deliveredAt: '2025-07-25T10:15:00-03:00',
    trackingNumber: 'TM123456789BR',
  },
  {
    _id: '2',
    user: {
      _id: '2',
      name: 'Fernanda Lima',
      email: 'fernanda@email.com',
    },
    orderItems: [
      {
        _id: '2',
        name: 'Relógio Feminino Dourado',
        qty: 1,
        image: '/images/watch2.jpg',
        price: 899.90,
        product: '2',
      },
    ],
    shippingAddress: {
      address: 'Rua Oscar Freire, 500',
      city: 'São Paulo',
      postalCode: '01426-001',
      country: 'Brasil',
    },
    paymentMethod: 'PIX',
    paymentResult: {
      id: 'PIX-987654321',
      status: 'COMPLETED',
      update_time: '2025-07-20T10:15:00-03:00',
      email_address: 'fernanda@email.com',
    },
    itemsPrice: 899.90,
    taxPrice: 89.99,
    shippingPrice: 25.00,
    totalPrice: 1014.89,
    isPaid: true,
    paidAt: '2025-07-20T10:20:00-03:00',
    isDelivered: false,
    trackingNumber: 'TM987654321BR',
  },
  {
    _id: '3',
    user: {
      _id: '1',
      name: 'Carlos Mendonça',
      email: 'carlos@email.com',
    },
    orderItems: [
      {
        _id: '4',
        name: 'Relógio de Mergulho Profissional',
        qty: 1,
        image: '/images/watch4.jpg',
        price: 2499.90,
        product: '4',
      },
    ],
    shippingAddress: {
      address: 'Av. Paulista, 1000',
      city: 'São Paulo',
      postalCode: '01310-100',
      country: 'Brasil',
    },
    paymentMethod: 'Boleto Bancário',
    paymentResult: {
      id: 'BOL-456789123',
      status: 'PENDING',
      update_time: '2025-07-22T09:30:00-03:00',
      email_address: 'carlos@email.com',
    },
    itemsPrice: 2499.90,
    taxPrice: 249.99,
    shippingPrice: 0.00,
    totalPrice: 2749.89,
    isPaid: false,
    paidAt: null,
    isDelivered: false,
    barcode: '34191.79001 01043.510047 91020.150008 4 93450000002499',
    dueDate: '2025-07-29T23:59:59-03:00',
  },
];

// Função para simular uma requisição assíncrona
export const fetchMockData = (dataType) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (dataType) {
        case 'products':
          resolve({ data: mockProducts });
          break;
        case 'users':
          resolve({ data: mockUsers });
          break;
        case 'orders':
          resolve({ data: mockOrders });
          break;
        default:
          resolve({ data: [] });
      }
    }, 500); // Simula um atraso de rede
  });
};

export default {
  mockProducts,
  mockUsers,
  mockOrders,
  fetchMockData,
};
