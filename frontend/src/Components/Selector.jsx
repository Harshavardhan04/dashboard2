// // // import React, { useState, useCallback } from 'react';
// // // import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// // // import 'bootstrap/dist/css/bootstrap.min.css';

// // // const Selector = ({ options, selectedCurrencies, setSelectedCurrencies }) => {
// // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // //   const [shiftSelected, setShiftSelected] = useState([]);
// // //   const toggle = () => setDropdownOpen(prevState => !prevState);

// // //   const handleCheckboxChange = useCallback((e, currency) => {
// // //     let updatedSelected = [...selectedCurrencies];
// // //     if (e.nativeEvent.shiftKey && shiftSelected.length > 0) {
// // //       const lastSelected = shiftSelected[shiftSelected.length - 1];
// // //       const start = options.findIndex(opt => opt.value === lastSelected);
// // //       const end = options.findIndex(opt => opt.value === currency);
// // //       const range = options.slice(Math.min(start, end), Math.max(start, end) + 1).map(opt => opt.value);
// // //       if (e.target.checked) {
// // //         updatedSelected = [...new Set([...updatedSelected, ...range])];
// // //       } else {
// // //         updatedSelected = updatedSelected.filter(sel => !range.includes(sel));
// // //       }
// // //       setShiftSelected(range);
// // //     } else {
// // //       if (e.target.checked) {
// // //         updatedSelected.push(currency);
// // //       } else {
// // //         updatedSelected = updatedSelected.filter(sel => sel !== currency);
// // //       }
// // //       setShiftSelected([currency]);
// // //     }
// // //     setSelectedCurrencies(updatedSelected);
// // //   }, [selectedCurrencies, shiftSelected, setSelectedCurrencies, options]);

// // //   return (
// // //     <Dropdown isOpen={dropdownOpen} toggle={toggle}>
// // //       <DropdownToggle caret>
// // //         Select Currencies
// // //       </DropdownToggle>
// // //       <DropdownMenu>
// // //         {options.map(option => (
// // //           <DropdownItem key={option.value} toggle={false}>
// // //             <input
// // //               type="checkbox"
// // //               checked={selectedCurrencies.includes(option.value)}
// // //               onChange={(e) => handleCheckboxChange(e, option.value)}
// // //             /> {option.label}
// // //           </DropdownItem>
// // //         ))}
// // //       </DropdownMenu>
// // //     </Dropdown>
// // //   );
// // // };

// // // export default Selector;

// // import React, { useState, useEffect, useCallback } from "react";
// // import "../Styles/Selector.css";

// // const CurrencySelector = ({ options, selectedCurrencies, setSelectedCurrencies }) => {
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const [previousSelected, setPreviousSelected] = useState(null);
// //   const [previousChecked, setPreviousChecked] = useState(false);
// //   const [currentSelected, setCurrentSelected] = useState(null);

// //   const handleSelectCurrency = useCallback(
// //     (event, currency) => {
// //       const isSelected = selectedCurrencies.some(c => c.value === currency.value);
// //       let newSelectedCurrencies;
// //       if (event.nativeEvent.shiftKey) {
// //         const current = options.findIndex(x => x.value === currency.value);
// //         const previous = options.findIndex(x => x.value === previousSelected?.value);
// //         const start = Math.min(current, previous);
// //         const end = Math.max(current, previous);
// //         if (start > -1 && end > -1) {
// //           const range = options.slice(start, end + 1);
// //           if (isSelected) {
// //             newSelectedCurrencies = selectedCurrencies.filter(
// //               c => !range.some(r => r.value === c.value)
// //             );
// //           } else {
// //             newSelectedCurrencies = [
// //               ...new Set([...selectedCurrencies, ...range])
// //             ];
// //           }
// //           setSelectedCurrencies(newSelectedCurrencies);
// //           setCurrentSelected(currency);
// //           return;
// //         }
// //       } else {
// //         if (isSelected) {
// //           newSelectedCurrencies = selectedCurrencies.filter(c => c.value !== currency.value);
// //         } else {
// //           newSelectedCurrencies = [...selectedCurrencies, currency];
// //         }
// //         setPreviousSelected(currency);
// //         setPreviousChecked(event.target.checked);
// //       }
// //       setSelectedCurrencies(newSelectedCurrencies);
// //     },
// //     [selectedCurrencies, setSelectedCurrencies, options, previousSelected, previousChecked, setPreviousChecked, currentSelected, setCurrentSelected]
// //   );

// //   const handleDropdownToggle = () => {
// //     setDropdownOpen(!dropdownOpen);
// //   };

