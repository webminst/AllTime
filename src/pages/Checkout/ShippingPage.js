import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../../store/actions/cartActions';
import CheckoutSteps from '../../components/checkout/CheckoutSteps';
import Meta from '../../components/ui/Meta';
import { FaMapMarkerAlt, FaUser, FaMapMarkedAlt, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Obter o endereço de entrega do carrinho se existir
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  // Estados do formulário
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [number, setNumber] = useState(shippingAddress?.number || '');
  const [complement, setComplement] = useState(shippingAddress?.complement || '');
  const [district, setDistrict] = useState(shippingAddress?.district || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [state, setState] = useState(shippingAddress?.state || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || 'Brasil');
  const [receiverName, setReceiverName] = useState(shippingAddress?.receiverName || '');
  
  // Estados para busca de CEP
  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [cepError, setCepError] = useState('');
  
  // Verificar se o usuário está logado
  const userLogin = useSelector((state) => state.userLogin);
  
  // Se não houver itens no carrinho, redirecionar para o carrinho
  useEffect(() => {
    if (cart.cartItems.length === 0) {
      navigate('/carrinho');
    }
  }, [cart.cartItems, navigate]);
  
  // Buscar endereço pelo CEP usando a API ViaCEP
  const fetchAddressByCep = async (cep) => {
    // Formatar CEP (remover caracteres não numéricos)
    const formattedCep = cep.replace(/\D/g, '');
    
    // Validar CEP
    if (formattedCep.length !== 8) {
      setCepError('CEP inválido. O CEP deve conter 8 dígitos.');
      return;
    }
    
    setCepError('');
    setIsFetchingCep(true);
    
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${formattedCep}/json/`);
      
      if (response.data.erro) {
        setCepError('CEP não encontrado. Por favor, verifique o número digitado.');
        return;
      }
      
      // Preencher os campos com os dados da API
      setAddress(response.data.logradouro || '');
      setDistrict(response.data.bairro || '');
      setCity(response.data.localidade || '');
      setState(response.data.uf || '');
      
      // Focar no campo de número após preencher o endereço
      document.getElementById('number')?.focus();
      
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setCepError('Ocorreu um erro ao buscar o CEP. Por favor, tente novamente.');
    } finally {
      setIsFetchingCep(false);
    }
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!address || !number || !district || !city || !state || !postalCode || !receiverName) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Salvar endereço de entrega
    dispatch(
      saveShippingAddress({
        address,
        number,
        complement,
        district,
        city,
        state,
        postalCode,
        country,
        receiverName,
      })
    );
    
    // Redirecionar para a página de pagamento
    navigate('/pagamento');
  };
  
  return (
    <>
      <Meta title="Endereço de Entrega | All Time" />
      
      <div className="container mx-auto px-4 py-8">
        <CheckoutSteps step1 step2 />
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Endereço de Entrega</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                <FaMapMarkerAlt className="inline mr-2 text-indigo-600" />
                Para onde devemos enviar seu pedido?
              </h2>
              <p className="text-sm text-gray-500">
                Certifique-se de que o endereço esteja correto para evitar problemas na entrega.
              </p>
            </div>
            
            <form onSubmit={submitHandler}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CEP */}
                <div className="md:col-span-2">
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    CEP *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => {
                        // Formatar CEP (apenas números e limita a 8 dígitos)
                        const value = e.target.value.replace(/\D/g, '').slice(0, 8);
                        setPostalCode(value);
                        
                        // Buscar endereço automaticamente quando o CEP tiver 8 dígitos
                        if (value.length === 8) {
                          fetchAddressByCep(value);
                        } else if (value.length < 8) {
                          setCepError('');
                        }
                      }}
                      className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="00000-000"
                      required
                    />
                  </div>
                  {isFetchingCep && (
                    <p className="mt-1 text-sm text-gray-500">Buscando endereço...</p>
                  )}
                  {cepError && (
                    <p className="mt-1 text-sm text-red-600">{cepError}</p>
                  )}
                </div>
                
                {/* Endereço */}
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkedAlt className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Rua, Avenida, etc."
                      required
                    />
                  </div>
                </div>
                
                {/* Número */}
                <div>
                  <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                    Número *
                  </label>
                  <input
                    type="text"
                    id="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Número"
                    required
                  />
                </div>
                
                {/* Complemento */}
                <div>
                  <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-1">
                    Complemento
                  </label>
                  <input
                    type="text"
                    id="complement"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Apto, bloco, etc."
                  />
                </div>
                
                {/* Bairro */}
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    id="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Seu bairro"
                    required
                  />
                </div>
                
                {/* Cidade */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Sua cidade"
                    required
                  />
                </div>
                
                {/* Estado */}
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    Estado *
                  </label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Selecione um estado</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
                
                {/* País */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    País *
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-gray-100 cursor-not-allowed"
                    disabled
                  />
                </div>
                
                {/* Nome do destinatário */}
                <div className="md:col-span-2">
                  <label htmlFor="receiverName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do destinatário *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="receiverName"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Nome completo do destinatário"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Para quem devemos entregar o pedido?
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate('/carrinho')}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Voltar para o carrinho
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continuar para o pagamento
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Seus dados estão seguros conosco. Utilizamos criptografia para proteger suas informações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPage;
