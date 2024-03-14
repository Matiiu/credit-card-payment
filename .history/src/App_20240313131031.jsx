import { Outlet } from 'react-router-dom'
import logo from './assets/img/logo.png'

export default function App() {
  return (
    <>
      <header className='header'>
        <div className="contianer header-layour">
        <img width={250} height="auto" src={logo} alt="Image Icon" />
        <nav className="">
          category
        </nav>
        </div>
       
      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  )
}
