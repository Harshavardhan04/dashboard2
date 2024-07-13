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
  { field: 'ValuationFunction', headerName: 'Valuation Function', width: 150 },
  { field: 'DomCurrency', headerName: 'Dom Currency', width: 150 },
  { field: 'FgnCurrency', headerName: 'Fgn Currency', width: 150 },
  { field: 'Index1', headerName: 'Index 1', width: 150 },
  { field: 'Index2', headerName: 'Index 2', width: 150 },
  { field: 'Level', headerName: 'Level', width: 150 },
  { field: 'Maturity', headerName: 'Maturity', width: 150 },
  { field: 'Risk', headerName: 'Risk', width: 150 },
  { field: 'Direction', headerName: 'Direction', width: 150 },
  { field: 'Cost(bps)', headerName: 'Cost(bps)', width: 150 },
  { field: 'Comment', headerName: 'Comment', width: 150 },
  { field: 'DatabaseID', headerName: 'Database ID', width: 150 },
  { field: 'Nominal1', headerName: 'Nominal 1', width: 150 },
  { field: 'Nominal2', headerName: 'Nominal 2', width: 150 },
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
  const [showForm, setShowForm] = useState(true);
  const [showTable, setShowTable] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/trades');
      const data = await response.json();
      setRows(data.map((row, index) => ({ ...row, id: row.id ?? index }))); // Ensure each row has a unique id
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
              type="date"
              name="Maturity"
              value={formData.Maturity}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
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
