import PropTypes from 'prop-types';
export default function Product({ product }) {
    console.log({product})
    const { title, price, description, category, image } = product;
  return (
    <div className='products-layout'>
        <h2>{title}</h2>
        <figure className="">
            <img src={image} alt={`Image of ${title}`}>
            <figcaption></figcaption>
        </figure>
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
