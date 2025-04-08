import React from 'react';
import webImg from '../assets/images/webImg.png';

const Logo: React.FC = () => {
  const handleToggleSideBar = () => {
    document.body.classList.toggle('toggle-sidebar');
  };

  return (
    <div className="flex items-center justify-between">
      <i
        className="bi bi-list text-2xl text-[#012970] cursor-pointer"
        onClick={handleToggleSideBar}
      ></i>
      <a href="/" className="flex items-center">
        <img src={webImg} alt="Website Logo" className="max-h-10" />
      </a>
    </div>
  );
};

export default Logo;