//app.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Topbar from './Components/generic/Topbar';
import CustomSidebar from './Components/generic/Sidebar';
import TradeBlotter from './Components/fva/TradeBlotter';
import LCHNotional from './Components/fva/LCHNotional';
import UnmanagedSecured from './Components/fva/UnmanagedSecured';
import CarryViewer from './Components/fva/CarryViewer';
import './Styles/App.css';

function App() {
  return (
    <Router basename={BASE_PATH}>
      <div className="App">
        <Topbar />
        <CustomSidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/fva/trade_blotter" />} />
            <Route path="/fva/lch_notional" element={<LCHNotional />} />
            <Route path="/fva/remark_unsecured" element={<UnmanagedSecured />} />
            <Route path="/fva/trade_blotter" element={<TradeBlotter />} />
            <Route path="/fva/carry_viewer" element={<CarryViewer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


//tradeblotter.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TradeTable from './TradeTable';
import TradeForm from './TradeForm';
import { Box, Button } from '@mui/material';
import { fetchTrades, addTrade, editTrade, deleteTrade } from '../redux/actions';

const TradeBlotter = () => {
  const dispatch = useDispatch();
  const selectedRow = useSelector((state) => state.selectedRow);
  const showTable = useSelector((state) => state.showTable);
  const showForm = useSelector((state) => state.showForm);

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedRow.DatabaseID) {
      dispatch(editTrade(selectedRow));
    } else {
      dispatch(addTrade(selectedRow));
    }
  };

  const handleDelete = async () => {
    dispatch(deleteTrade(selectedRow.DatabaseID));
  };

  const handleOpenDeleteDialog = () => {
    // open delete confirmation dialog
  };

  const handleCloseAddDialog = () => {
    // close add/edit form
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100vw">
      <Box display="flex" flexDirection="row" width="100%" height="calc(100vh - 50px)" paddingTop="20px" marginTop="60px" boxSizing="border-box">
        {showTable && <TradeTable />}
        {showForm && (
          <TradeForm
            handleSubmit={handleSubmit}
            handleOpenDeleteDialog={handleOpenDeleteDialog}
            handleCloseAddDialog={handleCloseAddDialog}
          />
        )}
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" height="50px" position="fixed" bottom="0" width="100%">
        <Button
          className={showTable ? 'hideButton' : 'showButton'}
          onClick={() => dispatch({ type: 'TOGGLE_TABLE' })}
          style={{ backgroundColor: showTable ? 'white' : 'red', color: showTable ? 'red' : 'white', border: '1px solid red' }}
        >
          {showTable ? 'Hide Grid' : 'Show Grid'}
        </Button>
        <Button
          className={showForm ? 'hideButton' : 'showButton'}
          onClick={() => dispatch({ type: 'TOGGLE_FORM' })}
          style={{ backgroundColor: showForm ? 'white' : 'red', color: showForm ? 'red' : 'white', border: '1px solid red' }}
        >
          {showForm ? 'Hide Form' : 'Show Form'}
        </Button>
      </Box>
    </Box>
  );
};

export default TradeBlotter;


//tradetable.jsx

import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'TradeDate', headerName: 'Trade Date', width: 150 },
  { field: 'ValuationFunction', headerName: 'Valuation Function', width: 150 },
  { field: 'DomCurrency', headerName: 'Dom Currency', width: 150 },
  { field: 'FgnCurrency', headerName: 'Fgn Currency', width: 150 },
  { field: 'Index1', headerName: 'Index 1', width: 150 },
  { field: 'Index2', headerName: 'Index 2', width: 150 },
  { field: 'Level', headerName: 'Level', width: 150, getCellClassName: (params) => parseFloat(params.value) < 0 ? 'negative' : '' },
  { field: 'Maturity', headerName: 'Maturity', width: 150 },
  { field: 'Risk', headerName: 'Risk', width: 150, getCellClassName: (params) => parseFloat(params.value) < 0 ? 'negative' : '' },
  { field: 'Direction', headerName: 'Direction', width: 150 },
  { field: 'Cost', headerName: 'Cost(bps)', width: 150, getCellClassName: (params) => parseFloat(params.value) < 0 ? 'negative' : '' },
  { field: 'Comment', headerName: 'Comment', width: 150 },
  { field: 'DatabaseID', headerName: 'Database ID', width: 150 },
  { field: 'Nominal1', headerName: 'Nominal 1', width: 150, getCellClassName: (params) => parseFloat(params.value) < 0 ? 'negative' : '' },
  { field: 'Nominal2', headerName: 'Nominal 2', width: 150, getCellClassName: (params) => parseFloat(params.value) < 0 ? 'negative' : '' },
];

const TradeTable = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.rows);

  const handleSelectionModelChange = (selection) => {
    const selected = rows.find((row) => row.id === selection[0]);
    if (selected) {
      dispatch({ type: 'SET_SELECTED_ROW', payload: selected });
    }
  };

  return (
    <div style={{ flex: 7, height: 'calc(100vh - 100px)', overflow: 'auto', paddingRight: '10px', boxSizing: 'border-box' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
        onSelectionModelChange={handleSelectionModelChange}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f0f0f0',
            fontWeight: 'bold',
          },
          '& .negative': {
            color: 'red',
          },
        }}
      />
    </div>
  );
};

export default TradeTable;

//tradeform.jsx

import React from 'react';
import {
  TextField, Button, MenuItem, FormControl, InputLabel, Select, Box
} from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';

