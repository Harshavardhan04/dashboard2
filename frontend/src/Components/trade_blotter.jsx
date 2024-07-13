import React, { useState, useEffect } from 'react';
import {
  TextField, Button, MenuItem, Container, FormControl, InputLabel, Select, Box
} from '@mui/material';
import {
  DataGrid,
  GridToolbar,
} from '@mui/x-data-grid';
import { styled } from '@mui/system';

const domCurrencies = ['USD', 'JPY', 'EUR', 'GBP', 'AUD', 'SEK', 'NOK', 'NZD'];
const forCurrencies = ['USD', 'JPY', 'EUR', 'GBP', 'AUD', 'SEK', 'NOK', 'NZD'];
const indexes = ['AUD-AONIA', 'AUD-BBSW', 'EONIA', 'EuroSTR', 'SONIA', 'TONA', 'NOK NIBOR', 'SOFR', 'LIBOR', 'UKRPI', 'USCPI'];
const valuationFunctions = ['InterestRateSwap', 'BasisSwap', 'BasisSwapMTM2', 'InflationSwapZeroCoupon', 'FXForward'];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'TradeDate', headerName: 'Trade Date', width: 150 },
  { field: 'Trader', headerName: 'Trader', width: 150 },
  { field: 'TradeSubType', headerName: 'Trade Sub Type', width: 150 },
  { field: 'Underlying', headerName: 'Underlying', width: 150 },
  { field: 'Currency', headerName: 'Currency', width: 150 },
  { field: 'Strategy', headerName: 'Strategy', width: 150 },
  { field: 'Notional', headerName: 'Notional', width: 150 },
  { field: 'MaturityDate', headerName: 'Maturity Date', width: 150 },
  { field: 'RequestType', headerName: 'Request Type', width: 150 },
  { field: 'Client', headerName: 'Client', width: 150 },
];

const ContainerStyled = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
  alignItems: 'flex-start',
  paddingTop: '20px',
  marginTop: '20px',
});

const TableContainer = styled(Box)({
  width: '60%',
  height: 'calc(100vh - 100px)',
  overflow: 'auto',
  paddingRight: '10px',
});

const FormContainer = styled(Box)({
  width: '40%',
  height: 'calc(100vh - 100px)',
  overflow: 'auto',
  padding: '16px',
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '16px 0',
  position: 'fixed',
  bottom: '10px',
  left: '20px',
  zIndex: 1000,
});

const ShowButton = styled(Button)({
  backgroundColor: 'red',
  color: 'white',
  border: '1px solid red',
  '&:hover': {
    backgroundColor: 'darkred',
  },
});

const HideButton = styled(Button)({
  backgroundColor: 'white',
  color: 'red',
  border: '1px solid red',
  '&:hover': {
    backgroundColor: 'lightgray',
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: 'red',
  color: 'white',
  '&:hover': {
    backgroundColor: 'darkred',
  },
});

const HeaderCell = styled('div')({
  fontWeight: 'bold',
  backgroundColor: '#f0f0f0',
});

const TradeForm = () => {
  const [formData, setFormData] = useState({
    tradeDate: '',
    valuationFunction: '',
    domCurrency: '',
    forCurrency: '',
    index1: '',
    index2: '',
    level: '',
    maturity: '',
    riskUsd: '',
    direction: '',
    costBps: '',
    comment: '',
    databaseId: '',
    nominal1: '',
    nominal2: ''
  });
  const [showForm, setShowForm] = useState(true);
  const [showTable, setShowTable] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/trades');
      const data = await response.json();
      setRows(data);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/trade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      console.log('Trade submitted successfully');
    } else {
      console.error('Failed to submit trade');
    }
  };

  return (
    <ContainerStyled>
      {showTable && (
        <TableContainer>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar
            }}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f0f0f0',
                fontWeight: 'bold'
              }
            }}
          />
        </TableContainer>
      )}
      {showForm && (
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Trade Date"
              type="date"
              name="tradeDate"
              value={formData.tradeDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Valuation Function</InputLabel>
              <Select
                name="valuationFunction"
                value={formData.valuationFunction}
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
                name="domCurrency"
                value={formData.domCurrency}
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
                name="forCurrency"
                value={formData.forCurrency}
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
                name="index1"
                value={formData.index1}
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
                name="index2"
                value={formData.index2}
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
              name="level"
              value={formData.level}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Maturity"
              type="date"
              name="maturity"
              value={formData.maturity}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Risk (USD)"
              name="riskUsd"
              value={formData.riskUsd}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Direction"
              name="direction"
              value={formData.direction}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Cost (bps)"
              name="costBps"
              value={formData.costBps}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Database ID"
              name="databaseId"
              value={formData.databaseId}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nominal 1"
              name="nominal1"
              value={formData.nominal1}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nominal 2"
              name="nominal2"
              value={formData.nominal2}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <SubmitButton type="submit">
              Submit
            </SubmitButton>
          </form>
        </FormContainer>
      )}
      <ButtonContainer>
        <Button
          className={showTable ? 'hideButton' : 'showButton'}
          onClick={() => setShowTable(!showTable)}
          style={{
            backgroundColor: showTable ? 'white' : 'red',
            color: showTable ? 'red' : 'white',
            border: '1px solid red',
          }}
        >
          {showTable ? 'Hide Grid' : 'Show Grid'}
        </Button>
        <Button
          className={showForm ? 'hideButton' : 'showButton'}
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: showForm ? 'white' : 'red',
            color: showForm ? 'red' : 'white',
            border: '1px solid red',
          }}
        >
          {showForm ? 'Hide Form' : 'Show Form'}
        </Button>
      </ButtonContainer>
    </ContainerStyled>
  );
};

export default TradeForm;
