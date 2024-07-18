/* styles.css */
.negative {
  color: red;
}


import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import './styles.css'; // Make sure to import the CSS file

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
  { field: 'Cost', headerName: 'Cost(bps)', width: 150, getCellClassName: (params) => parseFloat(params.value) < 0 ? 'negative' : '' },
  { field: 'Comment', headerName: 'Comment', width: 150 },
  { field: 'DatabaseID', headerName: 'Database ID', width: 150 },
  { field: 'Nominal1', headerName: 'Nominal 1', width: 150, getCellClassName: (params) => parseFloat(params.value) < 0 ? 'negative' : '' },
  { field: 'Nominal2', headerName: 'Nominal 2', width: 150, getCellClassName: (params) => parseFloat(params.value) < 0 ? 'negative' : '' },
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

const TradeTable = ({ rows, onSelectionModelChange }) => (
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
      onSelectionModelChange={onSelectionModelChange}
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
);

export default TradeTable;