const domCurrencies = ['USD', 'JPY', 'EUR', 'GBP', 'AUD', 'SEK', 'NOK', 'NZD'];
const forCurrencies = ['USD', 'JPY', 'EUR', 'GBP', 'AUD', 'SEK', 'NOK', 'NZD'];
const indexes = ['AUD-AONIA', 'AUD-BBSW', 'EONIA', 'EuroSTR', 'SONIA', 'TONA', 'NOK NIBOR', 'SOFR', 'LIBOR', 'UKRPI', 'USCPI'];
const valuationFunctions = ['InterestRateSwap', 'BasisSwap', 'BasisSwapMTM2', 'InflationSwapZeroCoupon', 'FXForward'];

const FormContainer = styled(Box)({
  flex: '3',
  height: 'calc(100vh - 100px)',
  overflow: 'auto',
  padding: '16px',
  boxSizing: 'border-box',
  margin: 'auto', // Center horizontally
});

const SubmitButton = styled(Button)({
  backgroundColor: 'red',
  color: 'white',
  marginTop: '10px',
  '&:hover': {
    backgroundColor: 'darkred',
  },
});

const ResetButton = styled(Button)({
  backgroundColor: 'white',
  color: 'red',
  border: '1px solid red',
  marginTop: '10px',
  marginLeft: '10px',
  '&:hover': {
    backgroundColor: 'lightgray',
  },
});

const TradeForm = ({ handleSubmit, handleOpenDeleteDialog, handleCloseAddDialog }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.selectedRow) || {
    TradeDate: '',
    ValuationFunction: '',
    DomCurrency: '',
    FgnCurrency: '',
    Index1: '',
    Index2: '',
    Level: '',
    Maturity: '',
    Risk: '',
    Direction: '',
    Cost: '',
    Comment: '',
    DatabaseID: '',
    Nominal1: '',
    Nominal2: ''
  };

  const handleChange = (e) => {
    dispatch({
      type: 'SET_SELECTED_ROW',
      payload: { ...formData, [e.target.name]: e.target.value }
    });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_SELECTED_ROW' });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Trade Date"
          type="date"
          name="TradeDate"
          value={formData.TradeDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Valuation Function</InputLabel>
          <Select
            name="ValuationFunction"
            value={formData.ValuationFunction}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {valuationFunctions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Domestic Currency</InputLabel>
          <Select
            name="DomCurrency"
            value={formData.DomCurrency}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {domCurrencies.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Foreign Currency</InputLabel>
          <Select
            name="FgnCurrency"
            value={formData.FgnCurrency}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {forCurrencies.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Index 1</InputLabel>
          <Select
            name="Index1"
            value={formData.Index1}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {indexes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Index 2</InputLabel>
          <Select
            name="Index2"
            value={formData.Index2}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {indexes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Level"
          name="Level"
          value={formData.Level}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Maturity"
          name="Maturity"
          value={formData.Maturity}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Risk (USD)"
          name="Risk"
          value={formData.Risk}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Direction"
          name="Direction"
          value={formData.Direction}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cost (bps)"
          name="Cost"
          value={formData.Cost}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Comment"
          name="Comment"
          value={formData.Comment}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Database ID"
          name="DatabaseID"
          value={formData.DatabaseID}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Nominal 1"
          name="Nominal1"
          value={formData.Nominal1}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nominal 2"
          name="Nominal2"
          value={formData.Nominal2}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between">
          <SubmitButton type="submit">
            {formData.DatabaseID ? 'Edit Entry' : 'Add Entry'}
          </SubmitButton>
          {!formData.DatabaseID && (
            <ResetButton onClick={handleReset}>
              Reset
            </ResetButton>
          )}
          {formData.DatabaseID && (
            <Button onClick={handleOpenDeleteDialog} variant="contained" color="secondary">
              Delete Entry
            </Button>
          )}
          {formData.DatabaseID && (
            <Button onClick={handleCloseAddDialog} variant="contained" color="primary">
              Cancel Edit
            </Button>
          )}
        </Box>
      </form>
    </FormContainer>
  );
};

export default TradeForm;


//actions.js

// src/redux/actions.js

import axios from 'axios';

export const fetchTrades = () => async (dispatch) => {
  const response = await axios.get('/fva/trade_blotter/get_trades');
  dispatch({ type: 'SET_ROWS', payload: response.data });
};

export const addTrade = (trade) => async (dispatch) => {
  const response = await axios.post('/fva/trade_blotter/add_trade', trade);
  dispatch({ type: 'ADD_ROW', payload: response.data });
};

export const editTrade = (trade) => async (dispatch) => {
  const response = await axios.post('/fva/trade_blotter/edit_trade', trade);
  dispatch({ type: 'UPDATE_ROW', payload: response.data });
};

export const deleteTrade = (id) => async (dispatch) => {
  await axios.post('/fva/trade_blotter/delete_trade', { id });
  dispatch({ type: 'DELETE_ROW', payload: id });
};


//reducers.js

// src/redux/reducers.js

const initialState = {
  rows: [],
  selectedRow: null,
  showTable: true,
  showForm: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROWS':
      return { ...state, rows: action.payload };
    case 'ADD_ROW':
      return { ...state, rows: [...state.rows, action.payload] };
    case 'UPDATE_ROW':
      return {
        ...state,
        rows: state.rows.map((row) =>
          row.DatabaseID === action.payload.DatabaseID ? action.payload : row
        ),
      };
    case 'DELETE_ROW':
      return {
        ...state,
        rows: state.rows.filter((row) => row.DatabaseID !== action.payload),
      };
    case 'SET_SELECTED_ROW':
      return { ...state, selectedRow: action.payload };
    case 'RESET_SELECTED_ROW':
      return { ...state, selectedRow: null };
    case 'TOGGLE_TABLE':
      return { ...state, showTable: !state.showTable };
    case 'TOGGLE_FORM':
      return { ...state, showForm: !state.showForm };
    default:
      return state;
  }
};

export default rootReducer;


//store.js

// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;


//index.js

// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
