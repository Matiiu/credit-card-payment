import PropTypes from 'prop-types';

import '../assets/styles/Summary.css';
export default function Summary({ product, creditCard, installments, typeId, document, owner, address }) {
    const { title, price } = product;

    const typeIdmap = {
      1: 'CC',
      2: 'CE'
    }
    const isTypeId = typeIdmap[typeId];
    const creditCardNumber = `XXXX XXXX XXXX ${creditCard.substring(12)}`;

  return (
    <div className="sumary">
      <h2>Summary of purchase</h2>
      <section className="resume">
        <div className='info-user'>
          <p className=""><b>Document:</b> {isTypeId} {document}</p>
          <p className=""><b>Owner&apos;s Name:</b> {owner}</p>
          <p className=""><b>Address:</b> {address}</p>
          <p className=""><b>Credit Card Number:</b>  {creditCardNumber}</p>
          <p className=""><b>Number of Installments:</b>  {installments}</p>
        </div>
       
       <div className='info-product'>
          <p className=""><b>Product:</b>  {title}</p>
          <p className=""><b>Total:</b>  {price}</p>
          
       </div>
       
      </section>
      
    </div>
  )
}

Summary.propTypes = {
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired,
    creditCard: PropTypes.string.isRequired,
    installments: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    typeId: PropTypes.string.isRequired,
    document: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
};