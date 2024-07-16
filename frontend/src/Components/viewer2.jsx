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
    return rows.filter(row => {
      const rowDate = new Date(row['Entry Date']);
      return rowDate >= startDate && rowDate <= endDate;
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





//backend

// from flask import Flask, request, jsonify
// import pandas as pd
// import json
// from datetime import datetime
// from glob import glob
// import configs_utils
// import fpx
// import dates

// app = Flask(__name__)

// # Existing get_data function
// def get_data(start_date="", end_date=""):
//     """
//     Used via Excel Python Interop for the CVA Carry Viewer Spreadsheet.
//     Output is cached to accelerate spreadsheet update for the user.

//     Args:
//         start_date (str): Start date for displaying CVA Carry Risk.
//         end_date (str): End date for displaying CVA Carry Risk.

//     Returns: Dictionary of spreadsheet name and file locations.
//     """
//     dict_files = {}
//     temp_dir = fpx.TemporaryDirectory()
//     with_date = dates.today().strftime('%Y%m%d')
//     list_files = glob(f"{configs_utils.get_settings()['CARRY_EXPLAINER']}/CARRY_EXPLAINER_*.txt")

//     for file_sheet in list_files:
//         original_file = pd.read_csv(file_sheet, index_col=0)
//         file_name = fpx.FileNameInfo(file_sheet, "FileName")
//         file_name = file_name.split("_")[-1]
//         cols = original_file.columns.tolist()

//         start_date = dates.to_date(start_date).strftime('%Y-%m-%d')
//         idx_start = cols.index(start_date)
//         start_date = dates.to_date(start_date).strftime('%Y-%m-%d')

//         end_date = dates.to_date(end_date).strftime('%Y-%m-%d')
//         idx_end = cols.index(end_date) + 1
//         end_date = dates.to_date(end_date).strftime('%Y-%m-%d')

//         new_file = original_file.iloc[:, idx_start:idx_end]
//         new_file_path = f"{temp_dir}/{file_name}_{with_date}_{start_date}_{end_date}.txt"
//         dict_files[file_name] = new_file_path
//         new_file.to_csv(new_file_path, float_format="%.0f")

//     return dict_files

// # New process_csv_files function
def process_csv_files(start_date, end_date):
    dict_files = get_data(start_date, end_date)

    books_df = pd.read_csv(dict_files['Books'])
    vfs_df = pd.read_csv(dict_files['VFs'])

    # Add a unique id to each row
    books_df['id'] = books_df.index
    vfs_df['id'] = vfs_df.index

    books_data = books_df.to_dict(orient='records')
    vfs_data = vfs_df.to_dict(orient='records')

    books_columns = [{"field": col, "headerName": col, "width": 150} for col in books_df.columns]
    vfs_columns = [{"field": col, "headerName": col, "width": 150} for col in vfs_df.columns]

    return {
        'Books': {
            'columns': books_columns,
            'rows': books_data
        },
        'VFs': {
            'columns': vfs_columns,
            'rows': vfs_data
        }
    }


// @app.route('/get_csv_data', methods=['POST'])
// def get_csv_data():
//     data = request.json
//     start_date = data.get('start_date')
//     end_date = data.get('end_date')

//     if not start_date or not end_date:
//         return jsonify({'error': 'Start date and end date are required'}), 400

//     try:
//         result = process_csv_files(start_date, end_date)
//         return jsonify(result)
//     except Exception as e:
//         return jsonify({'error': str(e)}), 500

// if __name__ == '__main__':
//     app.run(debug=True)
