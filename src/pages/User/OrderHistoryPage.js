import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listMyOrders } from '../../store/actions/orderActions';
import Meta from '../../components/ui/Meta';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import { FaShoppingBag, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaTruck } from 'react-icons/fa';

export const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  
  // Obter histórico de pedidos do usuário
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;
  
  // Obter informações do usuário
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  // Carregar pedidos ao montar o componente
  useEffect(() => {
    if (userInfo) {
      dispatch(listMyOrders());
    }
  }, [dispatch, userInfo]);
  
  // Formatar data
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <>
      <Meta title="Meus Pedidos | All Time" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShoppingBag className="text-4xl text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Meus Pedidos</h2>
                <p className="text-gray-600">Acompanhe seus pedidos</p>
              </div>
              
              <nav className="space-y-2">
                <Link
                  to="/perfil"
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Minha Conta
                </Link>
                <Link
                  to="/meus-pedidos"
                  className="block px-4 py-3 text-sm font-medium text-white bg-indigo-100 text-indigo-700 rounded-md"
                >
                  Meus Pedidos
                </Link>
                <Link
                  to="/enderecos"
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Meus Endereços
                </Link>
                <Link
                  to="/alterar-senha"
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Alterar Senha
                </Link>
              </nav>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Precisa de ajuda?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Entre em contato com nosso suporte para obter ajuda com seus pedidos.
              </p>
              <a
                href="/contato"
                className="inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Falar com o suporte <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          
          {/* Conteúdo Principal */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Meus Pedidos</h1>
                <Link
                  to="/produtos"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continuar Comprando
                </Link>
              </div>
              
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <FaShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum pedido encontrado</h3>
                  <p className="mt-1 text-sm text-gray-500">Você ainda não realizou nenhum pedido.</p>
                  <div className="mt-6">
                    <Link
                      to="/produtos"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Ver Produtos
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Cabeçalho do Pedido */}
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="mb-2 sm:mb-0">
                            <span className="text-sm font-medium text-gray-500">Pedido #</span>
                            <span className="ml-1 font-medium text-gray-900">{order._id}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.isPaid 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.isPaid ? (
                                <>
                                  <FaCheckCircle className="mr-1" /> Pago
                                </>
                              ) : (
                                <>
                                  <FaTimesCircle className="mr-1" /> Aguardando pagamento
                                </>
                              )}
                            </span>
                            
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.isDelivered 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.isDelivered ? (
                                <>
                                  <FaTruck className="mr-1" /> Entregue
                                </>
                              ) : (
                                <>
                                  <FaTruck className="mr-1" /> Em processamento
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-1.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                            <span>Realizado em {formatDate(order.createdAt)}</span>
                          </div>
                          <div className="mt-1 sm:mt-0">
                            <span className="text-gray-900 font-medium">
                              Total: R$ {order.totalPrice.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Itens do Pedido */}
                      <div className="p-6">
                        <div className="space-y-4">
                          {order.orderItems.slice(0, 2).map((item) => (
                            <div key={item._id} className="flex items-start">
                              <div className="flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-900">
                                  <Link to={`/produto/${item.product}`} className="hover:text-indigo-600">
                                    {item.name}
                                  </Link>
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Quantidade: {item.qty} × R$ {item.price.toFixed(2).replace('.', ',')}
                                </p>
                              </div>
                              <div className="ml-4 text-sm font-medium text-gray-900">
                                R$ {(item.qty * item.price).toFixed(2).replace('.', ',')}
                              </div>
                            </div>
                          ))}
                          
                          {order.orderItems.length > 2 && (
                            <div className="text-sm text-indigo-600">
                              +{order.orderItems.length - 2} mais {order.orderItems.length - 2 === 1 ? 'item' : 'itens'}
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <Link
                            to={`/pedido/${order._id}`}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Ver Detalhes
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Dúvidas Frequentes */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Dúvidas Frequentes</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Como rastrear meu pedido?</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Assim que seu pedido for enviado, você receberá um e-mail com o código de rastreamento. 
                    Você também pode rastrear seu pedido na página de detalhes do pedido.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Qual o prazo de entrega?</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    O prazo de entrega varia de acordo com sua localização e o método de envio escolhido. 
                    Em média, as entregas são realizadas em 3 a 7 dias úteis.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Precisa de mais ajuda?</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Entre em contato com nosso atendimento ao cliente para obter ajuda com seus pedidos.
                  </p>
                  <a
                    href="/contato"
                    className="mt-2 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Falar com o suporte <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistoryPage;
