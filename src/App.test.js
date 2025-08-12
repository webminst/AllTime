import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

const renderWithProviders = (component) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('App Component', () => {
  test('renders the header', () => {
    renderWithProviders(<App />);
    const headerElement = screen.getByText(/all time/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the home page by default', () => {
    renderWithProviders(<App />);
    const homeElement = screen.getByText(/bem-vindo/i);
    expect(homeElement).toBeInTheDocument();
  });
});
