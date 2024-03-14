import { Outlet } from 'react-router-dom'

import './App.css';

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header>header</header>
    <Outlet />
    <footer>footer</footer>
    </>
  )
}
