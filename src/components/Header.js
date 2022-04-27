import React from 'react';
import logo from './../logo.svg';
import './../styles/Header.css';

const Header = () => {
  return (
    <header>
      <img className="heroLogo" alt="CV Builder Logo" src={logo} />
      <h1>CV Builder</h1>
    </header>
  );
};

export default Header;
