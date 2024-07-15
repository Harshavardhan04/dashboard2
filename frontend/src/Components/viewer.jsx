import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container, CssBaseline, TextField, FormControl, Grid, Typography, Box, Button
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'linear-gradient(135deg, #1d1d1d, #333)',
    },
    primary: {
      main: '#ff0000',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
    },
    primary: {
      main: '#ff0000',
    },
  },
});

const CsvViewer = () => {
  const [theme, setTheme] = useState('dark');
  const [startDate, setStartDate] = useState(new Date('2024-01-01'));
  const [endDate, setEndDate] = useState(new Date('2024-12-31'));
  const [booksData, setBooksData] = useState([]);
  const [vfsData, setVfsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_csv_data', {
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
      setBooksData(result.Books || []);
      setVfsData(result.VFs || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'age', headerName: 'Age', width: 130 },
    { field: 'address', headerName: 'Address', width: 200 },
  ];

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ backgroundColor: theme === 'dark' ? '#282828' : '#f9f9f9', padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          CSV Viewer
          <Switch checked={theme === 'light'} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
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
              <DataGrid rows={booksData} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">VFs Data</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid rows={vfsData} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </Box>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={fetchData} sx={{ mt: 2 }}>
          Update Data
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default CsvViewer;


// app.py function:
// @app.route('/get_csv_data', methods=['POST'])
// def get_csv_data():
//     data = request.json
//     start_date = data.get('start_date')
//     end_date = data.get('end_date')
    
//     if not start_date or not end_date:
//         return jsonify({'error': 'Start date and end date are required'}), 400
    
//     try:
//         result = get_unmanaged_unsecured_remarking(start_date, end_date)
//         return jsonify(result)
//     except Exception as e:
//         return jsonify({'error': str(e)}), 500
