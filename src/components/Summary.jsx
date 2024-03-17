import { useSelector } from 'react-redux';


import '../assets/styles/Summary.css';
export default function Summary() {
  const reduxProduct = useSelector((sate) => sate.product);
  const step = reduxProduct.step;
  const { creditCard, owner, address, installments, typeId, document } = reduxProduct.userInfo;
  const { title, price } = reduxProduct.product;
  console.log({reduxProduct})

  const purchaseStatus = step === 2 ? 'Pending payment' : 'Approved Payment'

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