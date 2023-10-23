
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export default function Header() {



  let [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const togggleMenu = () => {
    setMenuVisible(!menuVisible ? openMenu : closeMenu);
  };
  const menuIcon = <FontAwesomeIcon icon={menuVisible ? faXmark : faBars} />;

  return (
    <header>
      <nav id="main-navigation">
        <span id="title">
          <h1>University</h1>
          <button id="menu" className="pull-right" onClick={togggleMenu}>
            {menuIcon}
          </button>
        </span>
        <ul className={`list-items ${menuVisible ? 'show' : 'hide'}`} onClick={closeMenu}>
          <li className="item">
            <Link to="/">Home</Link>
          </li>
          <li className="item">
            <Link to="/contacts">Contacts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

