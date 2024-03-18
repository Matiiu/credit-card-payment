import { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from 'react-router-dom';

import { getProduct } from "../api/productos";
import ModalPay from "../components/ModalPay";
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';



import '../assets/styles/Pay.css';

export async function loader({ params }) {
  // Obtenemos el id de la variable dinamica que se declaro en las rutas
  const response = await getProduct(params?.productId ?? '');
  if (!Object.values(response).length) {
    throw new Response('', {
        status: 404,
        statusText: 'No Hay Resultados',
    });
}
  return response;
}


export default function Pay() {
  const product = useLoaderData();
  const navigate = useNavigate();
  const { id, title, price, description, category, image } = product;
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [completePurchase, setCompletePurchase] = useState(false);



  useEffect(() => {
    // Inmedietamente nuestra página carga
    // Guardamos el id del producto en nuestro storage local
    localStorage.setItem('productId', (id).toString());
    // Guardamos la información del producto en nuestro sorage global
    dispatch(addProduct({ product }));
    // Validamos si el cliente se encuentra en el paso final, lo que significa que ya había finalizado el pago
    const stepStoage = localStorage.getItem('step') || '';
    if (stepStoage && Number(stepStoage) === 3) {
      setCompletePurchase(true);
    }
  }, []);

  const handleReverse = () => {
    // Creamos un mensaje de cancelación en caso de que el cliente ya hubiera terminado la compra
    // o de devolución para devolverlo a la tienda 
    let msgAlert = completePurchase
      ? 'If you cancel your purchase, all product data will be deleted. Do you agree to continue?'
      : 'Do you confirm that you do not wish to continue purchasing this product?';
    // Creamos una alerta de confirmación
    const confirmCancel = window.confirm(msgAlert);
    if (confirmCancel) {
      // Si el usaurio confirma la cancelación eliminamos los datos del produto, el paso en el que iba el cliente
      // y el id de nuestros storages y devovlemos al cliente a la tienda
      localStorage.removeItem('productId');
      localStorage.removeItem('step');
      if (completePurchase) {
        localStorage.removeItem('cardInfo');
      }
      dispatch(addProduct({ product: {} }));
      navigate('/')
    }
  };

  return (
    <div>
      <div className='product-pay container'>
        <button
          className="button-reverse"
          onClick={handleReverse}
        >
          {completePurchase
            ? <i className="bi bi-x-circle"></i>
            : <i className="bi bi-skip-backward-fill"></i>}
          {completePurchase ? 'Cancel Purchase' : 'Back'}
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
            >{completePurchase ? 'View purchase information' : 'Pay with credit card'}</button>
          </div>
        </section>
      </div>
      {modalOpen && <ModalPay setModalOpen={setModalOpen} />}
    </div>
  )
}
