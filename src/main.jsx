import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import TransactionList from './pages/transactions/TransactionList';
import AddOrEditTransaction from './pages/transactions/AddOrEditTransaction';
import PlacesList from './pages/places/PlacesList';
import { ThemeProvider } from './contexts/Theme.context';
import './index.css';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate replace to="/transactions" />,
      },
      {
        path: '/transactions',
        children: [
          {
            index: true, // /transactions
            element: <TransactionList />,
          },
          {
            path: 'add',
            element: <AddOrEditTransaction />,
          },
          {
            path: 'edit/:id',
            element: <AddOrEditTransaction />,
          },
        ],
      },
      {
        path: '/places',
        children: [
          {
            index: true,
            element: <PlacesList />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
