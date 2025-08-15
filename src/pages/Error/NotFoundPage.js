import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Meta from '../../components/ui/Meta';

const NotFoundPage = () => {
  return (
    <Container className='my-5'>
      <Meta title='Página não encontrada' />
      <Row className='justify-content-md-center'>
        <Col md={8} className='text-center'>
          <h1 className='display-1'>404</h1>
          <h2>Página não encontrada</h2>
          <p className='lead'>
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button as={Link} to='/' variant='primary' className='mt-3'>
            Voltar para a página inicial
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
