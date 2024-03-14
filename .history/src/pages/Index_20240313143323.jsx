import { useLoaderData } from 'react-router-dom';
import { getProdructs } from '../api/productos';
import Product from '../components/Product';
import { useEffect, useState } from 'react';

export async function loader() {
    const response = await getProdructs();
    return response;
}

export default function Index() {
    const products = useLoaderData();
    
    return (
        <main className='container'>
            <div className="product-list">
                {products?.length > 0 ? (
                    products.map(((product, index) => (
                        <ProductWithScrollControl key={product.id} product={product} index={index} />
                    )))
                ) : <div className="">No hay Productos Disponibles</div>}
            </div>
        </main>
    )
}

function ProductWithScrollControl({ product, index }) {
    const [scrollTriggered, setScrollTriggered] = useState(false);

    useEffect(() => {
      console.log('entra')
        const handleScroll = () => {
            setScrollTriggered(true);
            window.removeEventListener('scroll', handleScroll);
        };

        window.addEventListener('scroll', handleScroll);
        console.log('hace scroll')

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Product
            product={product}
            style={{
                transition: 'opacity 0.5s ease-in-out',
                opacity: scrollTriggered ? 1 : 0,
                transitionDelay: `${0.5 * index}s`,
            }}
        />
    );
}
