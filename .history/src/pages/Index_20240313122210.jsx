import { useLoaderData } from 'react-router-dom';
import { getProdructs } from '../assets/api/productos';
import Product from '../components/Product';

export async function loader() {
    const response = await getProdructs();
    return response;
  }

export default function Index() {
    const products = useLoaderData();
    console.log({products})
  return (
    <main className='container'>
        <div>
        {products?.length > 0 ? (
            products.map((product => (
                <Product key={product.id} product={product} />
            )))
        ) : <div className="">No hay Productos Disponibles</div>}
        </div>
    </main>
  )
}
