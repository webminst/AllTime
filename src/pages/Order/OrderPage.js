import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getOrderDetails } from '../../store/actions/orderActions';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Meta from '../../components/ui/Meta';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import { FaCheckCircle, FaTimesCircle, FaTruck, FaCreditCard, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obter detalhes do pedido
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  // Obter informações do usuário
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Obter status do pagamento
  const orderPay = useSelector((state) => state.orderPay);
  const [, setLoadingPay] = useState(false);
  const { success: successPay } = orderPay;

  // Se o pedido não existir ou o usuário não for o dono, redirecionar
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    } else if (order && order._id === orderId) {
      // Atualizar a página se o pagamento for bem-sucedido
      if (successPay) {
        dispatch(getOrderDetails(orderId));
      }
    }
  }, [dispatch, order, orderId, userInfo, navigate, successPay]);

  // Configuração do PayPal
  const initialOptions = {
    'client-id': 'test', // Substitua pelo seu client ID do PayPal
    currency: 'BRL',
    intent: 'capture',
  };

  // Função para criar o pedido no PayPal
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
            currency_code: 'BRL',
          },
        },
      ],
    });
  };

  // Função para lidar com o pagamento bem-sucedido
  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const [, setPaymentResult] = useState(null);
      const paymentResult = {
        id: data.orderID,
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        email_address: details.payer.email_address,
      };
      // Aqui você implementaria a lógica para atualizar o pedido como pago
      // dispatch(payOrder(orderId, paymentResult));
      toast.success('Pagamento realizado com sucesso!');
    });
  };

  // Função para lidar com erros no pagamento
  const onError = (err) => {
    console.error('Erro no pagamento:', err);
    toast.error('Ocorreu um erro ao processar o pagamento.');
  };

  // Formatar data
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Meta title={`Pedido #${orderId}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Pedido #{order._id}</h1>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Detalhes do Pedido</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Realizado em {formatDate(order.createdAt)}
                </p>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  {/* Status do pedido */}
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Status do pedido</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.isPaid ? (
                          <>
                            <FaCheckCircle className="mr-1.5 h-4 w-4" />
                            Pago em {formatDate(order.paidAt)}
                          </>
                        ) : (
                          <>
                            <FaTimesCircle className="mr-1.5 h-4 w-4" />
                            Aguardando pagamento
                          </>
                        )}
                      </span>
                      
                      {order.isDelivered ? (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FaTruck className="mr-1.5 h-4 w-4" />
                          Entregue em {formatDate(order.deliveredAt)}
                        </span>
                      ) : (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <FaTruck className="mr-1.5 h-4 w-4" />
                          Em processamento
                        </span>
                      )}
                    </dd>
                  </div>
                  
                  {/* Método de pagamento */}
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Método de pagamento</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="flex items-center">
                        <FaCreditCard className="h-5 w-5 text-gray-400 mr-2" />
                        {order.paymentMethod}
                      </div>
                      {!order.isPaid && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Pagar com PayPal</h4>
                          <div className="w-full max-w-xs">
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                              style={{ layout: 'horizontal' }}
                            />
                          </div>
                        </div>
                      )}
                    </dd>
                  </div>
                  
                  {/* Endereço de entrega */}
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Endereço de entrega</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{order.shippingAddress.fullName}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                          <p>{order.shippingAddress.country}</p>
                          {order.shippingAddress.phone && (
                            <p className="mt-1">Telefone: {order.shippingAddress.phone}</p>
                          )}
                        </div>
                      </div>
                    </dd>
                  </div>
                  
                  {/* Itens do pedido */}
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Itens do pedido</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Produto
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Preço
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantidade
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subtotal
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {order.orderItems.map((item) => (
                              <tr key={item._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-16 w-16">
                                      <img 
                                        className="h-16 w-16 object-cover rounded-md" 
                                        src={item.image} 
                                        alt={item.name} 
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <Link 
                                        to={`/produto/${item.product}`}
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                                      >
                                        {item.name}
                                      </Link>
                                      <p className="text-sm text-gray-500">{item.brand}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  R$ {item.price.toFixed(2).replace('.', ',')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {item.qty}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  R$ {(item.qty * item.price).toFixed(2).replace('.', ',')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </dd>
                  </div>
                
                </dl>
                
                {/* Ações */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between px-4 sm:px-6">
                  <Link
                    to="/meus-pedidos"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Voltar para meus pedidos
                  </Link>
                  
                  <Link
                    to="/produtos"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Continuar comprando
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default OrderPage;
