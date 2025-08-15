import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { listProductDetails, createProductReview } from '../../store/actions/productActions';
import { addToCart } from '../../store/actions/cartActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../store/constants/productConstants';
import Rating from '../../components/ui/Rating';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import Meta from '../../components/ui/Meta';

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails) || {};
  const { loading = false, error = null, product = null } = productDetails;

  const userLogin = useSelector((state) => state.userLogin) || {};
  const userInfo = userLogin?.userInfo;

  const productReviewCreate = useSelector((state) => state.productReviewCreate) || {};
  const { success: successProductReview = false, error: errorProductReview = null } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('Avaliação enviada!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/carrinho/${id}?qty=${qty}`);
    dispatch(addToCart(id, qty));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/produtos">
        Voltar
      </Link>
      
      {loading ? (
        <Loader />
      ) : error || !product ? (
        <Message variant="danger">
          {error || 'Produto não encontrado'}
        </Message>
      ) : (
        <>
          <Meta title={product.name} />
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                {/* Imagem do Produto */}
                <div className="md:w-1/2 p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                
                {/* Detalhes do Produto */}
                <div className="md:w-1/2 p-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  
                  <div className="flex items-center mb-4">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} avaliações`}
                      color="#f6e05e"
                    />
                  </div>
                  
                  <p className="text-2xl font-semibold text-gray-900 mb-4">R$ {product.price?.toFixed(2)}</p>
                  
                  <p className="text-gray-700 mb-6">{product.description}</p>
                  
                  <div className="mb-6">
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Disponibilidade:</span>{' '}
                      {product.countInStock > 0 ? 'Em estoque' : 'Fora de estoque'}
                    </p>
                    
                    {product.countInStock > 0 && (
                      <div className="mb-4">
                        <label htmlFor="qty" className="block text-sm font-medium text-gray-700 mb-1">
                          Quantidade:
                        </label>
                        <select
                          id="qty"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="border border-gray-300 rounded-md p-2 w-20"
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    <button
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                      className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        product.countInStock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {product.countInStock > 0 ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Especificações</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                      <li>Marca: {product.brand || 'Não especificada'}</li>
                      <li>Categoria: {product.category || 'Não especificada'}</li>
                      <li>Material: Aço inoxidável</li>
                      <li>Garantia: 1 ano</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Avaliações */}
              <div className="p-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Avaliações</h2>
                
                {product.reviews?.length === 0 && <Message>Nenhuma avaliação ainda</Message>}
                
                <div className="space-y-4 mb-8">
                  {product.reviews?.map((review) => (
                    <div key={review._id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center mb-2">
                        <span className="font-semibold">{review.name}</span>
                        <div className="ml-2">
                          <Rating value={review.rating} color="#f6e05e" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                      <p className="mt-1 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                {/* Formulário de Avaliação */}
                <h3 className="text-xl font-semibold mb-4">Deixe sua avaliação</h3>
                
                {errorProductReview && (
                  <Message variant="danger">{errorProductReview}</Message>
                )}
                
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Classificação
                      </label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      >
                        <option value="">Selecione...</option>
                        <option value="1">1 - Péssimo</option>
                        <option value="2">2 - Ruim</option>
                        <option value="3">3 - Bom</option>
                        <option value="4">4 - Muito Bom</option>
                        <option value="5">5 - Excelente</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Comentário
                      </label>
                      <textarea
                        id="comment"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Conte-nos o que você achou deste produto..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Enviar Avaliação
                    </button>
                  </form>
                ) : (
                  <Message>
                    Por favor, <Link to="/login" className="text-indigo-600 hover:underline">faça login</Link> para deixar uma avaliação.
                  </Message>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
