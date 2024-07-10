// src/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme !== null ? JSON.parse(savedTheme) : true;
  });

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


topbar:
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


app.js

// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Graph from './Components/Graph';
// import Sidebar from './Components/Sidebar';
// import Topbar from './Components/Topbar';
// import Form from './Components/Form';
// import XVA_lchNotional from './Pages/XVA_lchNotional';

// import './App.css';




// // import LCHPage from './Components/LCHPage';

// function App() {
//   return (
//     <div>

//       <Router>
//         <div className="App">
//           <Topbar/>
//           <Sidebar/>
//           <div className="main-content">
//             <Routes>
//               <Route path="/" element={<Navigate to="/fva" />} />
//               <Route path="/xva_view" element={<XVA_lchNotional/>} />
//               <Route path="/fva" element={<Form/>} />
//               <Route path="/xva/burger" element={<div>Burger</div>} />
//               <Route path="/xva/pizza" element={<div>Pizza</div>} />
//               <Route path="/xva/sushi" element={<div>Sushi</div>} />
//               <Route path="/cva/salad" element={<div>Salad</div>} />
//               <Route path="/cva/steak" element={<div>Steak</div>} />
//               <Route path="/fva" element={<div>FVA Component</div>} />
//               <Route path="/fva/pasta" element={<div>Pasta</div>} />
//               <Route path="/fva/ramen" element={<div>Ramen</div>} />
//               <Route path="/fva/bbq" element={<div>BBQ</div>} />
              
//             </Routes>
//           </div>

//         </div>
//       </Router>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '../src/Components/ThemeContext';
import Graph from './Components/Graph';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import Form from './Components/Form';
import XVA_lchNotional from './Pages/XVA_lchNotional';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Topbar />
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/fva" />} />
              <Route path="/xva_view" element={<XVA_lchNotional />} />
              <Route path="/fva" element={<Form />} />
              <Route path="/xva/burger" element={<div>Burger</div>} />
              <Route path="/xva/pizza" element={<div>Pizza</div>} />
              <Route path="/xva/sushi" element={<div>Sushi</div>} />
              <Route path="/cva/salad" element={<div>Salad</div>} />
              <Route path="/cva/steak" element={<div>Steak</div>} />
              <Route path="/fva/pasta" element={<div>Pasta</div>} />
              <Route path="/fva/ramen" element={<div>Ramen</div>} />
              <Route path="/fva/bbq" element={<div>BBQ</div>} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;


form.css

/* body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    transition: background 0.3s ease, color 0.3s ease;
  } */
/*   
  .form-control {
    position: relative;
    margin-bottom: 20px;
  }
  
  .MuiFormHelperText-root {
    margin-left: 14px;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    min-height: 100vh;
    background-color: var(--background-color);
    color: var(--text-color);
  }
  
  .dark-theme {
    --text-color: #ffffff;
    --control-bg-color: #333333;
    --input-bg-color: #444444;
  }
  
  .light-theme {
    --text-color: #000000;
    --control-bg-color: #ffffff;
    --input-bg-color: #f0f0f0;
  }
  
  .form-container {
    background-color: var(--input-bg-color);
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-control {
    margin-bottom: 20px;
  }
  
  .MuiInputBase-input, .MuiFormLabel-root, .MuiSelect-icon {
    color: var(--text-color);
  }
  
  .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: var(--text-color);
  }
  
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: var(--text-color);
  }
  
  .MuiButton-containedPrimary {
    background-color: #007bff;
    color: #fff;
  }
   */
/* 
   body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--background-color);
    opacity: 0.8;
    color: #e6e6e6;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--background-color);
    color: var(--text-color);
  }
  
  .form-container {
    background-color: var(--input-bg-color);
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: var(--text-color);
  }
  
  .form-control {
    margin-bottom: 20px;
  }
  
  .MuiFormHelperText-root {
    margin-left: 14px;
  }
  
  .dark-theme {
    --background-color: #1e1e1e;
    --text-color: #ffffff;
    --control-bg-color: #333333;
    --input-bg-color: #444444;
  }
  
  .light-theme {
    --background-color: #ffffff;
    --text-color: #000000;
    --control-bg-color: #ffffff;
    --input-bg-color: #f0f0f0;
  }
   */
