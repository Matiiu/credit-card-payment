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
    const prevScrollY = useRef(0);

    useEffect(() => {
      const handleScroll = () => {
          const scrollY = window.scrollY;

          if (scrollY > prevScrollY.current) {
              // Scrolling down
              const windowHeight = window.innerHeight;
              const productBottom = productRef.current.getBoundingClientRect().bottom;

              if (productBottom < windowHeight) {
                  setCurrentProductIndex(prevIndex => Math.min(prevIndex + 1, products.length - 1));
              }
          } else {
              // Scrolling up
              const productTop = productRef.current.getBoundingClientRect().top;

              if (productTop >= 0 && currentProductIndex > 0) {
                  setCurrentProductIndex(prevIndex => prevIndex - 1);
              }
          }

          prevScrollY.current = scrollY;
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, [currentProductIndex, products.length]);


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
