import { useLoaderData } from 'react-router-dom';
import { getProdructs } from '../api/productos';
import Product from '../components/Product';

export async function loader() {
    const response = await getProdructs();
    return response;
  }

export default function Index() {
    const products = useLoaderData();
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