/* 
   body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--background-color);
    opacity: 0.8;
    color: #e6e6e6;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--background-color);
    color: var(--text-color);
  }
  
  .form-container {
    background-color: var(--input-bg-color);
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: var(--text-color);
  }
  
  .form-control {
    margin-bottom: 20px;
  }
  
  .MuiFormHelperText-root {
    margin-left: 14px;
  }
  
  .dark-theme {
    --background-color: #1e1e1e;
    --text-color: #ffffff;
    --control-bg-color: #333333;
    --input-bg-color: #444444;
  }
  
  .light-theme {
    --background-color: #ffffff;
    --text-color: #000000;
    --control-bg-color: #ffffff;
    --input-bg-color: #f0f0f0;
  }
   */

   /* src/Styles/fvaForm.css */
.form-container {
    margin-top: 60px;
  }
  
  .form-content {
    background-color: var(--input-bg-color);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-control {
    margin-bottom: 20px;
  }
  
  button.submit-button {
    background-color: #007bff;
    color: #fff;
  }
  
  button.submit-button:hover {
    background-color: #0056b3;
  }
  

graph.css
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--background-color);
    opacity: 0.8;
    color: #e6e6e6;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--background-color);
    color: var(--text-color);
  }
  
  .topbar {
    background-color: #343a40;
    background-color: var(--control-bg-color);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #4d4d4d;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1000;
  }
  
  .menu {
    display: flex;
    gap: 20px;
    margin-left: auto;
  }
  
  .menu-item {
    color: #e6e6e6;
    font-size: 18px;
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
  }
  
  .menu-item:hover {
    background-color: #007bff;
    color: #fff;
  }
  
  .highcharts-container {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    flex: 1;
    overflow: hidden;
  }
  
  @media (min-width: 768px) {
    .highcharts-container {
      flex-direction: row;
    }
  }
  
  .floating-box-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: 0 auto;
    margin-top: 7vh;
    width: 50%;
  }
  
  .translucent-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background-color: var(--control-bg-color);
    border-radius: 10px;
    padding: 20px;
  }
  
  .translucent-box2 {
    display: flex;
    justify-content: flex-end;
    margin: 5px 10px;
    background-color: var(--control-bg-color);
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
    position: relative;
    z-index: 10;
    width: 40%;
    border-radius: 20px;
    padding: 20px;
    padding: 40px 30px;
  }
  
  .toggle-button {
    padding: 5px 10px;
    margin: auto;
    font-size: 14px;
    cursor: pointer;
    background-color: #313638;
    color: #fff;
    border: none;
    border-radius: 5px;
  }
  
  .control-group {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  
  .side-panel {
    background-color: #343a40;
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #4d4d4d;
  }
  
  @media (min-width: 768px) {
    .side-panel {
      width: 250px;
      border-bottom: none;
      border-right: 1px solid #4d4d4d;
    }
  }
  
  .side-panel-header {
    text-align: center;
    margin-bottom: 20px;
    margin-right: 40px;
    margin-top: 40px;
  }
  
  .profile-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .welcome-message {
    font-size: 16px;
    color: #b3b3b3;
  }
  
  .currency-selector,
  .date-picker,
  .button-group {
    margin-bottom: 20px;
    width: 100%;
    color: var(--input-text-color);
  }
  
  .currency-selector label,
  .date-picker label {
    font-size: 18px;
    font-weight: bold;
    color: var(--text-color);
  }
  
  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: var(--control-bg-color);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  
  .dropdown-content button {
    color: var(--text-color);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }
  
  .dropdown-content button:hover {
    background-color: var(--input-bg-color);
  }
  
  .dropdown:hover .dropdown-content {
    display: block;
  }
  
  .light-theme {
    --background-color: #ffffff;
    --text-color: #000000;
    --control-bg-color: #f0f0f0;
    --border-color: #000000;
    --input-bg-color: #ffffff;
    --input-text-color: #000000;
  }
  
  .dark-theme {
    --background-color: #1e1e1e;
    --text-color: #ffffff;
    --control-bg-color: #343a40;
    --border-color: #ffffff;
    --input-bg-color: #343a40;
    --input-text-color: #ffffff;
  }
  
  .chart-container {
    width: 100%;
    height: 450px; /* Adjusted height to make the graph fit better */
    margin-bottom: 20px;
    background-color: var(--background-color);
    flex-shrink: 0;
    padding-bottom: 40px;
  }
  
  .graph-container {
    width: 95%;
    margin-top: 100px; /* Ensure enough space for the selectors */
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    border: 1px solid var(--control-bg-color);
    border-radius: 10px;
    background-color: var(--input-bg-color);
  }
  
  .graph-title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 10px; 
    color: var(--text-color);
  }
  
  .summary-box {
    border: 1px solid var(--control-bg-color);
    background-color: var(--background-color);
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 95%;
  }
  
  .summary-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .dropdown-arrow {
    cursor: pointer;
    font-size: 18px;
    margin-left: 10px;
    transition: transform 0.3s;
  }
  
  .dropdown-arrow:hover {
    transform: scale(1.2);
  }
  
  .currency-breakdown {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--control-bg-color);
  }
  
  .data-table-section {
    overflow-y: auto;
    margin-top: -20px;
    margin-bottom: -20px;
    margin-left: auto;
    margin-right: auto;
    width: 95%;
    background-color: var(--control-bg-color); 
    border-radius: 10px;
  }
  
  .data-table-section .rdt_Table {
    background-color: var(--control-bg-color); /* Same darker grey background */
    color: var(--text-color);
    border-collapse: collapse; /* Ensure borders don't have gaps */
  }
  
  .data-table-section .rdt_TableRow {
    border-bottom: 1px solid var(--border-color); /* Change the bottom border of each row */
  }
  
  .data-table-section .rdt_TableRow:nth-of-type(odd) {
    background-color: var(--input-bg-color); /* Slightly lighter background for odd rows */
  }
  
  .data-table-section .rdt_TableRow:nth-of-type(even) {
    background-color: var(--control-bg-color); /* Darker background for even rows */
  }
  
  .data-table-section .rdt_TableCell {
    border-right: 1px solid var(--border-color); /* Change the right border of each cell */
  }
  
  .data-table-section .rdt_TableRow:last-child {
    border-bottom: none; /* Remove the bottom border for the last row */
  }
  
  .data-table-section .rdt_TableCell:last-child {
    border-right: none; /* Remove the right border for the last cell in each row */
  }
  
  .data-table-section .rdt_Pagination {
    background-color: var(--control-bg-color);
    border-top: 1px solid var(--border-color);
  }
  
  .data-table-section .rdt_Pagination ul li a {
    color: var(--text-color);
  }
  
  .data-table-section .rdt_Pagination ul li a:hover {
    color: #007bff;
  }
  
  .chart-controls button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .chart-controls button:hover {
    background-color: #0056b3;
  }
  
  .main-panel {
    position: relative;
    padding: 10px;
    margin-top: 50px; /* Reduced top margin */
  }
  
  @media (max-width: 767px) {
    .side-panel {
      width: 100%;
    }
  
    .main-panel {
      padding: 10px;
    }
  
    .date-input {
      padding: 8px;
    }
  }
  
  .select__control {
    background-color: #333 !important;
    border-color: #ccc !important;
    color: #fff !important;
  }
  
  .select__single-value {
    color: #fff !important;
  }
  
  .select__menu {
    background-color: #333 !important;
  }
  
  .select__option {
    background-color: #333 !important;
    color: #fff !important;
  }
  
  .select__option--is-focused {
    background-color: #555 !important;
  }
  
  .select__option--is-selected {
    background-color: #007bff !important;
    color: #fff !important;
  }
  
  .select__multi-value {
    background-color: #007bff !important;
    color: #fff !important;
  }
  
  .select__multi-value__label {
    color: #fff !important;
  }
  
  .select__multi-value__remove {
    color: #fff !important;
  }
  
  .select__multi-value__remove:hover {
    background-color: #0056b3 !important;
    color: #fff !important;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
  }
  
  .selectors-container {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Center align the selectors */
    position: absolute;
    top: 180px; /* Adjusted top position */
    left: 20px;
    right: 20px; /* Added to make the selectors span the width of the container */
    z-index: 2;
  }
  
  .date-picker {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  
  .date-input {
    width: 120px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 5px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .dropdown {
    margin-right: 10px;
  }
  
  .chart-container {
    width: 100%;
    height: 450px; /* Adjusted height to make the graph fit better */
    margin-top: 10px; /* Reduced top margin */
  }
  
  /* .summary-box {
    margin-top: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
  } */
  
  .data-table-section {
    margin-top: 200px;
  }
  
  .dark-theme {
    --text-color: #ffffff;
    --control-bg-color: #333333;
    --input-bg-color: #444444;
  }
  
  .light-theme {
    --text-color: #000000;
    --control-bg-color: #ffffff;
    --input-bg-color: #f0f0f0;
  }
  
  .bottom-right-buttons {
    display: flex;
    position: absolute;
    bottom: -5px; /* Adjusted position */
    right: 20px; /* Adjusted position */
    gap: 5px;
  }
  
  .download-section {
    position: relative;
    display: inline-block;
  }
  
  .download-section .dropdown-content {
    display: none;
    position: absolute;
    background-color: var(--control-bg-color);
    min-width: 80px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  
  .download-section:hover .dropdown-content {
    display: block;
  }
  
  .download-section .dropdown-content button {
    color: var(--text-color);
    padding: 3px 6px;
    font-size: 12px;
    text-decoration: none;
    display: block;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
  }
  
  .download-section .dropdown-content button:hover {
    background-color: var(--input-bg-color);
  }
  
SELECTOR.CSS

/* .currency-selector-container {
    position: relative;
    display: inline-block;
  }
  
  .dropdown-button {
    display: flex;
    align-items: center;
    background-color: #007bff;
    color: #fff;
    padding: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 200px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  
  .currency-selector-container:hover .dropdown-content {
    display: block;
  }
  
  .currency-selector-container:hover .dropdown-button {
    background-color: #0056b3;
  }
  
  .currency-list {
    max-height: 200px;
    overflow-y: auto;
  }
  
  .currency-item {
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  .currency-item input {
    margin-right: 8px;
  }
   */
   /* Dropdown container */
   .dropdown {
    position: relative;
    display: inline-block;
  }
  
  /* Dropdown button */
  .dropbtn {
    background-color: #272222;
    color: white;
    padding: 5px 10px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%; /* Make sure the button stays consistent in size */
  }
  
  /* Dropdown content (hidden by default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border: 1px solid white;
    max-height: 200px; /* Added a max-height */
    overflow-y: auto; /* Added to make content scrollable */
  }
  
  /* Show the dropdown content on hover */
  .dropdown:hover .dropdown-content {
    display: block;
  }
  
  /* Currency item */
  .currency-item {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
  }
  
  /* Highlight selected items */
  .currency-item.selected {
    background-color: #f1f1f1;
  }
  
  /* Add a white border around the selection box */
  .currency-item:hover {
    background-color: #ddd;
  }
  
  /* Input checkbox */
  .currency-item input {
    margin-right: 10px;
  }
  
