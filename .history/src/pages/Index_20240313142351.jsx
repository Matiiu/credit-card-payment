import { useLoaderData } from 'react-router-dom';
import { getProdructs } from '../api/productos';
import Product from '../components/Product';
import { useEffect, useRef } from 'react';

export async function loader() {
    const response = await getProdructs();
    return response;
  }

export default function Index() {
    const productRef = useRef(null);
    const products = useLoaderData();
    
    useEffect(() => {
      console.log({productRef})
      const handleScroll = () => {
        if (productRef.current) {
          // Calcula la mitad del ancho de la ventana del navegador
          const halfWindowWidth = window.innerWidth / 2;
          // Calcula la posición horizontal del elemento respecto al borde izquierdo del viewport
          const rect = productRef.current.getBoundingClientRect();
          const elementXPosition = rect.left;
          // Ajusta el scroll horizontal para centrar el producto
          window.scrollTo({
            left: elementXPosition - halfWindowWidth + rect.width / 2,
            behavior: 'smooth', // Añade desplazamiento suave
          });
        }
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
            products.map((product => (
                <Product key={product.id} product={product} />
            )))
        ) : <div className="">No hay Productos Disponibles</div>}
        </div>
    </main>
  )
}
