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
import { Provider, useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import store from './redux/store';
import Topbar from './Components/generic/Topbar';
import LCHNotional from './Components/xva/LCHNotional';

const App = () => {
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
        <Topbar />
        <LCHNotional />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
