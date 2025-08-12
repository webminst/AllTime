import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">All Time</h3>
            <p className="text-gray-400">Sua loja de relógios de confiança.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Início</Link></li>
              <li><Link to="/produtos" className="text-gray-400 hover:text-white">Produtos</Link></li>
              <li><Link to="/sobre" className="text-gray-400 hover:text-white">Sobre Nós</Link></li>
              <li><Link to="/contato" className="text-gray-400 hover:text-white">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <p className="text-gray-400">Email: contato@alltime.com</p>
            <p className="text-gray-400">Telefone: (11) 99999-9999</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} All Time. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
