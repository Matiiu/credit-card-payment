import { useLoaderData } from 'react-router-dom';
import { getProdructs } from '../assets/api/productos';

export async function loader() {
    const response = await getProdructs();
    return response;
  }

export default function Index() {
    const data = useLoaderData();
    console.log({data})
  return (
    <div>Index</div>
  )
}
