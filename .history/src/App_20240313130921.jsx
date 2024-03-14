import { Outlet } from 'react-router-dom'
import logo from './assets/img/logo.png'

export default function App() {
  return (
    <>
      <header className='header'>
        <img width={200} src={logo} alt="Image Icon" />
        <nav className="">
          category
        </nav>
      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  )
}
