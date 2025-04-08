import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkSidebarClass = () => {
      setIsSidebarOpen(document.body.classList.contains('toggle-sidebar'));
    };

    checkSidebarClass();

    const observer = new MutationObserver(checkSidebarClass);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <aside
      id="sidebar"
      className={`fixed lg:top-[4.76rem] sm:top-[18%] md:top-[30%] left-0 bottom-0 w-21 z-[996] transition-all duration-300 p-1 overflow-y-auto bg-white shadow-lg
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:block`}
    >
      <ul className="sidebar-nav space-y-1 p-0">
        <li
          className={`nav-item text-[#1f8146] hover:text-white ${
            location.pathname === '/dashboard' ? 'active text-white bg-[#1f8146] rounded-lg' : ''
          }`}
        >
          <Link
            to="/dashboard"
            className="nav-link flex items-center space-x-3 py-3 px-4 rounded-md text-sm font-semibold bg-[#f6f7ff] transition-all duration-300 hover:bg-[#1f8146]"
          >
            <i className="bx bxs-dashboard text-lg"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li
          className={`nav-item text-[#1f8146] hover:text-white ${
            location.pathname === '/course-analytics' ? 'active text-white bg-[#1f8146]' : ''
          }`}
        >
          <Link
            to="/course-analytics"
            className="nav-link flex items-center space-x-3 py-3 px-4 rounded-md text-sm font-semibold bg-[#f6f9ff] transition-all duration-300 hover:bg-[#1f8146]"
          >
            <i className="bi bi-person text-lg"></i>
            <span>Course Analytics</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;