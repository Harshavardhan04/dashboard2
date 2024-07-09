// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Graph from './Components/Graph';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import XVA_lchNotional from './Pages/XVA_lchNotional';

import './App.css';




// import LCHPage from './Components/LCHPage';

function App() {
  return (
    <div>

      <Router>
        <div className="App">
          <Topbar/>
          <Sidebar/>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/xva_view" />} />
              <Route path="/xva_view" element={<XVA_lchNotional/>} />
              <Route path="/xva/burger" element={<div>Burger</div>} />
              <Route path="/xva/pizza" element={<div>Pizza</div>} />
              <Route path="/xva/sushi" element={<div>Sushi</div>} />
              <Route path="/cva/salad" element={<div>Salad</div>} />
              <Route path="/cva/steak" element={<div>Steak</div>} />
              <Route path="/fva" element={<div>FVA Component</div>} />
              <Route path="/fva/pasta" element={<div>Pasta</div>} />
              <Route path="/fva/ramen" element={<div>Ramen</div>} />
              <Route path="/fva/bbq" element={<div>BBQ</div>} />
            </Routes>
          </div>

        </div>
      </Router>
    </div>
  );
}

export default App;
