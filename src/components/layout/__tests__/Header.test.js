import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Header';

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <Router>
        <Header />
      </Router>
    );
  };

  test('renders the logo with correct text', () => {
    renderHeader();
    const logoElement = screen.getByText(/all time/i);
    expect(logoElement).toBeInTheDocument();
    expect(logoElement.closest('a')).toHaveAttribute('href', '/');
  });

  test('renders navigation links', () => {
    renderHeader();
    
    const homeLink = screen.getByText(/início/i);
    const productsLink = screen.getByText(/produtos/i);
    const cartLink = screen.getByRole('link', { name: /carrinho/i });
    const loginLink = screen.getByRole('link', { name: /login/i });
    
    expect(homeLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    expect(productsLink.closest('a')).toHaveAttribute('href', '/produtos');
    expect(cartLink).toHaveAttribute('href', '/carrinho');
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  test('displays cart item count', () => {
    renderHeader();
    const cartCount = screen.getByText('0');
    expect(cartCount).toBeInTheDocument();
    expect(cartCount).toHaveClass('bg-red-500');
  });
});
