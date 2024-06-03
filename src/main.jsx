import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import NewClient, { action as newCustomerAction } from './pages/NewCustomer';
import Index, { loader as customersLoader } from './pages/Index'; //Se renombra para identificar porque pueden haber multiples loaders
import ErrorPage from './components/ErrorPage';
import EditCustomer, { loader as editCustomerLoader, action as editCustomerAction }  from './pages/EditCustomer';
import { action as deleteCustomerAction } from './components/Customer';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Index />,
                loader: customersLoader, // Ract-RouterDOM : Obtener datos de una API o un objeto con un Loader (similar a un state)
                errorElement: <ErrorPage />,
            },
            {
                path: "/customer/new",
                element: <NewClient />,
                action: newCustomerAction, // Ract-RouterDOM : Procesar la entradas de datos de un formulario con un Action. Form es un componente de React-Router-DOM
                errorElement: <ErrorPage />,
            },
            {
                path: "/customers/:customerId/edit",
                element: <EditCustomer />,
                loader: editCustomerLoader, //se declara aqui el loader para que sepa que se va a cargar cuando se cargue el componente
                action: editCustomerAction,
                errorElement: <ErrorPage />,
            },
            {
                path: "customers/:customerId/delete",
                action: deleteCustomerAction
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
