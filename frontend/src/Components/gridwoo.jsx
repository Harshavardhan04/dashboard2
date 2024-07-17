<div className="table-container">
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
            color: "#fff",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#AE1A1A",
            color: "#000000",
          },
          "& .MuiDataGrid-toolbarContainer": {
            color: "white",
            "& .MuiButtonBase-root": {
              color: "#AE1A1A",
            },
          },
          "& .MuiDataGrid-root": {
            minWidth: `${columns.length * 100}px`, // Set minimum width based on column count
            maxWidth: "100%",
          },
          "& .MuiDataGrid-viewport": {
            minWidth: `${columns.length * 100}px`, // Set minimum width based on column count
          },
        }}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  </div>
</div>



.table-container {
  width: 100%;
  margin-top: 100px;
  padding: 20px;
  border: 1px solid var(--control-bg-color);
  border-radius: 10px;
  background-color: var(--input-bg-color);
  display: flex;
  justify-content: center; /* Center the contents horizontally */
}

.data-grid-container {
  display: flex;
  justify-content: center; /* Center the DataGrid horizontally */
  width: 100%;
}

.data-grid-wrapper {
  flex-grow: 1;
  display: flex;
  justify-content: center; /* Center the DataGrid horizontally */
}
