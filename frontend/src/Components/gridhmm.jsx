import { DataGrid } from '@mui/x-data-grid';

// Add the relevant part of your code here

<div className="data-grid-container">
  <div className="data-grid-wrapper">
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      loading={loading}
      sx={{
        "& .MuiDataGrid-row:nth-of-type(odd)": {
          backgroundColor: "#f5f5f5",
        },
        "& .MuiDataGrid-row:nth-of-type(even)": {
          backgroundColor: "#ffffff",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#AE1A1A",
          color: "#ffffff",
        },
        "& .MuiDataGrid-toolbarContainer": {
          color: "white",
          "& .MuiButtonBase-root": {
            color: "#AE1A1A",
          },
        },
        "& .MuiDataGrid-root": {
          width: 'auto',
          minWidth: '80%',
          maxWidth: '100%',
        },
        "& .MuiDataGrid-viewport": {
          overflowX: 'hidden',
        },
      }}
      slots={{
        toolbar: GridToolbar,
      }}
    />
  </div>
</div>



.data-grid-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}

.data-grid-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  max-width: 100%;
  flex-grow: 1;
}
