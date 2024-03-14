import { Outlet } from 'react-router-dom'
import logo from './assets/img/logo.png'
import { useEffect, useState } from 'react';

export default function App() {
  const [scroll, setScroll] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  // Manejar el evento de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!window.scrollY || window.scrollY < 200) {
        setScroll('');
      } else if (window.scrollY > 600) {
        // Si la página ha sido desplazada más de 600px fijar el header
        setScroll('visible');
      } else {
        // Sino se ocualta
        setScroll('hidde');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const seeMenu = () => {
    setMenuVisible(value => !value);
  }


  return (
    <>
      <header className={`header ${scroll === 'visible' ? 'fixed' : scroll === 'hidde' ? 'hidde' : ''}`}>
        <div className="header-layout">
        <img width={180} height="auto" src={logo} alt="Image Icon" />

        <nav className='nav'>
        <i className="bi bi-list menu-options" onClick={seeMenu}></i>

        {menuVisible &&
          <h3 className="">categories</h3>
          <ul className="">
            <li className=""><a href="#men's clothing" className="">men&apos;s clothing</a></li>
            <li className=""><a href="#jewelery" className="">jewelery</a></li>
            <li className=""><a href="#electronics" className="">electronics</a></li>
            <li className=""><a href="#women's clothing" className="">women&apos;s clothing</a></li>
          </ul>}
        </nav>
        </div>

      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  )
}
