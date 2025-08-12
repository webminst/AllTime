import React, { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from './Rating';
import { toast } from 'react-toastify';

const ProductReview = ({ reviews, productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (!rating || !comment) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    // Aqui você iria despachar a ação para adicionar a avaliação
    // dispatch(createProductReview({ productId, rating, comment }));
    
    setRating(0);
    setComment('');
    toast.success('Avaliação enviada com sucesso!');
  };

  return (
    <div className='mt-4'>
      <h3>Avaliações</h3>
      
      {!userInfo ? (
        <p>Por favor, <Link to='/login'>faça login</Link> para deixar uma avaliação</p>
      ) : (
        <Form onSubmit={submitHandler} className='mb-4'>
          <Form.Group controlId='rating' className='mb-3'>
            <Form.Label>Avaliação</Form.Label>
            <div>
              <Rating
                value={rating}
                onClick={(value) => setRating(value)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </Form.Group>
          
          <Form.Group controlId='comment' className='mb-3'>
            <Form.Label>Comentário</Form.Label>
            <Form.Control
              as='textarea'
              row='3'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Deixe seu comentário sobre o produto...'
            />
          </Form.Group>
          
          <Button type='submit' variant='primary'>
            Enviar Avaliação
          </Button>
        </Form>
      )}
      
      {reviews.length === 0 ? (
        <p>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
      ) : (
        <ListGroup variant='flush'>
          {reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating value={review.rating} />
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default ProductReview;
