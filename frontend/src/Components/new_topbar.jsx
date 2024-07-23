import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/actions';
import '../../Styles/Topbar.css';

const Topbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.isDarkMode);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="topbar">
      <div className="side-panel-header">
        <h1 className="site-heading">BRM Dashboard</h1>
      </div>
      <div className="menu">
        <label className="switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
        <i className={`icon sun-icon ${!isDarkMode ? 'active' : 'inactive'}`}></i>
        <i className={`icon moon-icon ${isDarkMode ? 'active' : 'inactive'}`}></i>
      </div>
    </div>
  );
};

export default Topbar;



//app.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material/styles';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';
import CustomSidebar from './Components/generic/Sidebar';
import Topbar from './Components/generic/Topbar';
import TradeBlotter from './Pages/fva/TradeBlotter';
import CarryViewer from './Pages/xva/CarryViewer';
import LCHNotional from './Pages/xva/LCHNotional';
import UnmanagedSecured from './Pages/fva/UnmanagedSecured';
import './App.css';

function App() {
  const isDarkMode = useSelector((state) => state.isDarkMode);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router basename={BASE_PATH}>
          <div className="App">
            <Topbar />
            <CustomSidebar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Navigate to="/xva/lch_notional" />} />
                <Route path="/xva/lch_notional" element={<LCHNotional />} />
                <Route path="/fva/remrsk_unsecured" element={<UnmanagedSecured />} />
                <Route path="/fva/trade_blotter" element={<TradeBlotter />} />
                <Route path="/xva/carry_viewer" element={<CarryViewer />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
