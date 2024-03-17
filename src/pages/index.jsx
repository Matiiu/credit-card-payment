import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getProdructs } from '../api/productos';
import Product from '../components/Product';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

export async function loader() {
    const response = await getProdructs();
    return response;
  }

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const products = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    // Validamos en nustro local storage si hay id disponible
    const productId = localStorage.getItem('productId') || '';

    // Validamos si en nuestro store contamos con ID ya guardado y en tal caso
    // lo direccionamos a la página para que continúe con el pago
    if (productId) {
      navigate(`pay/${productId}`);
      return;
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <main className='container'>
        <div>
        {products?.length > 0 && (
            products.map((product => (
                <Product key={product.id} product={product} />
            )))
        )}
        </div>
    </main>
  )
}
