import { useLoaderData } from 'react-router-dom';
import { getProdructs } from '../api/productos';
import Product from '../components/Product';
import { useEffect, useState, useRef } from 'react';

export async function loader() {
    const response = await getProdructs();
    return response;
}

export default function Index() {
    const products = useLoaderData();
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const productRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const productTop = productRef.current.getBoundingClientRect().top;

            if (productTop < windowHeight / 2) {
                setCurrentProductIndex(prevIndex => prevIndex + 1);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentProductIndex]);

    return (
        <main className='container'>
            <div className="product-list" ref={productRef}>
                {currentProductIndex < products.length && (
                    <Product product={products[currentProductIndex]} />
                )}
            </div>
        </main>
    );
}
