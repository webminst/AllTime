import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = React.useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <InputGroup>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Buscar produtos...'
          className='mr-sm-2 ml-sm-5'
        />
        <Button type='submit' variant='outline-success' className='p-2'>
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
