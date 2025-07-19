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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/apply',
    element: <PrivateRoute><FormList></FormList></PrivateRoute>,
  },
  {
    path: '/apply/view/:id',
    element: <PrivateRoute> <FormDetails /></PrivateRoute>
  },
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
