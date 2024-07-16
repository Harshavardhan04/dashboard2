import React, { useState, useEffect } from 'react';
import {
  Container, CssBaseline, TextField, FormControl, Grid, Typography, Box, Tabs, Tab
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';

const CsvViewer = () => {
  const [startDate, setStartDate] = useState(new Date('2024-02-21'));
  const [endDate, setEndDate] = useState(new Date('2024-07-15'));
  const [booksColumns, setBooksColumns] = useState([]);
  const [booksRows, setBooksRows] = useState([]);
  const [filteredBooksRows, setFilteredBooksRows] = useState([]);
  const [filteredBooksColumns, setFilteredBooksColumns] = useState([]);
  const [vfsColumns, setVfsColumns] = useState([]);
  const [vfsRows, setVfsRows] = useState([]);
  const [filteredVfsRows, setFilteredVfsRows] = useState([]);
  const [filteredVfsColumns, setFilteredVfsColumns] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('/cva/carry_viewer/get_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
        }),
      });
      const result = await response.json();
      if (result.Books && result.VFs) {
        setBooksColumns([{ field: 'BookID', headerName: 'BookID', resizable: false }, ...result.Books.columns.map((col) => ({ ...col, resizable: false }))]);
        setBooksRows(result.Books.rows.map((row, index) => ({ id: index, ...row })));
        setVfsColumns([{ field: 'VF', headerName: 'VF', resizable: false }, ...result.VFs.columns.map((col) => ({ ...col, resizable: false }))]);
        setVfsRows(result.VFs.rows.map((row, index) => ({ id: index, ...row })));
        setInitialLoad(false); // Set initialLoad to false after the first load
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterRowsAndColumns = (rows, columns, startDate, endDate) => {
      if (columns.length === 0 || rows.length === 0) {
        return { filteredRows: [], filteredColumns: [] };
      }

      const firstColumn = columns[0];
      const filteredColumns = initialLoad 
        ? columns.filter((col) => {
            const colDate = new Date(col.field);
            return colDate >= startDate && colDate <= endDate;
          })
        : [firstColumn, ...columns.slice(1).filter((col) => {
            const colDate = new Date(col.field);
            return colDate >= startDate && colDate <= endDate;
          })];

      const filteredRows = rows.map((row, index) => {
        const filteredRow = { id: row.id || index }; // Ensure each row has a unique id
        filteredColumns.forEach((col) => {
          filteredRow[col.field] = row[col.field];
        });
        return filteredRow;
      });

      return { filteredRows, filteredColumns };
    };

    const { filteredRows: filteredBooksRows, filteredColumns: filteredBooksColumns } = filterRowsAndColumns(booksRows, booksColumns, startDate, endDate);
    const { filteredRows: filteredVfsRows, filteredColumns: filteredVfsColumns } = filterRowsAndColumns(vfsRows, vfsColumns, startDate, endDate);

    setFilteredBooksRows(filteredBooksRows);
    setFilteredBooksColumns(filteredBooksColumns);
    setFilteredVfsRows(filteredVfsRows);
    setFilteredVfsColumns(filteredVfsColumns);
  }, [startDate, endDate, booksRows, booksColumns, vfsRows, vfsColumns, initialLoad]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ backgroundColor: '#f9f9f9', padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Books" />
          <Tab label="VFs" />
        </Tabs>
        {tabValue === 0 && (
          <Grid item xs={12}>
            <Typography variant="h6">Books Data</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid rows={filteredBooksRows} columns={filteredBooksColumns} pageSize={5} rowsPerPageOptions={[5]} />
            </Box>
          </Grid>
        )}
        {tabValue === 1 && (
          <Grid item xs={12}>
            <Typography variant="h6">VFs Data</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid rows={filteredVfsRows} columns={filteredVfsColumns} pageSize={5} rowsPerPageOptions={[5]} />
            </Box>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default CsvViewer;
