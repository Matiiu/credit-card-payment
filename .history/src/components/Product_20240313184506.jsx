import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/Product.css';
export default function Product({ product }) {
    const { id, title, price, description, category, image } = product;
    const navigate = useNavigate();
  return (
    <div className='product' id={category}>
          <section className="product-layout">
              <figure className="bg-image">
              <img src={image} alt={`Image of ${title}`} />
              </figure>

              <div className='product-desciption' >
                  <h2 className='title'>{title}</h2>
                  <p className="price">${price}</p>
                  <p className="category" ><b>Category:</b> {category}</p>
                  <p className="description">{description}</p>
                  <button className='button' onClick={() => navigate(`pay/${id}`)}>Buy</button>
              </div>
          </section>
    </div>
  )
}

Product.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    }).isRequired
  };
