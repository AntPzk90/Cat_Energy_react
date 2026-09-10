import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import NotFound from '@/pages/NotFound';
import ProductPage from '@/pages/ProductPage/ProductPage';
import Cart from '@/pages/Cart/Cart';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // сюда добавляй новые страницы, например:
      { path: 'catalog', element: <Catalog /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <Cart /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
