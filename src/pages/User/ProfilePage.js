import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../store/actions/userActions';
import { listMyOrders } from '../../store/actions/orderActions';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import Meta from '../../components/ui/Meta';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone, FaEdit, FaSave, FaTimes, FaShoppingBag, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfilePage = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: 'USER_UPDATE_PROFILE_RESET' });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        setAddress(user.address || '');
        setCity(user.city || '');
        setPostalCode(user.postalCode || '');
        setCountry(user.country || '');
        setPhone(user.phone || '');
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('As senhas não conferem');
    } else {
      const updatedUser = {
        id: user._id,
        name,
        email,
        password: password || undefined,
        address,
        city,
        postalCode,
        country,
        phone,
      };
      
      dispatch(updateUserProfile(updatedUser));
      setIsEditing(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <>
      <Meta title="Meu Perfil | All Time" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-4xl text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <FaUser className="mr-3 text-indigo-600" />
                  Informações Pessoais
                </button>
                <button
                  onClick={() => {
                    const ordersSection = document.getElementById('orders');
                    ordersSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <FaShoppingBag className="mr-3 text-indigo-600" />
                  Meus Pedidos
                </button>
                <Link
                  to="/alterar-senha"
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <FaLock className="mr-3 text-indigo-600" />
                  Alterar Senha
                </Link>
                <Link
                  to="/enderecos"
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <FaMapMarkerAlt className="mr-3 text-indigo-600" />
                  Meus Endereços
                </Link>
              </nav>
            </div>
          </div>
          
          {/* Conteúdo Principal */}
          <div className="md:w-3/4">
            {/* Seção de Informações Pessoais */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Informações Pessoais</h2>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        // Resetar os campos para os valores originais
                        setName(user.name);
                        setEmail(user.email);
                        setAddress(user.address || '');
                        setCity(user.city || '');
                        setPostalCode(user.postalCode || '');
                        setCountry(user.country || '');
                        setPhone(user.phone || '');
                        setPassword('');
                        setConfirmPassword('');
                        setMessage(null);
                      }}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      <FaTimes className="mr-1" /> Cancelar
                    </button>
                    <button
                      type="submit"
                      form="profileForm"
                      className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      <FaSave className="mr-1" /> Salvar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    <FaEdit className="mr-1" /> Editar
                  </button>
                )}
              </div>
              
              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {success && <Message variant="success">Perfil atualizado com sucesso!</Message>}
              {loading && <Loader />}
              
              <form onSubmit={submitHandler} id="profileForm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Nova Senha
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                          </div>
                          <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Deixe em branco para manter a mesma"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirmar Nova Senha
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                          </div>
                          <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Confirme a nova senha"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                        placeholder="Rua, número, complemento"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      CEP
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                      placeholder="00000-000"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      País
                    </label>
                    <input
                      type="text"
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </form>
            </div>
            
            {/* Seção de Pedidos */}
            <div id="orders" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Meus Pedidos</h2>
              
              {loadingOrders ? (
                <Loader />
              ) : errorOrders ? (
                <Message variant="danger">{errorOrders}</Message>
              ) : (
                <div className="overflow-x-auto">
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
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
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                            <div>
                              <span className="text-sm font-medium text-gray-500">Pedido #</span>
                              <span className="ml-1 font-medium text-gray-900">{order._id}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              <FaCalendarAlt className="inline mr-1" />
                              {formatDate(order.createdAt)}
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <FaShoppingBag className="h-8 w-8 text-indigo-600" />
                                </div>
                                <div className="ml-4">
                                  <h3 className="text-sm font-medium text-gray-900">
                                    {order.orderItems.length} {order.orderItems.length === 1 ? 'item' : 'itens'}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {order.orderItems[0]?.name}
                                    {order.orderItems.length > 1 && ` e mais ${order.orderItems.length - 1}`}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm font-medium text-gray-900">
                                  R$ {order.totalPrice.toFixed(2).replace('.', ',')}
                                </p>
                                <div className="mt-1">
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
                                      'Aguardando pagamento'
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              <Link
                                to={`/pedido/${order._id}`}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Ver detalhes do pedido <span aria-hidden="true">&rarr;</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
