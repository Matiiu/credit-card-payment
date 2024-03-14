import PropTypes from 'prop-types';

import '../assets/styles/Product.css';
export default function Product({ product }) {
    console.log({product})
    const { title, price, description, category, image } = product;
  return (
    <div className='products'>
        <h2>{title}</h2>
        <section className="product-layout">
            <img src={image} alt={`Image of ${title}`} />
            <div className='product-desciption'>
                <p className="">{price}</p>
                <p className="">{description}</p>
            </div>
        </section>
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
