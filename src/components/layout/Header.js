import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          All Time
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Início
          </Link>
          <Link to="/produtos" className="text-gray-700 hover:text-indigo-600">
            Produtos
          </Link>
          <Link to="/carrinho" className="relative">
            <FaShoppingCart className="text-gray-700 text-xl hover:text-indigo-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">
            <FaUser className="text-xl" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
