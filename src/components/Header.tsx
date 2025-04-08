import React from 'react';
import Logo from './Logo';
import Nav from './Nav';

const Header: React.FC = () => {
  return (
    <header
      id="header"
      className="fixed top-0 left-0 right-0 z-50 flex items-center h-15 bg-white shadow-md px-3"
    >
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;