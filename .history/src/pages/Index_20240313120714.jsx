import { useLoaderData } from 'react-router-dom';
import { getProdructs } from '../assets/api/productos';

export async function loader() {
    const response = await getProdructs();
    console.log({response})
    return response;
  }

export default function Index() {
  return (
    <div>Index</div>
  )
}
