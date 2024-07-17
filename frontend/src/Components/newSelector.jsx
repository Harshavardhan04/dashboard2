import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CurrencySelector = ({ options, selectedCurrencies, setSelectedCurrencies }) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCurrencies(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const filteredOptions = options.filter(
    (option) => !selectedCurrencies.includes(option.value)
  );

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="currency-select-label">Select Currencies</InputLabel>
      <Select
        labelId="currency-select-label"
        id="currency-select"
        multiple
        value={selectedCurrencies}
        onChange={handleChange}
        input={<OutlinedInput label="Select Currencies" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={selectedCurrencies.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
