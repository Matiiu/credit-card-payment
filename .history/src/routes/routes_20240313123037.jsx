import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Index, { loader as loaderProducts } from '../pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Index />,
                loader: loaderProducts
            }
        ]

    }
])