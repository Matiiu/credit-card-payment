import { Outlet } from 'react-router-dom'

import './App.css';

export default function App() {
  return (
    <>
      <header>header</header>
      <Outlet />
      <footer>footer</footer>
    </>
  )
}
