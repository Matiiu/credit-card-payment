import { getProdruct } from "../api/productos";
import { useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
    // Obtenemos el id de la variable dinamica que se declaro en las rutas
    const response = await getProdruct(params?.productId ?? '');
    return response;
}


export default function Pay() {
    const product = useLoaderData();
    console.log(product)
  return (
    <div>Pay</div>
  )
}
