import React from 'react';
import logo from './../logo.svg';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header>
        <img className="heroLogo" alt="CV Builder Logo" src={logo} />
        <h1>CV Builder</h1>
      </header>
    );
  }
}

export default Header;