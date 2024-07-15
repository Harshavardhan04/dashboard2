import React, { useState, useEffect } from 'react';
import {
  TextField, Button, MenuItem, FormControl, InputLabel, Select, Box
} from '@mui/material';
import {
  DataGrid, GridToolbar
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
  { field: 'Risk (USD)', headerName: 'Risk (USD)', width: 150 },
  { field: 'Direction', headerName: 'Direction', width: 150 },
  { field: 'Cost(bps)', headerName: 'Cost(bps)', width: 150 },
  { field: 'Comment', headerName: 'Comment', width: 150 },
  { field: 'DatabaseID', headerName: 'Database ID', width: 150, hide: true },
  { field: 'Nominal1', headerName: 'Nominal 1', width: 150 },
  { field: 'Nominal2', headerName: 'Nominal 2', width: 150 },
];

const ContainerStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100vh',
  alignItems: 'flex-start',
  paddingTop: '20px',
  marginTop: '60px',
  boxSizing: 'border-box',
});

const TableContainer = styled(Box)({
  flex: '7',
  height: 'calc(100vh - 100px)',
  overflow: 'auto',
  paddingRight: '10px',
  boxSizing: 'border-box',
});

const FormContainer = styled(Box)({
  flex: '3',
  height: 'calc(100vh - 100px)',
  overflow: 'auto',
  padding: '16px',
  boxSizing: 'border-box',
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
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/fva_data_get_blotter');
      const data = await response.json();
      console.log('Fetched data:', data); // Debug statement
      setRows(data.map((row, index) => ({ ...row, id: row.DatabaseID ?? index }))); // Ensure each row has a unique id
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
    console.log('Form Data:', formData);  // Log form data
    const response = await fetch('/api/add_trade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      console.log('Trade added successfully');
      // Optionally, refresh data or update state
      const data = await response.json();
      console.log('Response data:', data); // Debug statement
      setRows([...rows, { ...formData, id: formData.DatabaseID }]);
    } else {
      console.error('Failed to add trade');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log('Edit Form Data:', formData);  // Log form data
    const response = await fetch('/api/edit_trade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      console.log('Trade edited successfully');
      // Optionally, refresh data or update state
      const updatedRows = rows.map(row => row.DatabaseID === formData.DatabaseID ? formData : row);
      setRows(updatedRows);
    } else {
      console.error('Failed to edit trade');
    }
  };

  const handleDelete = async () => {
    const response = await fetch('/api/delete_trade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ DatabaseID: formData.DatabaseID })
    });
    if (response.ok) {
      console.log('Trade deleted successfully');
      // Optionally, refresh data or update state
      const updatedRows = rows.filter(row => row.DatabaseID !== formData.DatabaseID);
      setRows(updatedRows);
    } else {
      console.error('Failed to delete trade');
    }
  };

  const handleReset = () => {
    setFormData({
      TradeDate: '',
      ValuationFunction: '',
      DomCurrency: '',
      FgnCurrency: '',
      Index1: '',
      Index2: '',
      Level: '',
      Maturity: '',
      'Risk (USD)': '',
      Direction: '',
      'Cost(bps)': '',
      Comment: '',
      DatabaseID: '',
      Nominal1: '',
      Nominal2: ''
    });
  };

  const handleRowSelection = (selection) => {
    if (selection.length === 1) {
      const selected = rows.find(row => row.id === selection[0]);
      if (selected) {
        setSelectedRow(selected);
        setFormData({
          TradeDate: selected.TradeDate || '',
          ValuationFunction: selected.ValuationFunction || '',
          DomCurrency: selected.DomCurrency || '',
          FgnCurrency: selected.FgnCurrency || '',
          Index1: selected.Index1 || '',
          Index2: selected.Index2 || '',
          Level: selected.Level || '',
          Maturity: selected.Maturity || '',
          Risk: selected['Risk (USD)'] || '',
          Direction: selected.Direction || '',
          Cost: selected['Cost(bps)'] || '',
          Comment: selected.Comment || '',
          DatabaseID: selected.DatabaseID || '',
          Nominal1: selected.Nominal1 || '',
          Nominal2: selected.Nominal2 || ''
        });
      }
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
            disableSelectionOnClick
            checkboxSelection={false}
            onRowSelectionModelChange={(newSelection) => {
              handleRowSelection(newSelection.selectionModel);
            }}
            slots={{
              toolbar: GridToolbar,
            }}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f0f0f0',
                fontWeight: 'bold'
              },
              '& .negative': {
                color: 'red',
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
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Risk (USD)"
              name="Risk (USD)"
              value={formData['Risk (USD)']}
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
              name="Cost(bps)"
              value={formData['Cost(bps)']}
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
              InputProps={{ readOnly: true }}
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
                {selectedRow ? 'Edit Entry' : 'Add Entry'}
              </SubmitButton>
              <ResetButton onClick={handleReset}>
                Reset
              </ResetButton>
              {selectedRow && (
                <DeleteButton onClick={handleDelete}>
                  Delete Entry
                </DeleteButton>
              )}
            </Box>
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
