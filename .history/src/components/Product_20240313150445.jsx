import PropTypes from 'prop-types';

import '../assets/styles/Product.css';
export default function Product({ product }) {
    const { id, title, price, description, category, image } = product;
  return (
    <div className='product'>
        <div className="product-item" id={id}>
          <section className="product-layout">
              <figure className="bg-image">
              <img src={image} alt={`Image of ${title}`} />
              </figure>

              <div className='product-desciption' >
                  <h2 className='title'>{title}</h2>
                  <p className="price">${price}</p>
                  <p className="category" id={category}><b>Category:</b> {category}</p>
                  <p className="description">{description}</p>
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