import './Header.scss';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header>
      <nav id="main-navigation">
        <span id="title">
          <h1>University</h1>
          {/* <button id="menu" className="pull-right" onClick={togggleMenu}>
            {menuIcon}
          </button> */}
        </span>
        <ul
        className='list-items'
          // className={`list-items ${menuVisible ? 'show' : 'hide'}`}
          // onClick={closeMenu}
        >
          <li className="item">
            <Link to="/">Home</Link>
          </li>
          <li className="item">
            <Link to="/about">About</Link>
          </li>
          <li className="item">
            <Link to="/contacts">Contact</Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
}
