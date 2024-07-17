import React from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

const CurrencySelector = ({ options, selectedCurrencies, setSelectedCurrencies }) => {
  const handleCurrencyChange = (event, newValue) => {
    setSelectedCurrencies(newValue);
  };

  const getLabel = (value) => {
    if (value.length <= 5) {
      return value.map((option) => option.label).join(", ");
    } else {
      return `${value.slice(0, 5).map((option) => option.label).join(", ")}... (+${value.length - 5} more)`;
    }
  };

  const filteredOptions = options.filter(
    (option) => !selectedCurrencies.some((selected) => selected.value === option.value)
  );

  return (
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
        />
      )}
      renderTags={(value, getTagProps) => (
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.label}
            {...getTagProps({ index })}
          />
        ))
      )}
      disableCloseOnSelect
    />
  );
};

export default CurrencySelector;
