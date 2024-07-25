
import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridRowModel, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import { Button, TextField, Snackbar, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const initialColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150, editable: false },
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', width: 150, editable: true },
  { field: 'height', headerName: 'height', width: 150, editable: true },
];

const initialRows: GridRowsProp = [
  { id: 1, name: 'John', age: 30, height: 5 },
  { id: 2, name: 'Jane', age: 25, height: 6 },
  { id: 3, name: 'Jack', age: 35, height: 7 },
];

const DynamicTable: React.FC = () => {
  const [columns, setColumns] = useState<GridColDef[]>(initialColumns);
  const [rows, setRows] = useState(initialRows);
  const [newColumnName, setNewColumnName] = useState('');
  const [newRowData, setNewRowData] = useState<{ [key: string]: string }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    // Initialize newRowData with empty values based on columns
    const initialNewRowData: { [key: string]: string } = {};
    columns.forEach((col) => {
      if (col.field !== 'id') {
        initialNewRowData[col.field] = '';
      }
    });
    setNewRowData(initialNewRowData);
  }, [columns]);

  const handleAddColumn = () => {
    if (newColumnName.trim() === '') return;

    const newColumn: GridColDef = {
      field: newColumnName.toLowerCase(),
      headerName: newColumnName,
      width: 150,
      editable: true,
    };

    setColumns((prevColumns) => [...prevColumns, newColumn]);
    setNewColumnName('');
  };

  const handleDeleteColumn = (field: string) => {
    setColumns((prevColumns) => prevColumns.filter((col) => col.field !== field));
  };

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, ...newRowData, age: parseInt(newRowData.age) };
    setRows((prevRows) => [...prevRows, newRow]);
    const updatedNewRowData = { ...newRowData };
    Object.keys(updatedNewRowData).forEach((key) => (updatedNewRowData[key] = ''));
    setNewRowData(updatedNewRowData);
  };

  const handleDeleteRow = (id: GridRowId) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleProcessRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel): GridRowModel => {
    const updatedRows = rows.map((row) => (row.id === oldRow.id ? newRow : row));
    setRows(updatedRows);
    return newRow;
  };

  const handleSave = () => {
    console.log('Saved Data:', rows);
    setSnackbarOpen(true);
  };

  const handleNewRowDataChange = (field: string, value: string) => {
    setNewRowData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <TextField
          label="New Column Name"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          variant="outlined"
          size="small"
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddColumn}>
          Add Column
        </Button>
      </div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        {columns.map(
          (col) =>
            col.field !== 'id' && (
              <TextField
                key={col.field}
                label={col.headerName}
                value={newRowData[col.field]}
                onChange={(e) => handleNewRowDataChange(col.field, e.target.value)}
                variant="outlined"
                size="small"
                style={{ marginRight: '10px' }}
              />
            ),
        )}
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          Add Row
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
      <DataGrid
        rows={rows}
        columns={[
          ...columns,
          {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => {
              const { id } = params.row;
              return (
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={() => handleDeleteRow(id)}
                  color="inherit"
                />
              );
            },
          },
        ]}
        pagination
        processRowUpdate={handleProcessRowUpdate}

      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Data saved successfully"
      />
    </div>
  );
};

export default DynamicTable;

// import React, { useState } from 'react';
// import { DataGrid, GridColDef, GridRowsProp, GridRowModel, MuiEvent } from '@mui/x-data-grid';
// import { Button, TextField, Snackbar } from '@mui/material';
// import { v4 as uuidv4 } from 'uuid';

// const initialColumns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 150 },
//   { field: 'name', headerName: 'Name', width: 150, editable: true },
//   { field: 'age', headerName: 'Age', width: 150, editable: true },
// ];

// const initialRows: GridRowsProp = [
//   { id: 1, name: 'John', age: 30 },
//   { id: 2, name: 'Jane', age: 25 },
//   { id: 3, name: 'Jack', age: 35 },
// ];

// const DynamicTable: React.FC = () => {
//   const [columns, setColumns] = useState<GridColDef[]>(initialColumns);
//   const [rows, setRows] = useState(initialRows);
//   const [newColumnName, setNewColumnName] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const handleAddColumn = () => {
//     if (newColumnName.trim() === '') return;

//     const newColumn: GridColDef = {
//       field: newColumnName.toLowerCase(),
//       headerName: newColumnName,
//       width: 150,
//       editable: true,
//     };

//     setColumns((prevColumns) => [...prevColumns, newColumn]);
//     setNewColumnName('');
//   };

//   const handleProcessRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel): GridRowModel => {
//     const updatedRows = rows.map((row) => (row.id === oldRow.id ? newRow : row));
//     setRows(updatedRows);
//     return newRow;
//   };

//   const handleSave = () => {
//     console.log('Saved Data:', rows);
//     setSnackbarOpen(true);
//   };

//   return (
//     <div style={{ height: 500, width: '100%' }}>
//       <div style={{ display: 'flex', marginBottom: '10px' }}>
//         <TextField
//           label="New Column Name"
//           value={newColumnName}
//           onChange={(e) => setNewColumnName(e.target.value)}
//           variant="outlined"
//           size="small"
//           style={{ marginRight: '10px' }}
//         />
//         <Button variant="contained" color="primary" onClick={handleAddColumn}>
//           Add Column
//         </Button>
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//         <Button variant="contained" color="primary" onClick={handleSave}>
//           Save
//         </Button>
//       </div>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pagination
      
//         processRowUpdate={handleProcessRowUpdate}
        
//       />
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         message="Data saved successfully"
//       />
//     </div>
//   );
// };

// export default DynamicTable;
