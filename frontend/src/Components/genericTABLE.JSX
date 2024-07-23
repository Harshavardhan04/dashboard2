import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

const GenericTable = ({ rows, columns, loading }) => {
  const isDarkMode = useSelector((state) => state.isDarkMode);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          overflowX: 'auto',
        }}
      >
        <Box
          sx={{
            width: `${columns.length * 150}px`,
            maxWidth: '100%',
            flexGrow: 1,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25, page: 0 },
              },
            }}
            pageSizeOptions={[25, 50, 100]}
            loading={loading}
            slots={{ toolbar: GridToolbar }}
            autoHeight
            sx={{
              '& .MuiDataGrid-row:nth-of-type(odd)': {
                backgroundColor: isDarkMode ? '#424242' : '#f5f5f5',
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: isDarkMode ? '#333333' : '#ffffff',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
                color: isDarkMode ? '#ffffff' : '#000000',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: isDarkMode ? '#333333' : '#AE1A1A',
                color: isDarkMode ? '#ffffff' : '#000000',
              },
              '& .MuiDataGrid-toolbarContainer': {
                color: isDarkMode ? '#ffffff' : '#000000',
              },
              '& .MuiButtonBase-root': {
                color: isDarkMode ? '#ffffff' : '#AE1A1A',
              },
              '& .MuiDataGrid-cell': {
                color: isDarkMode ? '#ffffff' : '#000000',
              },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default GenericTable;
