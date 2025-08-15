import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../../store/actions/orderActions';
import { saveShippingAddress, savePaymentMethod } from '../../store/actions/cartActions';
import CheckoutSteps from '../../components/checkout/CheckoutSteps';
import Meta from '../../components/ui/Meta';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import { FaMapMarkerAlt, FaCreditCard, FaBarcode, FaMoneyBillWave, FaLock } from 'react-icons/fa';

export const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  
  // Se não houver endereço de entrega, redirecionar para a página de envio
  useEffect(() => {
    if (!shippingAddress) {
      navigate('/envio');
    }
  }, [shippingAddress, navigate]);
  
  // Calcular preços
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  
  // Estados para o método de pagamento
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  
  // Obter informações do usuário
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  // Estado para o pedido
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  
  // Se o pedido for criado com sucesso, redirecionar para a página de confirmação
  useEffect(() => {
    if (success) {
      navigate(`/pedido/${order._id}`);
      // Limpar o carrinho após o pedido ser criado
      // dispatch({ type: CART_CLEAR_ITEMS });
      // localStorage.removeItem('cartItems');
    }
  }, [navigate, success, order]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    
    // Criar o pedido
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  
  return (
    <>
      <Meta title="Finalizar Compra | All Time" />
      
      <div className="container mx-auto px-4 py-8">
        <CheckoutSteps step1 step2 step3 />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Resumo do Pedido */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantidade: {item.qty}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Subtotal</span>
                  <span>R$ {itemsPrice.replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Frete</span>
                  <span>R$ {shippingPrice.replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Impostos</span>
                  <span>R$ {taxPrice.replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 mt-3 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>R$ {totalPrice.replace('.', ',')}</span>
                </div>
              </div>
            </div>
            
            {/* Endereço de Entrega */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Endereço de Entrega</h2>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {shippingAddress.address}, {shippingAddress.number}
                      {shippingAddress.complement && `, ${shippingAddress.complement}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {shippingAddress.district}, {shippingAddress.city} - {shippingAddress.state}
                    </p>
                    <p className="text-sm text-gray-600">
                      CEP: {shippingAddress.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">
                      {shippingAddress.country}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link
                    to="/envio"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Alterar endereço de entrega
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Método de Pagamento */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Método de Pagamento</h2>
              
              {error && <Message variant="danger">{error}</Message>}
              
              <form onSubmit={submitHandler}>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    />
                    <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <FaCreditCard className="text-blue-500 mr-2" />
                        <span>PayPal ou Cartão de Crédito</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="pix"
                      name="paymentMethod"
                      type="radio"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      value="pix"
                      checked={paymentMethod === 'pix'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="pix" className="ml-3 block text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <FaBarcode className="text-green-600 mr-2" />
                        <span>PIX</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="boleto"
                      name="paymentMethod"
                      type="radio"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      value="boleto"
                      checked={paymentMethod === 'boleto'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="boleto" className="ml-3 block text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <FaMoneyBillWave className="text-yellow-500 mr-2" />
                        <span>Boleto Bancário</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaLock className="mr-2 text-gray-400" />
                      <span>Pagamento seguro e criptografado</span>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                    >
                      {orderCreate.loading ? (
                        <div className="flex items-center justify-center">
                          <Loader small />
                          <span className="ml-2">Processando...</span>
                        </div>
                      ) : (
                        'Finalizar Pedido'
                      )}
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Ao finalizar o pedido, você concorda com nossos{' '}
                    <Link to="/termos" className="text-indigo-600 hover:underline">Termos de Serviço</Link> e{' '}
                    <Link to="/privacidade" className="text-indigo-600 hover:underline">Política de Privacidade</Link>.
                  </p>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link
              to="/carrinho"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              &larr; Voltar para o carrinho
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
