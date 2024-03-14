import { Outlet } from 'react-router-dom'
import logo from './assets/img/logo.png'
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';

export default function App() {
  const [scroll, setScroll] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  // Manejar el evento de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!window.scrollY || window.scrollY < 200) {
        setScroll('');
      } else if (window.scrollY > 800) {
        // Si la página ha sido desplazada más de 800px fijar el header
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
          <figure className="">
            <img width={180} height="auto" src={logo} alt="Image Icon" />
          </figure>

          <div className='menu-options'>
            <i className={`menu-icon ${menuVisible ? 'bi bi-x-lg' : 'bi bi-list'}`} onClick={seeMenu}></i>
            <Navbar menuVisible={menuVisible} />
          </div>
        </div>
      </header>
      <Outlet />
      <footer className='footer'>
        <div className='footer-layout'>
          <Navbar />
        </div>
      </footer>
    </>
  )
}
