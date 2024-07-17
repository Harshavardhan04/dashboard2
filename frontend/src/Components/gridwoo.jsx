// <div className="table-container">
//   <div className="data-grid-wrapper">
//     <DataGrid
//       rows={rows}
//       columns={columns}
//       pageSize={10}
//       loading={loading}
//       sx={{
//         "& .MuiDataGrid-row:nth-of-type(odd)": {
//           backgroundColor: "#f5f5f5",
//         },
//         "& .MuiDataGrid-row:nth-of-type(even)": {
//           backgroundColor: "#ffffff",
//         },
//         "& .MuiDataGrid-columnHeaderTitle": {
//           fontWeight: "bold",
//           color: "#fff",
//         },
//         "& .MuiDataGrid-columnHeaders": {
//           backgroundColor: "#AE1A1A",
//           color: "#000000",
//         },
//         "& .MuiDataGrid-toolbarContainer": {
//           color: "white",
//           "& .MuiButtonBase-root": {
//             color: "#AE1A1A",
//           },
//         },
//         "& .MuiDataGrid-root": {
//           minWidth: `${columns.length * 100}px`,
//           maxWidth: "100%",
//           margin: "0 auto",
//         },
//         "& .MuiDataGrid-viewport": {
//           minWidth: `${columns.length * 100}px`,
//         },
//       }}
//       slots={{
//         toolbar: GridToolbar,
//       }}
//     />
//   </div>
// </div>




// .table-container {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   margin-top: 100px;
//   padding: 20px;
//   border: 1px solid var(--control-bg-color);
//   border-radius: 10px;
//   background-color: var(--input-bg-color);
// }

// .data-grid-wrapper {
//   display: flex;
//   justify-content: center;
//   width: auto; /* Adjust width to auto to prevent full-width expansion */
// }



<div className="table-container">
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
          minWidth: `${columns.length * 100}px`,
          maxWidth: "100%",
          marginRight: "0",
          marginLeft: "auto",
        },
        "& .MuiDataGrid-viewport": {
          minWidth: `${columns.length * 100}px`,
        },
      }}
      slots={{
        toolbar: GridToolbar,
      }}
    />
  </div>
</div>

.table-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 100px;
  padding: 20px;
  border: 1px solid var(--control-bg-color);
  border-radius: 10px;
  background-color: var(--input-bg-color);
}

.data-grid-wrapper {
  display: flex;
  justify-content: flex-end;
  width: auto; /* Adjust width to auto to prevent full-width expansion */
}
