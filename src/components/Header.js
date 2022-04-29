import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import logo from './../logo.svg';
import './../styles/Header.css';

const Header = () => {
  const headerRef = useRef();
  const logoRef = gsap.utils.selector(headerRef)
  useEffect(() => {
    gsap.to(logoRef('.heroLogo'), {rotate: 360, duration: 10, ease: 'none' , repeat: -1});
  });
  return (
    <header ref={headerRef}>
      <img
        className="heroLogo"
        alt="CV Builder Logo"
        src={logo}
      />
      <h1>CV Builder</h1>
    </header>
  );
};

export default Header;
