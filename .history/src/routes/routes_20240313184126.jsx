import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Index, { loader as loaderProducts } from '../pages';
import Pay, {loader as loaderProduct } from '../pages/Pay';

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
            }
        ]

    }
])