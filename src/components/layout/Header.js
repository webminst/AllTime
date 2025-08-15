import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaHeart, FaChevronDown } from 'react-icons/fa';
import SearchBox from '../forms/SearchBox';

const categories = [
  {
    name: 'Analógico',
    sub: ['Clássico', 'Casual', 'Luxo']
  },
  {
    name: 'Digital',
    sub: ['Esportivo', 'Casual', 'Smartwatch']
  },
  {
    name: 'Marcas',
    sub: ['Casio', 'Rolex', 'Seiko', 'Citizen']
  },
];

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            All Time
          </Link>
          <div className="flex md:hidden">
            {/* Mobile menu button (future) */}
          </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-center mt-4 md:mt-0">
          <div className="hidden md:flex space-x-4 mr-6">
            {categories.map((cat, idx) => (
              <div
                key={cat.name}
                className="relative"
                onMouseEnter={() => { setShowDropdown(true); setDropdownIndex(idx); }}
                onMouseLeave={() => { setShowDropdown(false); setDropdownIndex(null); }}
              >
                <button className="flex items-center text-gray-700 hover:text-indigo-600 font-medium focus:outline-none">
                  {cat.name} <FaChevronDown className="ml-1 text-xs" />
                </button>
                {showDropdown && dropdownIndex === idx && (
                  <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                    {cat.sub.map((subcat) => (
                      <Link
                        key={subcat}
                        to={`/produtos?categoria=${encodeURIComponent(subcat)}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                      >
                        {subcat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md">
              <SearchBox />
            </div>
          </div>
        </div>
        <nav className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link to="/favoritos" className="text-gray-700 hover:text-pink-500 relative">
            <FaHeart className="text-xl" />
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
