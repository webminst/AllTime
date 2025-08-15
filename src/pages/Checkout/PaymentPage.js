import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/forms/FormContainer';
import CheckoutSteps from '../../components/checkout/CheckoutSteps';
import { savePaymentMethod } from '../../store/actions/cartActions';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  if (!shippingAddress) {
    navigate('/entrega');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/finalizar-pedido');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Método de Pagamento</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Selecione o Método</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal ou Cartão de Crédito'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='PIX'
              id='PIX'
              name='paymentMethod'
              value='PIX'
              checked={paymentMethod === 'PIX'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Boleto Bancário'
              id='Boleto'
              name='paymentMethod'
              value='Boleto'
              checked={paymentMethod === 'Boleto'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
