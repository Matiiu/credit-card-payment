import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import '../assets/styles/Product.css';
export default function Product({ product }) {
    const { title, price, description, category, image } = product;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const productElement = document.getElementById(category);
        const rect = productElement.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
        if (rect.top < windowHeight && rect.bottom >= 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [category]);

  return (
    <div className={`product ${visible ? '' : 'hidden'}`} id={category}>
        <div className="product-item" >
          <section className="product-layout">
              <figure className="bg-image">
              <img src={image} alt={`Image of ${title}`} />
              </figure>

              <div className='product-desciption' >
                  <h2 className='title'>{title}</h2>
                  <p className="price">${price}</p>
                  <p className="category" ><b>Category:</b> {category}</p>
                  <p className="description">{description}</p>
                  <button className='button'>Buy</button>
              </div>
          </section>
        </div>
    </div>
  )
}

Product.propTypes = {
    product: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    }).isRequired
  };
