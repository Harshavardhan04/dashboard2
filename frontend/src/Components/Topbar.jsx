// // // import React from "react";
// // // import "../Styles/Topbar.css"

// // // const Topbar=()=>{
// // //     return(
// // //         <div className="topbar">
// // //             <div className = "side-panel-header">
// // //             <h1>BRM Dashboard</h1>
// // //             </div>
// // //             </div>
// // //     )
// // // }

// // // export default Topbar
// // import React from "react";
// // import "../Styles/Topbar.css";

// // const Topbar = ({ isDarkMode, toggleTheme }) => {
// //   return (
// //     <div className="topbar">
// //       <div className="side-panel-header">
// //         <h1>BRM Dashboard</h1>
// //       </div>
// //       <button onClick={toggleTheme} className="theme-toggle-button">
// //         {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
// //       </button>
// //     </div>
// //   );
// // };

// // export default Topbar;
// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
// import "../Styles/Topbar.css";

// const Topbar = ({ isDarkMode, toggleTheme }) => {
//   return (
//     <div className="topbar">
//       <div className="side-panel-header">
//         <h1>BRM Dashboard</h1>
//       </div>
//       <div className="theme-toggle">
//         <FontAwesomeIcon icon={faSun} className={`icon ${isDarkMode ? "inactive" : "active"}`} />
//         <label className="switch">
//           <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
//           <span className="slider round"></span>
//         </label>
//         <FontAwesomeIcon icon={faMoon} className={`icon ${isDarkMode ? "active" : "inactive"}`} />
//       </div>
//     </div>
//   );
// };

// export default Topbar;
import React from "react";
import "../Styles/Topbar.css";

const Topbar = ({ toggleSidebar, isDarkMode, toggleTheme }) => {
    return (
        <div className="topbar">
            <div className="side-panel-header">
                <h1>BRM Dashboard</h1>
            </div>
            <div className="menu">
                <button className="menu-icon" onClick={toggleSidebar}>
                    &#9776; {/* Hamburger icon */}
                </button>
                <div className="theme-toggle">
                    <i className={`icon sun-icon ${!isDarkMode ? "active" : "inactive"}`}>☀️</i>
                    <label className="switch">
                        <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
                        <span className="slider"></span>
                    </label>
                    <i className={`icon moon-icon ${isDarkMode ? "active" : "inactive"}`}>🌙</i>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
