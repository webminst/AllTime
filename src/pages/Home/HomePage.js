import React from 'react';
import { Link } from 'react-router-dom';
import ProductCarousel from '../../components/ui/ProductCarousel';
import { useGetTopProductsQuery } from '../../store/slices/productsApiSlice';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';

const HomePage = () => {

  const { data: topProducts, isLoading, error } = useGetTopProductsQuery();

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
      {/* Banner Principal (Carrossel) */}
      <section className="mb-8 sm:mb-12">
        <ProductCarousel />
      </section>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-4 sm:p-8 mb-8 sm:mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">Bem-vindo à All Time</h1>
          <p className="text-base sm:text-xl mb-4 sm:mb-8">Descubra nossa coleção exclusiva de relógios que combinam estilo e precisão.</p>
          <Link
            to="/produtos"
            className="btn btn-primary text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3"
          >
            Ver Produtos
          </Link>
        </div>
      </section>

      {/* Featured Products Dinâmicos */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Destaques</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {(!error && topProducts && Array.isArray(topProducts) && topProducts.length > 0) ? (
              topProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-44 sm:h-48 object-cover"
                  />
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-4 flex-1">{product.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-lg sm:text-xl font-bold">R$ {product.price.toFixed(2)}</span>
                      <Link
                        to={`/produto/${product._id}`}
                        className="btn btn-primary text-xs sm:text-base px-3 sm:px-4 py-1 sm:py-2"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {/* Mockup de 3 produtos */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                  <img src="/images/laurenzHeymann.jpg" alt="Relógio Premium" className="w-full h-44 sm:h-48 object-cover" />
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Relógio Premium</h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-4 flex-1">Elegância e precisão em um único relógio.</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-lg sm:text-xl font-bold">R$ 999,99</span>
                      <Link to="/produto/1" className="btn btn-primary text-xs sm:text-base px-3 sm:px-4 py-1 sm:py-2">Ver Detalhes</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                  <img src="/images/stevenAvila.jpg" alt="Relógio Esportivo" className="w-full h-44 sm:h-48 object-cover" />
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Relógio Esportivo</h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-4 flex-1">Perfeito para quem busca estilo e funcionalidade.</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-lg sm:text-xl font-bold">R$ 799,99</span>
                      <Link to="/produto/2" className="btn btn-primary text-xs sm:text-base px-3 sm:px-4 py-1 sm:py-2">Ver Detalhes</Link>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                  <img src="/images/rickyKharawala.jpg" alt="Relógio Clássico" className="w-full h-44 sm:h-48 object-cover" />
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Relógio Clássico</h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-4 flex-1">Um clássico que nunca sai de moda.</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-lg sm:text-xl font-bold">R$ 1.199,99</span>
                      <Link to="/produto/3" className="btn btn-primary text-xs sm:text-base px-3 sm:px-4 py-1 sm:py-2">Ver Detalhes</Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 sm:mb-12">
        <div className="text-center">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
          <p className="text-gray-600">Entregamos em todo o Brasil em até 5 dias úteis.</p>
        </div>

        <div className="text-center">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Garantia</h3>
          <p className="text-gray-600">Todos os nossos produtos possuem garantia de 1 ano.</p>
        </div>

        <div className="text-center">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Pagamento Seguro</h3>
          <p className="text-gray-600">Processamento seguro de pagamentos.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
