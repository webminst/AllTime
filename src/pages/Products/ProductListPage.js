import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../store/actions/productActions';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import Meta from '../../components/ui/Meta';
import Paginate from '../../components/ui/Paginate';
import Product from '../../components/product/Product';
import ProductCarousel from '../../components/product/ProductCarousel';

const ProductListPage = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    marca: '',
    price: '',
    rating: '',
    order: ''
  });
  const keyword = match.params.keyword || '';
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;



  // Buscar produtos ao alterar filtros ou página
  useEffect(() => {
    dispatch(listProducts(filters, currentPage));
  }, [dispatch, filters, currentPage]);
  const currentProducts = products || [];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1);
  };

  return (
    <>
      <Meta title="Nossos Produtos" />

      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Voltar
        </Link>
      )}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Nossos Relógios</h1>

        {/* Filtros */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Todas as categorias</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Unissex">Unissex</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
              <input
                type="text"
                name="marca"
                value={filters.marca}
                onChange={handleFilterChange}
                placeholder="Digite a marca"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
              <select
                name="price"
                value={filters.price}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Qualquer preço</option>
                <option value="0-500">Até R$ 500</option>
                <option value="500-1000">R$ 500 - R$ 1000</option>
                <option value="1000-2000">R$ 1000 - R$ 2000</option>
                <option value="2000">Acima de R$ 2000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avaliação</label>
              <select
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Qualquer avaliação</option>
                <option value="4">4 estrelas ou mais</option>
                <option value="3">3 estrelas ou mais</option>
                <option value="2">2 estrelas ou mais</option>
                <option value="1">1 estrela ou mais</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
              <select
                name="order"
                value={filters.order}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Padrão</option>
                <option value="price_asc">Preço: Menor para maior</option>
                <option value="price_desc">Preço: Maior para menor</option>
                <option value="rating_desc">Melhor avaliados</option>
                <option value="newest">Mais recentes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Produtos */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <Product product={product} />
                </div>
              ))}
            </div>

            {/* Paginação */}
            <div className="mt-8">
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductListPage;
