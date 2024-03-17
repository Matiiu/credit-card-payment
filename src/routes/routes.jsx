import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Index, { loader as loaderProducts } from '../pages';
import Pay, { loader as loaderProduct } from '../pages/Pay';
import ErrorPage from '../components/ErrorPage';
// Componente para redireccionar a la página principal

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Index />,
                loader: loaderProducts,
            },
            {
                path: 'pay/:productId',
                element: <Pay />,
                loader: loaderProduct,
                errorElement: <ErrorPage /> // Carga el componente en caso de algún error
            },
            {
                path: '*',
                // Devolver al usuario a la página principal en caso de que escriba una ruta errónea
                element: <Navigate to={'/'} replace />
            }
        ]

    }
])