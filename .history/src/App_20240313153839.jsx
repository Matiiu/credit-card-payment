import { Outlet } from 'react-router-dom'
import logo from './assets/img/logo.png'
import { useEffect, useState } from 'react';

export default function App() {
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1200) {
        setFixed(true);
        console.log('lo hizo')
      } else {
        setFixed(false);
        console.log('no lo hizo')
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      <header className={`header ${fixed ? 'fixed' : 'hidde'}`}>
        <div className="header-layout">
        <img width={200} height="auto" src={logo} alt="Image Icon" />

        <nav>
          <h3 className="">categories</h3>
          <ul className="">
            <li className=""><a href="#men's clothing" className="">men&apos;s clothing</a></li>
            <li className=""><a href="#jewelery" className="">jewelery</a></li>
            <li className=""><a href="#electronics" className="">electronics</a></li>
            <li className=""><a href="#women's clothing" className="">women&apos;s clothing</a></li>
          </ul>
        </nav>
        </div>

      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  )
}
