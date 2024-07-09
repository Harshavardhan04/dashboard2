import React, { useMemo } from "react";
import Select from "react-select";

const CurrencySelector = ({ options, selectedCurrencies, setSelectedCurrencies }) => {
  const memoizedOptions = useMemo(() => options, [options]);

  const handleChange = (selectedOptions) => {
    setSelectedCurrencies(selectedOptions);
  };

  return (
    <div className="currency-selector">
      <label htmlFor="currency-select">Select Currencies:</label>
      <Select
        id="currency-select"
        className="selector"
        isMulti
        options={memoizedOptions}
        value={selectedCurrencies}
        onChange={handleChange}
      />
    </div>
  );
};

export default React.memo(CurrencySelector);
.currency-selector {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.currency-selector label {
  margin-right: 10px; /* Adjust this value as needed for spacing */
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  color: var(--text-color);
}

.currency-selector .selector {
  flex-grow: 1;
}
