//dropdown.jsx


import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Button,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DropdownItem } from './types';

interface DropdownProps {
  data: DropdownItem[];
}

const DropdownComponent: React.FC<DropdownProps> = ({ data }) => {
  const [paths, setPaths] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedVersion, setSelectedVersion] = useState<string>('');

  useEffect(() => {
    // Extract top level children (paths)
    const availablePaths = data.map((item) => item.label);
    setPaths(availablePaths);
  }, [data]);

  const handlePathChange = (event: SelectChangeEvent<string>) => {
    const path = event.target.value as string;
    setSelectedPath(path);
    setSelectedDate('');
    setSelectedVersion('');
    
    // Extract dates for the selected path
    const pathData = data.find((item) => item.label === path);
    if (pathData) {
      const availableDates = pathData.children?.map((item) => item.label) || [];
      setDates(availableDates);
    }
  };

  const handleDateChange = (event: SelectChangeEvent<string>) => {
    const date = event.target.value as string;
    setSelectedDate(date);
    setSelectedVersion('');

    // Extract versions for the selected date
    const pathData = data.find((item) => item.label === selectedPath);
    if (pathData && date) {
      const dateData = pathData.children?.find((item) => item.label === date);
      if (dateData) {
        const availableVersions = dateData.children?.map((item) => item.label) || [];
        setVersions(availableVersions);
      }
    }
  };

  const handleVersionChange = (event: SelectChangeEvent<string>) => {
    setSelectedVersion(event.target.value as string);
  };

  const handleSubmit = () => {
    const payload = {
      file_path: selectedPath,
      date: selectedDate,
      version: selectedVersion,
    };
    console.log(payload);
    // You can now send this payload to the backend using an API call
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="path-select-label">Select Path</InputLabel>
          <Select
            labelId="path-select-label"
            value={selectedPath}
            onChange={handlePathChange}
          >
            {paths.map((path) => (
              <MenuItem key={path} value={path}>
                {path}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="date-select-label">Select Date</InputLabel>
          <Select
            labelId="date-select-label"
            value={selectedDate}
            onChange={handleDateChange}
            disabled={!selectedPath}
          >
            {dates.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="version-select-label">Select Version</InputLabel>
          <Select
            labelId="version-select-label"
            value={selectedVersion}
            onChange={handleVersionChange}
            disabled={!selectedDate}
          >
            {versions.map((version) => (
              <MenuItem key={version} value={version}>
                {version}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default DropdownComponent;


//types.ts

export interface DropdownItem {
  label: string;
children?: DropdownItem[];
}


//app.tsx

import React from 'react';
import DropdownComponent from './Components/Dropdown/Dropdown';
import { DropdownItem } from './Components/Dropdown/types';

const menuItems: DropdownItem[] = [
  {
    label: 'jack',
    children: [
      {
        label: '20240719',
        children: [
          { label: '1' },
          { label: '2' },
        ],
      },
      {
        label: '20240721',
        children: [
          { label: '1' },
          { label: '2' },
        ],
      },
    ],
  },
  {
    label: 'sophie',
    children: [
      {
        label: '20240723',
        children: [
          { label: '1' },
          { label: '2' },
        ],
      },
      {
        label: '20240725',
        children: [
          { label: '1' },
          { label: '2' },
        ],
      },
    ],
  },
  {
    label: 'test_save_dataframe',
    children: [
      {
        label: '20240719',
        children: [
          { label: '1' },
          { label: '2' },
        ],
      },
      {
        label: '20240721',
        children: [
          { label: '1' },
          { label: '2' },
        ],
      },
      {
        label: '20240723',
        children: [
          { label: '1' },
          { label: '2' },
        ],
      },
      {
        label: '20240725',
        children: [
          { label: '1' },
          { label: '2' },
          { label: '3' },
          { label: '4' },
          { label: '5' },
          { label: '6' },
          { label: '7' },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  return (
    <div>
      <h1>Dynamic Dropdown Menu</h1>
      <DropdownComponent data={menuItems} />
    </div>
  );
};

export default App;


    
    
