
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

//   const displaySelectedCurrencies = () => {
//     if (selected.length <= 6) {
//       return selected.join(", ");
//     } else {
//       return `${selected.slice(0, 6).join(", ")}... (+${selected.length - 6} more)`;
//     }
//   };

//   return (
//     <div className="dropdown">
//       <button className="dropbtn">
//         {selected.length > 0 ? displaySelectedCurrencies() : "Select Currencies"}
//       </button>
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

// 
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


