// Table.jsx

import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

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
  { field: 'Risk', headerName: 'Risk (USD)', width: 150, getCellClassName: (params) => parseFloat(params.value) < 0 ? 'negative' : '' },
  { field: 'Direction', headerName: 'Direction', width: 150 },
  { field: 'Cost', headerName: 'Cost (bps)', width: 150, getCellClassName: (params) => parseFloat(params.value) < 0 ? 'negative' : '' },
  { field: 'Comment', headerName: 'Comment', width: 150 },
  { field: 'DatabaseID', headerName: 'Database ID', width: 150 },
  { field: 'Nominal1', headerName: 'Nominal 1', width: 150, getCellClassName: (params) => parseFloat(params.value) < 0 ? 'negative' : '' },
  { field: 'Nominal2', headerName: 'Nominal 2', width: 150, getCellClassName: (params) => parseFloat(params.value) < 0 ? 'negative' : '' },
];

const TradeTable = ({ rows, handleRowSelection }) => {
  return (
    <div style={{ flex: '7', height: 'calc(100vh - 100px)', overflow: 'auto', paddingRight: '10px', boxSizing: 'border-box' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick
        onRowSelected={(params) => handleRowSelection(params.data)}
        components={{
          Toolbar: GridToolbar,
        }}
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



// form.jsx
import React from 'react';
import {
  TextField, Button, MenuItem, FormControl, InputLabel, Select, Box
} from '@mui/material';
import { styled } from '@mui/system';

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

const TradeForm = ({
  formData, handleChange, handleSubmit, handleReset, selectedRow, handleOpenDeleteDialog, handleCloseAddDialog
}) => {
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
            {selectedRow ? 'Edit Entry' : 'Add Entry'}
          </SubmitButton>
          {!selectedRow && (
            <ResetButton onClick={handleReset}>
              Reset
            </ResetButton>
          )}
          {selectedRow && (
            <Button onClick={handleOpenDeleteDialog} variant="contained" color="secondary">
              Delete Entry
            </Button>
          )}
          {selectedRow && (
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

// tradeblotter.jsx
import React from 'react';
import {
  TextField, Button, MenuItem, FormControl, InputLabel, Select, Box
} from '@mui/material';
import { styled } from '@mui/system';

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

const TradeForm = ({
  formData, handleChange, handleSubmit, handleReset, selectedRow, handleOpenDeleteDialog, handleCloseAddDialog
}) => {
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
            {selectedRow ? 'Edit Entry' : 'Add Entry'}
          </SubmitButton>
          {!selectedRow && (
            <ResetButton onClick={handleReset}>
              Reset
            </ResetButton>
          )}
          {selectedRow && (
            <Button onClick={handleOpenDeleteDialog} variant="contained" color="secondary">
              Delete Entry
            </Button>
          )}
          {selectedRow && (
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
