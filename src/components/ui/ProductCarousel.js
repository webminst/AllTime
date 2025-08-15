import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../../store/slices/productsApiSlice';
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <Message variant='danger'>{error?.data?.message || error.error}</Message>;
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="bg-gray-200 text-center py-8 rounded mb-4">
        <p className="text-gray-600">Nenhum produto em destaque no momento.</p>
      </div>
    );
  }
  return (
    <Carousel pause='hover' className='bg-dark mb-4'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (R$ {product.price.toFixed(2)})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
