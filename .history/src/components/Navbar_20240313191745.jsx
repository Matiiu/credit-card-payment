import PropTypes from 'prop-types';

export default function Navbar({ menuVisible }) {
  return (
    <nav className={menuVisible ? 'visibility' : ''}>
            <h3>Categories:</h3>
            <ul>
              <li><a href="#men's clothing" className="">men&apos;s clothing</a></li>
              <li><a href="#jewelery" className="">jewelery</a></li>
              <li><a href="#electronics" className="">electronics</a></li>
              <li><a href="#women's clothing" className="">women&apos;s clothing</a></li>
            </ul>
    </nav>
  )
}

Navbar.propTypes = {
    menuVisible: PropTypes.bool.isRequired
  };
