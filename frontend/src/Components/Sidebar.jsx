// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import '../Styles/Sidebar.css';

// // const Sidebar = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [subMenuOpen, setSubMenuOpen] = useState({
// //     xva: false,
// //     cva: false,
// //     fva: false,
// //   });

// //   const navigate = useNavigate();

// //   const toggleSidebar = () => {
// //     setIsOpen(!isOpen);
// //   };

// //   const toggleSubMenu = (menu) => {
// //     setSubMenuOpen((prev) => ({
// //       ...prev,
// //       [menu]: !prev[menu],
// //     }));
// //   };

// //   const handleMainMenuClick = (menu) => {
// //     navigate(`/${menu}`);
// //     setIsOpen(false);
// //   };

// //   return (
// //     <div>
// //       <div className="menu-icon" onClick={toggleSidebar}>
// //         {/* Add menu icon here */}
// //       </div>
// //       <div className={`sidebar-content ${isOpen ? 'open' : ''}`}>
// //         <div className="sidebar-header">
// //           <div className="side-panel-header">
// //             <h2>Dashboard</h2>
// //             <img src="/path/to/profile-pic.jpg" alt="Profile" className="profile-pic" />
// //             <p className="welcome-message">Welcome back, User!</p>
// //             {/* <span className="close-icon" onClick={toggleSidebar}></span> */}
// //           </div>
// //         </div>
// //         <nav className="sidebar-nav">
// //           <ul>
// //             <li className="menu-item">
// //               <span onClick={() => handleMainMenuClick('xva')}>XVA</span>
// //               <span onClick={() => toggleSubMenu('xva')}>{subMenuOpen.xva ? '▲' : '▼'}</span>
// //               <div className={`submenu-toggle ${subMenuOpen.xva ? 'open' : ''}`}>
// //                 {subMenuOpen.xva && (
// //                   <ul className="submenu">
// //                     <li>
// //                       <Link to="/xva/apple">Apple</Link>
// //                     </li>
// //                     <li>
// //                       <Link to="/xva/banana">Banana</Link>
// //                     </li>
// //                     <li>
// //                       <Link to="/xva/cherry">Cherry</Link>
// //                     </li>
// //                   </ul>
// //                 )}
// //               </div>
// //             </li>
// //             <li className="menu-item">
// //               <span onClick={() => handleMainMenuClick('cva')}>CVA</span>
// //               <span onClick={() => toggleSubMenu('cva')}>{subMenuOpen.cva ? '▲' : '▼'}</span>
// //               <div className={`submenu-toggle ${subMenuOpen.cva ? 'open' : ''}`}>
// //                 {subMenuOpen.cva && (
// //                   <ul className="submenu">
// //                     <li>
// //                       <Link to="/cva/durian">Durian</Link>
// //                     </li>
// //                     <li>
// //                       <Link to="/cva/elderberry">Elderberry</Link>
// //                     </li>
// //                     <li>
// //                       <Link to="/cva/fig">Fig</Link>
// //                     </li>
// //                   </ul>
// //                 )}
// //               </div>
// //             </li>
// //             <li className="menu-item">
// //               <span onClick={() => handleMainMenuClick('fva')}>FVA</span>
// //               <span onClick={() => toggleSubMenu('fva')}>{subMenuOpen.fva ? '▲' : '▼'}</span>
// //               <div className={`submenu-toggle ${subMenuOpen.fva ? 'open' : ''}`}>
// //                 {subMenuOpen.fva && (
// //                   <ul className="submenu">
// //                     <li>
// //                       <Link to="/fva/grape">Grape</Link>
// //                     </li>
// //                     <li>
// //                       <Link to="/fva/honeydew">Honeydew</Link>
// //                     </li>
// //                     <li>
// //                       <Link to="/fva/kiwi">Kiwi</Link>
// //                     </li>
// //                   </ul>
// //                 )}
// //               </div>
// //             </li>
// //           </ul>
// //         </nav>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../Styles/Sidebar.css";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const [subMenuOpen, setSubMenuOpen] = useState({
//     xva: false,
//     cva: false,
//     fva: false,
//   });

//   const handleMainMenuClick = (menu) => {
//     setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
//   };

//   const toggleSubMenu = (menu) => {
//     setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
//   };

