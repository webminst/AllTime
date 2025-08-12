import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo à All Time</h1>
          <p className="text-xl mb-8">Descubra nossa coleção exclusiva de relógios que combinam estilo e precisão.</p>
          <Link 
            to="/produtos" 
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 inline-block"
          >
            Ver Produtos
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Destaques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="/images/laurenzHeymann.jpg" 
              alt="Relógio Destaque 1" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Relógio Premium</h3>
              <p className="text-gray-600 mb-4">Elegância e precisão em um único relógio.</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">R$ 999,99</span>
                <Link 
                  to="/produto/1" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="/images/stevenAvila.jpg" 
              alt="Relógio Destaque 2" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Relógio Esportivo</h3>
              <p className="text-gray-600 mb-4">Perfeito para quem busca estilo e funcionalidade.</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">R$ 799,99</span>
                <Link 
                  to="/produto/2" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="/images/rickyKharawala.jpg" 
              alt="Relógio Destaque 3" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Relógio Clássico</h3>
              <p className="text-gray-600 mb-4">Um clássico que nunca sai de moda.</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">R$ 1.199,99</span>
                <Link 
                  to="/produto/3" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
