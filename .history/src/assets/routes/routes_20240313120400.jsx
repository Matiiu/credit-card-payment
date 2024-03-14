import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import Index from '../../pages/';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Index />
            }
        ]

    }
])