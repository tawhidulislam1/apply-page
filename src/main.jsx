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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/apply',
    element: <FormList></FormList>,
  },
  {
    path: '/apply/view/:id',
    element: <FormDetails />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
