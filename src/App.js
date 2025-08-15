import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configurações
import { ROUTES } from './config/routes';

// Custom Hooks
import useNotification from './hooks/useNotification';

// Components
import Notification from './components/ui/Notification';
import ScrollToTop from './components/ui/ScrollToTop';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './pages/Home/HomePage';
import ProductListPage from './pages/Products/ProductListPage';
import ProductPage from './pages/ProductDetail/ProductPage';
import CartPage from './pages/Cart/CartPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/User/ProfilePage';
import ShippingPage from './pages/Checkout/ShippingPage';
import PaymentPage from './pages/Checkout/PaymentPage';
import PlaceOrderPage from './pages/Checkout/PlaceOrderPage';
import OrderPage from './pages/Order/OrderPage';
import UserOrdersPage from './pages/User/UserOrdersPage';
import AdminProductListPage from './pages/Admin/AdminProductListPage';
import AdminProductEditPage from './pages/Admin/AdminProductEditPage';
import AdminOrderListPage from './pages/Admin/AdminOrderListPage';
import AdminUserListPage from './pages/Admin/AdminUserListPage';
import AdminUserEditPage from './pages/Admin/AdminUserEditPage';
import NotFoundPage from './pages/Error/NotFoundPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';

// Private Route Components
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

// Scroll to top on route change
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  // Initialize notification hook
  const notification = useNotification();

  // Handle global errors
  useEffect(() => {
    const handleGlobalError = (event) => {
      // Prevent default error handling
      event.preventDefault();

      // Log the error
      console.error('Global error caught:', event.error);

      // Show user-friendly error message
      notification.error(
        'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
      );
    };

    // Add global error handler
    window.addEventListener('error', handleGlobalError);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, [notification]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100 text-gray-800">
      <Header />

      <main className="flex-grow">
        <ScrollToTop />
        <ScrollToTopOnNavigate />
        <Notification />
        <ToastContainer position="bottom-right" />

        <Routes>
          {/* Rotas Públicas */}
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductPage />} />
          <Route path={ROUTES.SEARCH} element={<ProductListPage />} />
          <Route path={ROUTES.PAGE} element={<ProductListPage />} />
          <Route path={ROUTES.SEARCH_WITH_PAGE} element={<ProductListPage />} />
          <Route path={ROUTES.CATEGORY} element={<ProductListPage />} />
          <Route path={ROUTES.CART} element={<CartPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />

          {/* Rotas Protegidas - Usuário Logado */}
          <Route element={<PrivateRoute />}>
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.USER_ORDERS} element={<UserOrdersPage />} />
            <Route path={ROUTES.SHIPPING} element={<ShippingPage />} />
            <Route path={ROUTES.PAYMENT} element={<PaymentPage />} />
            <Route path={ROUTES.PLACE_ORDER} element={<PlaceOrderPage />} />
            <Route path={ROUTES.ORDER_DETAIL} element={<OrderPage />} />
          </Route>

          {/* Rotas de Administração */}
          <Route element={<AdminRoute />}>
            <Route path={ROUTES.ADMIN_PRODUCT_LIST} element={<AdminProductListPage />} />
            <Route path={ROUTES.ADMIN_PRODUCT_CREATE} element={<AdminProductEditPage />} />
            <Route path={ROUTES.ADMIN_PRODUCT_EDIT} element={<AdminProductEditPage />} />
            <Route path={ROUTES.ADMIN_ORDER_LIST} element={<AdminOrderListPage />} />
            <Route path={ROUTES.ADMIN_USER_LIST} element={<AdminUserListPage />} />
            <Route path={ROUTES.ADMIN_USER_EDIT} element={<AdminUserEditPage />} />
          </Route>

          {/* Rota 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppContent />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
