// // import React from "react";
// // import { Autocomplete, TextField, Chip } from "@mui/material";

// // const CurrencySelector = ({ options, selectedCurrencies, setSelectedCurrencies }) => {
// //   const handleCurrencyChange = (event, newValue) => {
// //     setSelectedCurrencies(newValue);
// //   };

// //   const getLabel = (value) => {
// //     if (value.length <= 5) {
// //       return value.map((option) => option.label).join(", ");
// //     } else {
// //       return `${value.slice(0, 5).map((option) => option.label).join(", ")}... (+${value.length - 5} more)`;
// //     }
// //   };

// //   const filteredOptions = options.filter(
// //     (option) => !selectedCurrencies.some((selected) => selected.value === option.value)
// //   );

// //   return (
// //     <Autocomplete
// //       multiple
// //       options={filteredOptions}
// //       getOptionLabel={(option) => option.label}
// //       value={selectedCurrencies}
// //       onChange={handleCurrencyChange}
// //       renderInput={(params) => (
// //         <TextField
// //           {...params}
// //           variant="outlined"
// //           label="Select Currencies"
// //           placeholder="Currencies"
// //         />
// //       )}
// //       renderTags={(value, getTagProps) => (
// //         value.map((option, index) => (
// //           <Chip
// //             key={option.value}
// //             variant="outlined"
// //             label={option.label}
// //             {...getTagProps({ index })}
// //           />
// //         ))
// //       )}
// //       disableCloseOnSelect
// //     />
// //   );
// // };

// // export default CurrencySelector;

// import React from "react";
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Checkbox,
//   ListItemText,
//   OutlinedInput
// } from "@mui/material";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const CurrencySelector = ({ options, selectedCurrencies, setSelectedCurrencies }) => {
//   const handleCurrencyChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setSelectedCurrencies(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );
//   };

//   const filteredOptions = options.filter(
//     (option) => !selectedCurrencies.some((selected) => selected.value === option.value)
//   );

//   return (
//     <FormControl sx={{ m: 1, width: 300 }}>
//       <InputLabel id="select-currencies-label">Select Currencies</InputLabel>
//       <Select
//         labelId="select-currencies-label"
//         id="select-currencies"
//         multiple
//         value={selectedCurrencies}
//         onChange={handleCurrencyChange}
//         input={<OutlinedInput label="Select Currencies" />}
//         renderValue={(selected) => selected.map((s) => s.label).join(', ')}
//         MenuProps={MenuProps}
//       >
//         {filteredOptions.map((option) => (
//           <MenuItem key={option.value} value={option}>
//             <Checkbox checked={selectedCurrencies.indexOf(option) > -1} />
//             <ListItemText primary={option.label} />
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// export default CurrencySelector;
import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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

const CurrencySelector = ({ currencies, selectedCurrencies, setSelectedCurrencies }) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // Check if a currency was deselected and remove it from the selectedCurrencies
    if (selectedCurrencies.some((currency) => currency.value === value[value.length - 1])) {
      setSelectedCurrencies(selectedCurrencies.filter((currency) => currency.value !== value[value.length - 1]));
    } else {
      setSelectedCurrencies(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value.map(val => currencies.find(currency => currency.value === val)),
      );
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="currency-selector-label">Currencies</InputLabel>
        <Select
          labelId="currency-selector-label"
          id="currency-selector"
          multiple
          value={selectedCurrencies.map(currency => currency.value)}
          onChange={handleChange}
          input={<OutlinedInput label="Currencies" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {currencies.map((currency) => (
            <MenuItem key={currency.value} value={currency.value}>
              <Checkbox checked={selectedCurrencies.some((selected) => selected.value === currency.value)} />
              <ListItemText primary={currency.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CurrencySelector;
