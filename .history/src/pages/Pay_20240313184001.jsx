import { getProdruct } from "../api/productos";

export async function loader({ params }) {
    // Obtenemos el id de la variable dinamica que se declaro en las rutas
    const response = await getProdruct(params.productId);
    return response;
}


export default function Pay() {
  return (
    <div>Pay</div>
  )
}