// //   const truncateSelectedCurrencies = () => {
// //     const maxDisplay = 5;
// //     if (selectedCurrencies.length > maxDisplay) {
// //       const displayed = selectedCurrencies.slice(0, maxDisplay).map(c => c.label).join(", ");
// //       return `${displayed}, +${selectedCurrencies.length - maxDisplay} more`;
// //     }
// //     return selectedCurrencies.map(c => c.label).join(", ");
// //   };

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownOpen && !event.target.closest(".currency-selector-container")) {
// //         setDropdownOpen(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, [dropdownOpen]);

// //   return (
// //     <div className="currency-selector-container">
// //       <button className="dropdown-button" onClick={handleDropdownToggle}>
// //         {truncateSelectedCurrencies() || "Select Currencies"}
// //       </button>
// //       {dropdownOpen && (
// //         <div className="dropdown-content">
// //           <div className="currency-list">
// //             {options.map((currency) => (
// //               <div
// //                 key={currency.value}
// //                 className="currency-item"
// //                 onClick={(e) => handleSelectCurrency(e, currency)}
// //               >
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedCurrencies.some(c => c.value === currency.value)}
// //                   onChange={(e) => handleSelectCurrency(e, currency)}
// //                 />
// //                 {currency.label}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CurrencySelector;
// import React, { useState, useEffect } from "react";
// import "../Styles/Selector.css";

// const CurrencySelector = ({ options, selectedCurrencies, setSelectedCurrencies }) => {
//   const [selected, setSelected] = useState(selectedCurrencies.map(c => c.value));
//   const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

//   useEffect(() => {
//     setSelectedCurrencies(options.filter(option => selected.includes(option.value)));
//   }, [selected, options, setSelectedCurrencies]);

//   const handleSelect = (event, currency, index) => {
//     if (event.shiftKey && lastSelectedIndex !== null) {
//       const start = Math.min(lastSelectedIndex, index);
//       const end = Math.max(lastSelectedIndex, index);
//       const newSelected = [...selected];
//       for (let i = start; i <= end; i++) {
//         const value = options[i].value;
//         if (!newSelected.includes(value)) {
//           newSelected.push(value);
//         }
//       }
//       setSelected(newSelected);
//     } else {
//       setLastSelectedIndex(index);
//       if (selected.includes(currency.value)) {
//         setSelected(selected.filter(value => value !== currency.value));
//       } else {
//         setSelected([...selected, currency.value]);
//       }
//     }
//   };

//   return (
//     <div className="dropdown">
//       <button className="dropbtn">Selected Currencies</button>
//       <div className="dropdown-content">
//         {options.map((currency, index) => (
//           <div
//             key={currency.value}
//             className={`currency-item ${selected.includes(currency.value) ? "selected" : ""}`}
//             onClick={(e) => handleSelect(e, currency, index)}
//           >
//             <input
//               type="checkbox"
//               checked={selected.includes(currency.value)}
//               readOnly
//             />
//             {currency.label}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CurrencySelector;

import React, { useState, useEffect } from "react";
import "../Styles/Selector.css";

const CurrencySelector = ({ options, selectedCurrencies, setSelectedCurrencies }) => {
  const [selected, setSelected] = useState(selectedCurrencies.map(c => c.value));
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedCurrencies(options.filter(option => selected.includes(option.value)));
  }, [selected, options, setSelectedCurrencies]);

  const handleSelect = (event, currency, index) => {
    if (event.shiftKey && lastSelectedIndex !== null) {
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);
      const newSelected = [...selected];
      for (let i = start; i <= end; i++) {
        const value = options[i].value;
        if (!newSelected.includes(value)) {
          newSelected.push(value);
        }
      }
      setSelected(newSelected);
    } else {
      setLastSelectedIndex(index);
      if (selected.includes(currency.value)) {
        setSelected(selected.filter(value => value !== currency.value));
      } else {
        setSelected([...selected, currency.value]);
      }
    }
  };

  const displaySelectedCurrencies = () => {
    if (selected.length <= 6) {
      return selected.join(", ");
    } else {
      return `${selected.slice(0, 6).join(", ")}... (+${selected.length - 6} more)`;
    }
  };

  return (
    <div className="dropdown">
      <button className="dropbtn">
        {selected.length > 0 ? displaySelectedCurrencies() : "Select Currencies"}
      </button>
      <div className="dropdown-content">
        {options.map((currency, index) => (
          <div
            key={currency.value}
            className={`currency-item ${selected.includes(currency.value) ? "selected" : ""}`}
            onClick={(e) => handleSelect(e, currency, index)}
          >
            <input
              type="checkbox"
              checked={selected.includes(currency.value)}
              readOnly
            />
            {currency.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencySelector;

