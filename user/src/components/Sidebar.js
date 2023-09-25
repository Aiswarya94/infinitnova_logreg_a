import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      <div className="accordion-header" onClick={toggleAccordion}>
        Menu
      </div>
      {isOpen && (
        <ul className="menu-list">
          <li>
            <Link to="/dashboard" className="link-no-decoration">
              Dashboard
            </Link>
          </li>
          <li>Editor</li>
          <li>
            {/* "Pages" dropdown */}
            <div className="dropdown">
              <span className="dropdown-header">Pages </span>
              <ul className="submenu">
                <li>
                  <Link to="/pages/page1" className="link-no-decoration">
                    Page 1
                  </Link>
                </li>
                <li>
                  <Link to="/pages/page2" className="link-no-decoration">
                    Page 2
                  </Link>
                </li>
                <li>
                  <Link to="/pages/page3" className="link-no-decoration">
                    Page 3
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
