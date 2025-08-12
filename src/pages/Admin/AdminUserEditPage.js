import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import { getUserDetails, updateUser } from '../../store/actions/userActions';
import { USER_UPDATE_RESET } from '../../store/constants/userConstants';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import FormContainer from '../../components/forms/FormContainer';
import Meta from '../../components/ui/Meta';

const AdminUserEditPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }

    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/usuarios');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, userId, user, successUpdate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/usuarios' className='btn btn-light my-3'>
        Voltar
      </Link>
      <FormContainer>
        <Meta title='Editar Usuário' />
        <h1>Editar Usuário</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId='name' className='mb-3'>
              <FormLabel>Nome</FormLabel>
              <FormControl
                type='name'
                placeholder='Digite o nome'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId='email' className='mb-3'>
              <FormLabel>Email</FormLabel>
              <FormControl
                type='email'
                placeholder='Digite o email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId='isadmin' className='mb-3'>
              <FormCheck
                type='checkbox'
                label='É Administrador'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></FormCheck>
            </FormGroup>

            <Button type='submit' variant='primary' className='mt-3'>
              Atualizar
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AdminUserEditPage;
