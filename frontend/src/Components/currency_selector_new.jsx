import React, { useState } from 'react';
import { Autocomplete, TextField, Chip, Box, Popover, Typography } from '@mui/material';

const CurrencySelector = ({ options, selectedCurrencies, setSelectedCurrencies }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCurrencyChange = (event, newValue) => {
    setSelectedCurrencies(newValue);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setPopupOpen(true);
  };

  const handlePopoverClose = () => {
    setPopupOpen(false);
    setAnchorEl(null);
  };

  const filteredOptions = options.filter(
    (option) => !selectedCurrencies.some((selected) => selected.value === option.value)
  );

  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Autocomplete
        multiple
        options={filteredOptions}
        getOptionLabel={(option) => option.label}
        value={selectedCurrencies}
        onChange={handleCurrencyChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Currencies"
            placeholder="Currencies"
            sx={{ width: selectedCurrencies.length >= 5 ? 200 : 'auto', minWidth: 150 }}
            onClick={handlePopoverOpen}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.slice(0, 5).map((option, index) => (
            <Chip
              key={option.value}
              variant="outlined"
              label={option.label}
              {...getTagProps({ index })}
              onClick={handlePopoverOpen}
            />
          ))
        }
        disableCloseOnSelect
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          '& .MuiChip-root': {
            margin: 0.5,
          },
        }}
      />
      <Popover
        open={popupOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Selected Currencies</Typography>
          {selectedCurrencies.map((currency, index) => (
            <Chip
              key={currency.value}
              variant="outlined"
              label={currency.label}
              sx={{ m: 0.5 }}
              onDelete={() => {
                const newCurrencies = selectedCurrencies.filter((_, i) => i !== index);
                setSelectedCurrencies(newCurrencies);
                if (newCurrencies.length < 5) {
                  handlePopoverClose();
                }
              }}
            />
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default CurrencySelector;
