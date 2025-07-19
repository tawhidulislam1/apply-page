import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import FormList from './dashboard/ApplicantDetails.jsx';
import FormDetails from './dashboard/FormDetails.jsx';
import AuthProvider from './Provider/authProvider.jsx';
import Login from './dashboard/login.jsx';
import Register from './dashboard/register.jsx';
import PrivateRoute from './router/privateRouter.jsx';
import DashboardLayout from './dashboard/DashboardLayout.jsx';
import Promoters from './dashboard/Promoters/Promoters.jsx';
import AddNew from './dashboard/Promoters/AddNew.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: 'apply',
        element: <FormList />
      },
      {
        path: 'view/:id',
        element: <FormDetails />
      },
      {
        path: 'promoters',
        element: <Promoters />
      },
      {
        path: 'add-new-promoters',
        element: <AddNew />
      },
    ]
  }
  ,
  {
    path: '/admin/login',
    element: <Login></Login>
  },
  {
    path: '/admin/register',
    element: <Register></Register>
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
