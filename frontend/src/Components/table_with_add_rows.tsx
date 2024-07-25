
import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridRowModel, MuiEvent } from '@mui/x-data-grid';
import { Button, TextField, Snackbar } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const initialColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', width: 150, editable: true },
];

const initialRows: GridRowsProp = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Jack', age: 35 },
];

const DynamicTable: React.FC = () => {
  const [columns, setColumns] = useState<GridColDef[]>(initialColumns);
  const [rows, setRows] = useState(initialRows);
  const [newColumnName, setNewColumnName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const handleProcessRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel): GridRowModel => {
    const updatedRows = rows.map((row) => (row.id === oldRow.id ? newRow : row));
    setRows(updatedRows);
    return newRow;
  };

  const handleSave = () => {
    console.log('Saved Data:', rows);
    setSnackbarOpen(true);
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
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
