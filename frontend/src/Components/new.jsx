actions 
import axios from 'axios';

export const fetchTrades = () => async (dispatch) => {
  try {
    const response = await axios.get('/fva/trade_blotter/get_trades');
    dispatch({ type: 'SET_ROWS', payload: response.data });
  } catch (error) {
    console.error('Failed to fetch trades:', error);
  }
};

export const addTrade = (trade) => async (dispatch) => {
  try {
    const response = await axios.post('/fva/trade_blotter/add_trade', trade);
    dispatch({ type: 'ADD_ROW', payload: response.data });
  } catch (error) {
    console.error('Failed to add trade:', error);
  }
};

export const editTrade = (trade) => async (dispatch) => {
  try {
    const response = await axios.post('/fva/trade_blotter/edit_trade', trade);
    dispatch({ type: 'UPDATE_ROW', payload: response.data });
  } catch (error) {
    console.error('Failed to edit trade:', error);
  }
};

export const deleteTrade = (id) => async (dispatch) => {
  try {
    await axios.post('/fva/trade_blotter/delete_trade', { id });
    dispatch({ type: 'DELETE_ROW', payload: id });
  } catch (error) {
    console.error('Failed to delete trade:', error);
  }
};

reducers 
const initialState = {
  rows: [],
  selectedRow: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROWS':
      return { ...state, rows: action.payload.map((row, index) => ({ ...row, id: index })) };
    case 'ADD_ROW':
      return { ...state, rows: [...state.rows, { ...action.payload, id: state.rows.length }] };
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
    default:
      return state;
  }
};

export default rootReducer;

form 

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

const TradeForm = ({ handleSubmit, handleDelete, formData }) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = React.useState(formData);

  React.useEffect(() => {
    setFormState(formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formState);
  };

  const handleReset = () => {
    setFormState({
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
    });
  };

  return (
    <FormContainer>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Trade Date"
          type="date"
          name="TradeDate"
          value={formState.TradeDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Valuation Function</InputLabel>
          <Select
            name="ValuationFunction"
            value={formState.ValuationFunction}
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
            value={formState.DomCurrency}
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
            value={formState.FgnCurrency}
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
            value={formState.Index1}
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
            value={formState.Index2}
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
          value={form

  blotter 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import TradeTable from './TradeTable';
import TradeForm from './TradeForm';
import { fetchTrades, addTrade, editTrade, deleteTrade } from '../redux/actions';

const TradeBlotter = () => {
  const dispatch = useDispatch();
  const selectedRow = useSelector((state) => state.selectedRow);

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  const handleSubmit = (formData) => {
    if (formData.DatabaseID) {
      dispatch(editTrade(formData));
    } else {
      dispatch(addTrade(formData));
    }
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.DatabaseID) {
      dispatch(deleteTrade(selectedRow.DatabaseID));
    }
  };

  const [showTable, setShowTable] = React.useState(true);
  const [showForm, setShowForm] = React.useState(true);

  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100vw">
      <Box display="flex" flexDirection="row" width="100%" height="calc(100vh - 50px)" paddingTop="20px" marginTop="60px" boxSizing="border-box">
        {showTable && <TradeTable />}
        {showForm && (
          <TradeForm
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            formData={selectedRow || {}}
          />
        )}
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" height="50px" position="fixed" bottom="0" width="100%">
        <Button className={showTable ? 'hideButton' : 'showButton'} onClick={() => setShowTable(!showTable)} style={{ backgroundColor: showTable ? 'white' : 'red', color: showTable ? 'red' : 'white', border: '1px solid red' }}>
          {showTable ? 'Hide Grid' : 'Show Grid'}
        </Button>
        <Button className={showForm ? 'hideButton' : 'showButton'} onClick={() => setShowForm(!showForm)} style={{ backgroundColor: showForm ? 'white' : 'red', color: showForm ? 'red' : 'white', border: '1px solid red' }}>
          {showForm ? 'Hide Form' : 'Show Form'}
        </Button>
      </Box>
    </Box>
  );
};

export default TradeBlotter;

          

