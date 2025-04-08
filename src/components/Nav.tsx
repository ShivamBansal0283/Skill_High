import React from 'react';
import NavAvatar from './NavAvatar';

const Nav: React.FC = () => {
  return (
    <nav className="header-nav ml-auto">
      <ul className="flex items-center space-x-6 mb-0">
        <NavAvatar />
      </ul>
    </nav>
  );
};

export default Nav;