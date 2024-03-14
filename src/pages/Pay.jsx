import { useState } from "react";
import { useNavigate, useLoaderData } from 'react-router-dom';

import { getProdruct } from "../api/productos";
import ModalPay from "../components/ModalPay";

import '../assets/styles/Pay.css';

export async function loader({ params }) {
  // Obtenemos el id de la variable dinamica que se declaro en las rutas
  const response = await getProdruct(params?.productId ?? '');
  return response;
}


export default function Pay() {
  const product = useLoaderData();
  const navigate = useNavigate();
  const { title, price, description, category, image } = product;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className='product-pay container'>
        <button
          className="button-back"
          onClick={() => navigate('/')}
        >
          <i className="bi bi-skip-backward-fill"></i> Back
        </button>
        <section className="product-layout">
          <figure className="bg-image">
            <img src={image} alt={`Image of ${title}`} />
          </figure>

          <div className='product-desciption' >
            <h2 className='title'>{title}</h2>
            <p className="price">${price}</p>
            <p className="category" ><b>Category:</b> {category}</p>
            <p className="description">{description}</p>
            <button
              className='button'
              onClick={() => setModalOpen(true)}
            >Pay with credit card</button>
          </div>
        </section>
      </div>
      {modalOpen && <ModalPay setModalOpen={setModalOpen} />}
    </div>
  )
}
