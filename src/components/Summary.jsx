import PropTypes from 'prop-types';

import '../assets/styles/Summary.css';
export default function Summary({
  product,
  creditCard,
  installments,
  typeId,
  document,
  owner,
  address,
  step
}) {
  const purchaseStatus = step === 2 ? 'Pending payment' : 'Approved Payment'
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
          <p><b>Document:</b> {isTypeId} {document}</p>
          <p><b>Owner&apos;s Name:</b> {owner}</p>
          <p><b>Address:</b> {address}</p>
          <p><b>Credit Card Number:</b> {creditCardNumber}</p>
          <p><b>Number of Installments:</b> {installments}</p>
        </div>

        <div className='info-product'>
          <p><b>Product:</b> {title}</p>
          <p><b>Total:</b> ${price}</p>


        </div>

        <div className={`purchase-status ${step > 2 ? 'confirm' : 'pending'}`}>
          <p><b>Purchase Status:</b> {purchaseStatus}</p>
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
  address: PropTypes.string.isRequired,
  step: PropTypes.string.isRequired,
};