import { Outlet } from 'react-router-dom'
import logo from './assets/img/logo.png'

export default function App() {
  return (
    <>
      <header className='header'>
        <div className="header-layout">
        <img width={200} height="auto" src={logo} alt="Image Icon" />

        <nav>
          <h3 className="">categories</h3>
          <ul className="">
            <li className=""><a href="#" className="">men&apos;s clothing</a></li>
            <li className=""><a href="#" className="">jewelery</a></li>
            <li className=""><a href="#" className="">electronics</a></li>
            <li className=""><a href="#" className="">women&apos;s clothing</a></li>



          </ul>
        </nav>
        </div>

      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  )
}
