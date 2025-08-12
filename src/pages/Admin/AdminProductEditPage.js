import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { listProductDetails, updateProduct } from '../../store/actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../store/constants/productConstants';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import FormContainer from '../../components/forms/FormContainer';
import Meta from '../../components/ui/Meta';

const AdminProductEditPage = () => {
  const { id: productId } = useParams();
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

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/produtos');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
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
        <Meta title='Editar Produto' />
        <h1>Editar Produto</h1>
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

            <FormGroup controlId='price' className='mb-3'>
              <FormLabel>Preço</FormLabel>
              <FormControl
                type='number'
                placeholder='Digite o preço'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId='image' className='mb-3'>
              <FormLabel>Imagem</FormLabel>
              <FormControl
                type='text'
                placeholder='Digite a URL da imagem'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></FormControl>
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
              ></FormControl>
            </FormGroup>

            <FormGroup controlId='countInStock' className='mb-3'>
              <FormLabel>Estoque</FormLabel>
              <FormControl
                type='number'
                placeholder='Digite a quantidade em estoque'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId='category' className='mb-3'>
              <FormLabel>Categoria</FormLabel>
              <FormControl
                type='text'
                placeholder='Digite a categoria'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup controlId='description' className='mb-3'>
              <FormLabel>Descrição</FormLabel>
              <FormControl
                as='textarea'
                row='3'
                placeholder='Digite a descrição do produto'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></FormControl>
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

export default AdminProductEditPage;
