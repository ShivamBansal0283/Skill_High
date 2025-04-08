// import React from 'react';
// import profileImg from '../assets/images/profileImg.png';
// import { useNavigate } from 'react-router-dom';

// const NavAvatar: React.FC = () => {
//   const navigate = useNavigate();

//   const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <li className="nav-item dropdown pe-3">
//       <a className="nav-link nav-profile top-2 relative" href="/" data-bs-toggle="dropdown">
//         <img src={profileImg} alt="Profile" className="rounded-full h-9 w-9" />
//         <span className="ml-0 text-[#012970] text-sm font-semibold hidden md:block">Admin</span>
//         <i className="bi bi-chevron-down text-sm ml-12 sm:top-[5%] md:block text-[#012970] bottom-10 relative"></i>
//       </a>
//       <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile bg-white shadow-lg rounded-lg p-2">
//         <li className="dropdown-header text-center">
//           <h6 className="text-lg font-semibold text-gray-700">Admin</h6>
//           <span className="text-sm text-gray-500">Founder</span>
//         </li>
//         <li><hr className="dropdown-divider" /></li>
//         <li>
//           <a className="dropdown-item d-flex items-center text-gray-700 hover:bg-gray-100 p-2" href="users-profile.html">
//             <i className="bi bi-person text-xl mr-2"></i>
//             <span>My Profile</span>
//           </a>
//         </li>
//         <li><hr className="dropdown-divider" /></li>
//         <li>
//           <a className="dropdown-item d-flex items-center text-gray-700 hover:bg-gray-100 p-2" href="users-profile.html">
//             <i className="bi bi-gear text-xl mr-2"></i>
//             <span>Account Settings</span>
//           </a>
//         </li>
//         <li><hr className="dropdown-divider" /></li>
//         <li>
//           <a
//             className="dropdown-item d-flex items-center text-gray-700 hover:bg-gray-100 p-2"
//             href="/"
//             onClick={handleLogout}
//           >
//             <i className="bi bi-box-arrow-right text-xl mr-2"></i>
//             <span>Log Out</span>
//           </a>
//         </li>
//       </ul>
//     </li>
//   );
// };

// export default NavAvatar;








import React from 'react';
import profileImg from '../assets/images/profileImg.png';
import { useNavigate } from 'react-router-dom';

const NavAvatar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/'); // Navigate to the login page (or '/login' if needed)
    window.location.reload(); // Force a reload of the page
  };

  return (
    <li className="nav-item dropdown pe-3">
      <a className="nav-link nav-profile top-2 relative" href="/" data-bs-toggle="dropdown">
        <img src={profileImg} alt="Profile" className="rounded-full h-9 w-9" />
        <span className="ml-0 text-[#012970] text-sm font-semibold hidden md:block">Admin</span>
        <i className="bi bi-chevron-down text-sm ml-12 sm:top-[5%] md:block text-[#012970] bottom-10 relative"></i>
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile bg-white shadow-lg rounded-lg p-2">
        <li className="dropdown-header text-center">
          <h6 className="text-lg font-semibold text-gray-700">Admin</h6>
          <span className="text-sm text-gray-500">Founder</span>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <a className="dropdown-item d-flex items-center text-gray-700 hover:bg-gray-100 p-2" href="users-profile.html">
            <i className="bi bi-person text-xl mr-2"></i>
            <span>My Profile</span>
          </a>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <a className="dropdown-item d-flex items-center text-gray-700 hover:bg-gray-100 p-2" href="users-profile.html">
            <i className="bi bi-gear text-xl mr-2"></i>
            <span>Account Settings</span>
          </a>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <a
            className="dropdown-item d-flex items-center text-gray-700 hover:bg-gray-100 p-2"
            href="#"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right text-xl mr-2"></i>
            <span>Log Out</span>
          </a>
        </li>
      </ul>
    </li>
  );
};

export default NavAvatar;