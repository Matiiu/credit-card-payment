import PropTypes from 'prop-types';

import '../assets/styles/Product.css';
export default function Product({ product }) {
    const { title, price, description, category, image } = product;
  return (
    <div className='product'>
        <div className="product-item">
          <section className="product-layout">
              <img src={image} alt={`Image of ${title}`} />
              <div className='product-desciption'>
                  <h3 className='title' id={category}>{title}</h3>
                  <p className="price">${price}</p>
                  <p className="description">{description}</p>
                  <p className="category">{category}</p>
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