//   return (
//     <div className={`sidebar-content ${isOpen ? "open" : ""}`}>
//       <div className="sidebar-header">
//         <span className="close-icon" onClick={toggleSidebar}>
//           &times;
//         </span>
//       </div>
//       <div className="sidebar-nav">
//         <ul>
//           <li className="menu-item">
//             <span onClick={() => handleMainMenuClick('xva')}>XVA</span>
//             <span onClick={() => toggleSubMenu('xva')}>{subMenuOpen.xva ? '▲' : '▼'}</span>
//             <div className={`submenu-toggle ${subMenuOpen.xva ? 'open' : ''}`}>
//               {subMenuOpen.xva && (
//                 <ul className="submenu">
//                   <li>
//                     <Link to="/xva/apple">Apple</Link>
//                   </li>
//                   <li>
//                     <Link to="/xva/banana">Banana</Link>
//                   </li>
//                   <li>
//                     <Link to="/xva/cherry">Cherry</Link>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           </li>
//           <li className="menu-item">
//             <span onClick={() => handleMainMenuClick('cva')}>CVA</span>
//             <span onClick={() => toggleSubMenu('cva')}>{subMenuOpen.cva ? '▲' : '▼'}</span>
//             <div className={`submenu-toggle ${subMenuOpen.cva ? 'open' : ''}`}>
//               {subMenuOpen.cva && (
//                 <ul className="submenu">
//                   <li>
//                     <Link to="/cva/durian">Durian</Link>
//                   </li>
//                   <li>
//                     <Link to="/cva/elderberry">Elderberry</Link>
//                   </li>
//                   <li>
//                     <Link to="/cva/fig">Fig</Link>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           </li>
//           <li className="menu-item">
//             <span onClick={() => handleMainMenuClick('fva')}>FVA</span>
//             <span onClick={() => toggleSubMenu('fva')}>{subMenuOpen.fva ? '▲' : '▼'}</span>
//             <div className={`submenu-toggle ${subMenuOpen.fva ? 'open' : ''}`}>
//               {subMenuOpen.fva && (
//                 <ul className="submenu">
//                   <li>
//                     <Link to="/fva/grape">Grape</Link>
//                   </li>
//                   <li>
//                     <Link to="/fva/honeydew">Honeydew</Link>
//                   </li>
//                   <li>
//                     <Link to="/fva/kiwi">Kiwi</Link>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState({ xva: false, cva: false, fva: false });
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleMainMenuClick = (menu) => {
    setSubMenuOpen((prevSubMenuOpen) => ({
      ...prevSubMenuOpen,
      [menu]: !prevSubMenuOpen[menu],
    }));
  };

  const toggleSubMenu = (menu) => {
    setSubMenuOpen((prevSubMenuOpen) => ({
      ...prevSubMenuOpen,
      [menu]: !prevSubMenuOpen[menu],
    }));
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="menu-icon" onClick={toggleSidebar}>
        ☰
      </div>
      <div ref={sidebarRef} className={`sidebar-content ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="close-icon" onClick={closeSidebar}>
            &times;
          </div>
        </div>
        <div className="sidebar-nav">
          <ul>
            <li className="menu-item">
              <span onClick={() => handleMainMenuClick('xva')}>XVA</span>
              <span onClick={() => toggleSubMenu('xva')}>{subMenuOpen.xva ? '▲' : '▼'}</span>
              <div className={`submenu-toggle ${subMenuOpen.xva ? 'open' : ''}`}>
                {subMenuOpen.xva && (
                  <ul className="submenu">
                    <li>
                      <Link to="/xva/apple">Apple</Link>
                    </li>
                    <li>
                      <Link to="/xva/banana">Banana</Link>
                    </li>
                    <li>
                      <Link to="/xva/cherry">Cherry</Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li className="menu-item">
              <span onClick={() => handleMainMenuClick('cva')}>CVA</span>
              <span onClick={() => toggleSubMenu('cva')}>{subMenuOpen.cva ? '▲' : '▼'}</span>
              <div className={`submenu-toggle ${subMenuOpen.cva ? 'open' : ''}`}>
                {subMenuOpen.cva && (
                  <ul className="submenu">
                    <li>
                      <Link to="/cva/durian">Durian</Link>
                    </li>
                    <li>
                      <Link to="/cva/elderberry">Elderberry</Link>
                    </li>
                    <li>
                      <Link to="/cva/fig">Fig</Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li className="menu-item">
              <span onClick={() => handleMainMenuClick('fva')}>FVA</span>
              <span onClick={() => toggleSubMenu('fva')}>{subMenuOpen.fva ? '▲' : '▼'}</span>
              <div className={`submenu-toggle ${subMenuOpen.fva ? 'open' : ''}`}>
                {subMenuOpen.fva && (
                  <ul className="submenu">
                    <li>
                      <Link to="/fva/grape">Grape</Link>
                    </li>
                    <li>
                      <Link to="/fva/honeydew">Honeydew</Link>
                    </li>
                    <li>
                      <Link to="/fva/kiwi">Kiwi</Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

