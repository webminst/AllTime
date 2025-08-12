import React from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import Meta from '../../components/ui/Meta';
import { useGetMyOrdersQuery } from '../../store/slices/orderSlice';

const UserOrdersPage = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <Row>
      <Meta title='Meus Pedidos' />
      <Col md={12}>
        <h2>Meus Pedidos</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.error || 'Erro ao carregar pedidos'}</Message>
        ) : !orders || orders.length === 0 ? (
          <Message>Nenhum pedido encontrado</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATA</th>
                <th>TOTAL</th>
                <th>PAGO</th>
                <th>ENTREGUE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>R$ {order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/pedido/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Detalhes
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default UserOrdersPage;
