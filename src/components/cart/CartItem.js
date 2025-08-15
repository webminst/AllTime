import React from 'react';
import { Card, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../../store/actions/cartActions';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    if (window.confirm('Tem certeza que deseja remover este item?')) {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <Card className='mb-3'>
      <Card.Body>
        <Row>
          <Col md={2}>
            <Image src={item.imagem} alt={item.nome} fluid rounded />
          </Col>
          <Col md={3}>
            <Link to={`/produto/${item.produto}`}>{item.nome}</Link>
          </Col>
          <Col md={2}>R$ {item.preco.toFixed(2)}</Col>
          <Col md={2}>
            <Form.Control
              as='select'
              value={item.quantidade}
              onChange={(e) =>
                dispatch(
                  addToCart(item.produto, Number(e.target.value))
                )
              }
            >
              {[...Array(item.emEstoque).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col md={2}>
            <Button
              type='button'
              variant='light'
              onClick={() => removeFromCartHandler(item.produto)}
            >
              <i className='fas fa-trash'></i>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
