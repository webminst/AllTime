import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import { createProduct } from '../../store/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../store/constants/productConstants';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import FormContainer from '../../components/forms/FormContainer';
import Meta from '../../components/ui/Meta';

const AdminProductCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/admin/produto/${createdProduct._id}/editar`);
    }
  }, [dispatch, navigate, userInfo, successCreate, createdProduct]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      // Implemente o upload da imagem aqui
      // const { data } = await axios.post('/api/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      // });
      // setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to='/admin/produtos' className='btn btn-light my-3'>
        Voltar
      </Link>
      <FormContainer>
        <Meta title='Criar Produto' />
        <h1>Criar Produto</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingCreate ? (
          <Loader />
        ) : errorCreate ? (
          <Message variant='danger'>{errorCreate}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId='name' className='mb-3'>
              <FormLabel>Nome</FormLabel>
              <FormControl
                type='text'
                placeholder='Digite o nome'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId='price' className='mb-3'>
              <FormLabel>Preço</FormLabel>
              <FormControl
                type='number'
                placeholder='Digite o preço'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId='image' className='mb-3'>
              <FormLabel>Imagem</FormLabel>
              <FormControl
                type='text'
                placeholder='Digite a URL da imagem'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <FormControl
                type='file'
                id='image-file'
                label='Escolher arquivo'
                custom
                onChange={uploadFileHandler}
                className='mt-2'
              />
              {uploading && <Loader />}
            </FormGroup>

            <FormGroup controlId='brand' className='mb-3'>
              <FormLabel>Marca</FormLabel>
              <FormControl
                type='text'
                placeholder='Digite a marca'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId='countInStock' className='mb-3'>
              <FormLabel>Estoque</FormLabel>
              <FormControl
                type='number'
                placeholder='Digite a quantidade em estoque'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId='category' className='mb-3'>
              <FormLabel>Categoria</FormLabel>
              <FormControl
                type='text'
                placeholder='Digite a categoria'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId='description' className='mb-3'>
              <FormLabel>Descrição</FormLabel>
              <FormControl
                as='textarea'
                row='3'
                placeholder='Digite a descrição do produto'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>

            <Button type='submit' variant='primary' className='mt-3'>
              Criar
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AdminProductCreatePage;
