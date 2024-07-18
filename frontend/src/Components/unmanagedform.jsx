import React from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';

const OutputTypes = [
  "All",
  "PVUSDWithHeaders",
  "TextRiskTableWithHeaders",
  "RiskTableWithHeadersLite"
];

const StyledButton = styled(Button)({
  backgroundColor: "#AEAEAE",
  color: "black",
  padding: "10px",
  margin: "5px",
  width: "8vw",
  '&:hover': { backgroundColor: "#d3d3d3" },
});

const UnmanagedUnsecuredForm = ({ formData, onChange, onSubmit, onReset }) => {
  return (
    <Container maxWidth="md" className="form-container">
      <form onSubmit={onSubmit}>
        <TextField
          label="Run Date"
          type="date"
          name="runDate"
          value={formData.runDate}
          onChange={onChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Output Type</InputLabel>
          <Select
            name="outputType"
            value={formData.outputType}
            onChange={onChange}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {OutputTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Output Directory"
          placeholder="\\global.nomura.com\gm\EU\Business_Resolution"
          name="outputDirectory"
          value={formData.outputDirectory}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Enter Basis SOFR, Unmanaged Unsecured 3M Curve"
          name="curveData"
          value={formData.curveData}
          onChange={onChange}
          fullWidth
          margin="normal"
        />
        <Grid item xs={12}>
          <StyledButton sx={{ marginTop: '40px' }} type="submit">Submit</StyledButton>
          <StyledButton sx={{ marginTop: '40px' }} onClick={onReset}>Reset</StyledButton>
        </Grid>
      </form>
    </Container>
  );
};

export default UnmanagedUnsecuredForm;


//main component 

import React, { useState } from 'react';
import Topbar from '../components/generic/Topbar';
import Sidebar from '../components/generic/Sidebar';
import UnmanagedUnsecuredForm from '../components/UnmanagedUnsecuredForm';

const UnmanagedUnsecured = () => {
  const [formData, setFormData] = useState({
    runDate: '',
    outputType: '',
    outputDirectory: '',
    curveData: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/fva/data_remark_unsecured', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      alert('Form submitted successfully');
      // Handle successful submission logic here
    } else {
      alert('Failed to submit form');
      // Handle error logic here
    }
  };

  const handleReset = () => {
    setFormData({
      runDate: '',
      outputType: '',
      outputDirectory: '',
      curveData: ''
    });
  };

  return (
    <div>
      <Topbar />
      <Sidebar />
      <h1 className="page-heading">Unmanaged Unsecured Remarking</h1>
      <UnmanagedUnsecuredForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
    </div>
  );
};

export default UnmanagedUnsecured;
