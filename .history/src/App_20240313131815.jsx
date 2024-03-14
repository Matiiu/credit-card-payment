import { Outlet } from 'react-router-dom'
import logo from './assets/img/logo.png'

export default function App() {
  return (
    <>
      <header className='header'>
        <div className="container header-layout">
        <img width={250} height="auto" src={logo} alt="Image Icon" />

        <nav>
          <h3 className="">categories</h3>
          <ul className="">
            <li className=""><a href="" className="">mens clothing</a></li>
          </ul>
        </nav>
        </div>

      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  )
}
