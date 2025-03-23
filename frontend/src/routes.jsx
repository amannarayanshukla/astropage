import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Product from './pages/Product';
import Products from './pages/Products';
import Login from './admin/Login/Login';
import AdminEvents from './admin/components/AdminEvents/AdminEvents';
import AdminSessions from './admin/components/AdminSessions/AdminSessions';
import Calendly from './pages/Calendly';
import AdminReviews from './admin/components/AdminReviews/AdminReviews';
import SocialConfigs from './admin/components/SocialConfigs/SocialConfigs';
import AdminProducts from './admin/components/AdminProducts/AdminProducts';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Home />,
  },
  {
    path: '/calendly',
    element: <Calendly />,
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: '/admin/events',
        element: <AdminEvents />,
      },
      {
        path: '/admin/sessions',
        element: <AdminSessions />,
      },
      {
        path: '/admin/products',
        element: <AdminProducts />,
      },
      {
        path: '/admin/reviews',
        element: <AdminReviews />,
      },
      {
        path: '/admin/social-configs',
        element: <SocialConfigs />,
      },
    ],
  },
  {
    path: '/products/:id',
    element: <Product />,
  },
  {
    path: '/products',
    element: <Products />,
  },

  {
    path: '/admin/login',
    element: <Login />,
  },
]);

export default browserRouter;
