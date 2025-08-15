import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/actions/cartActions';
import Message from '../../components/ui/Message';
import Meta from '../../components/ui/Meta';
import { FaTrash, FaArrowLeft, FaPlus, FaMinus } from 'react-icons/fa';

const CartPage = () => {
  const { id: productId } = useParams();
  const { search } = useLocation();
  const qty = search ? Number(new URLSearchParams(search).get('qty')) : 1;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cart = useSelector((state) => state.cart || {});
  const cartItems = Array.isArray(cart.cartItems) ? cart.cartItems : [];
  
  const userLogin = useSelector((state) => state.userLogin || {});
  const userInfo = userLogin?.userInfo;
  
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  
  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/envio');
    } else {
      navigate('/login?redirect=envio');
    }
  };
  
  const updateCartHandler = (item, qty) => {
    dispatch(addToCart(item.product, Number(qty)));
  };
  
  return (
    <>
      <Meta title="Carrinho de Compras | All Time" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
          >
            <FaArrowLeft className="mr-2" /> Voltar
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Carrinho de Compras</h1>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6">Adicione produtos ao seu carrinho para continuar.</p>
            <Link
              to="/produtos"
              className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Ver Produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Itens */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} {cartItems.length === 1 ? 'Item' : 'Itens'} no Carrinho
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.product} className="p-6 flex flex-col sm:flex-row">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-md"
                        />
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              <Link to={`/produto/${item.product}`} className="hover:text-indigo-600">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.brand}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              R$ {item.price.toFixed(2).replace('.', ',')}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.countInStock > 0 ? 'Em estoque' : 'Fora de estoque'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateCartHandler(item, item.qty - 1)}
                              disabled={item.qty <= 1}
                              className={`px-3 py-1 text-lg ${item.qty <= 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                              <FaMinus />
                            </button>
                            <span className="px-4 py-1 border-l border-r border-gray-300">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateCartHandler(item, item.qty + 1)}
                              disabled={item.qty >= item.countInStock}
                              className={`px-3 py-1 text-lg ${item.qty >= item.countInStock ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                              <FaPlus />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCartHandler(item.product)}
                            className="text-red-600 hover:text-red-800 flex items-center"
                          >
                            <FaTrash className="mr-1" /> Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Resumo do Pedido */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} itens)</span>
                    <span className="font-medium">
                      R$ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="font-medium">
                      {cartItems.length > 0 ? 'Grátis' : 'R$ 0,00'}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>
                        R$ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                    className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6 ${
                      cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Finalizar Compra
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Ou{' '}
                    <Link to="/produtos" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      continuar comprando
                    </Link>
                  </p>
                </div>
              </div>
              
              {/* Cupom de Desconto */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Cupom de Desconto</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Código do cupom"
                    className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Aplicar
                  </button>
                </div>
              </div>
              
              {/* Garantia */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">
                      Garantia de 1 ano em todos os produtos.{' '}
                      <Link to="/garantia" className="text-indigo-600 hover:text-indigo-800">
                        Saiba mais
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
