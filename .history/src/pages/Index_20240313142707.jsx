import { useLoaderData } from 'react-router-dom';
import { getProdructs } from '../api/productos';
import Product from '../components/Product';
import { useEffect, useState } from 'react';

export async function loader() {
    const response = await getProdructs();
    return response;
  }

export default function Index() {
    const [ scrollTriggered, setScrollTriggered] = useState(false);
    const products = useLoaderData();
    
    useEffect(() => {
      const handleScroll = () => {
        setScrollTriggered(true);
        window.removeEventListener('scroll', handleScroll);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  

  return (
    <main className='container'>
        <div className="product-list" ref={productRef}>
        {products?.length > 0 ? (
            products.map(((product, index) => (
                <Product key={product.id} product={product} 
                style={{
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: scrollTriggered ? 1 : 0,
                  transitionDelay: `${0.5 * index}s`,
                }} />
            )))
        ) : <div className="">No hay Productos Disponibles</div>}
        </div>
    </main>
  )
}
