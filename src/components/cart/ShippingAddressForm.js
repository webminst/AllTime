import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../store/actions/cartActions';
import CheckoutSteps from '../checkout/CheckoutSteps';

const ShippingAddressForm = ({ history }) => {
  const { enderecoEntrega } = useSelector((state) => state.cart);
  
  const [endereco, setEndereco] = useState({
    endereco: enderecoEntrega?.endereco || '',
    cidade: enderecoEntrega?.cidade || '',
    cep: enderecoEntrega?.cep || '',
    pais: enderecoEntrega?.pais || 'Brasil',
  });

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(endereco));
    history.push('/pagamento');
  };

  const handleChange = (e) => {
    setEndereco({
      ...endereco,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h2>Endereço de Entrega</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='endereco' className='mb-3'>
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type='text'
                placeholder='Digite o endereço'
                name='endereco'
                value={endereco.endereco}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId='cidade' className='mb-3'>
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type='text'
                placeholder='Digite a cidade'
                name='cidade'
                value={endereco.cidade}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId='cep' className='mb-3'>
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type='text'
                placeholder='Digite o CEP'
                name='cep'
                value={endereco.cep}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId='pais' className='mb-3'>
              <Form.Label>País</Form.Label>
              <Form.Control
                as='select'
                name='pais'
                value={endereco.pais}
                onChange={handleChange}
                required
              >
                <option value='Brasil'>Brasil</option>
                <option value='Portugal'>Portugal</option>
                <option value='Outro'>Outro</option>
              </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
              Continuar
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ShippingAddressForm;
