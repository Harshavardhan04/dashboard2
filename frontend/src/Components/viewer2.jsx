import React, { useState, useEffect } from 'react';
import {
  Container, CssBaseline, TextField, FormControl, Grid, Typography, Box, Button
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';

const CsvViewer = () => {
  const [startDate, setStartDate] = useState(new Date('2024-01-01'));
  const [endDate, setEndDate] = useState(new Date('2024-12-31'));
  const [booksColumns, setBooksColumns] = useState([]);
  const [booksRows, setBooksRows] = useState([]);
  const [filteredBooksRows, setFilteredBooksRows] = useState([]);
  const [vfsColumns, setVfsColumns] = useState([]);
  const [vfsRows, setVfsRows] = useState([]);
  const [filteredVfsRows, setFilteredVfsRows] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_csv_data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.Books && result.VFs) {
        setBooksColumns(result.Books.columns);
        setBooksRows(result.Books.rows);
        setFilteredBooksRows(result.Books.rows);
        setVfsColumns(result.VFs.columns);
        setVfsRows(result.VFs.rows);
        setFilteredVfsRows(result.VFs.rows);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterRows = (rows, startDate, endDate) => {
    return rows.map(row => {
      const filteredRow = {};
      Object.keys(row).forEach(key => {
        const colDate = new Date(key);
        if (colDate >= startDate && colDate <= endDate) {
          filteredRow[key] = row[key];
        }
      });
      return filteredRow;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredBooksRows(filterRows(booksRows, startDate, endDate));
    setFilteredVfsRows(filterRows(vfsRows, startDate, endDate));
  }, [startDate, endDate, booksRows, vfsRows]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ backgroundColor: '#f9f9f9', padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          CSV Viewer
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Books Data</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid rows={filteredBooksRows} columns={booksColumns} pageSize={5} rowsPerPageOptions={[5]} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">VFs Data</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid rows={filteredVfsRows} columns={vfsColumns} pageSize={5} rowsPerPageOptions={[5]} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CsvViewer;
