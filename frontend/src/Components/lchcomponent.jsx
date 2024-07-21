import React, { useState, useEffect, useRef } from 'react';
import CurrencySelector from '../../Components/xva/CurrencySelector';
import DateSelectors from '../../Components/generic/DateSelectors';
import Table from '../../Components/generic/GenericTable';
import GraphComponent from '../../Components/xva/GraphComponent';
import { formatNumber } from '../../Utils/Utils';
import '../../Styles/Graph.css';

const LCHNotional = () => {
  const [compareWithTarget, setCompareWithTarget] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    { value: 'AUD', label: 'AUD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
    { value: 'JPY', label: 'JPY' },
    { value: 'USD', label: 'USD' },
  ]);
  const [startDate, setStartDate] = useState(new Date('2018-06-01'));
  const [endDate, setEndDate] = useState(new Date('2024-06-25'));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [summary, setSummary] = useState('');

  const latestSummaryRef = useRef('');
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/xva_data_lch_notional');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFilteredData = () => {
    return data.filter((d) => {
      const date = new Date(d.Date).getTime();
      return date >= startDate.getTime() && date <= endDate.getTime();
    });
  };

  const filteredData = getFilteredData();

  const generateColumns = () => {
    const baseColumns = [
      { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 100 },
      { field: 'date', headerName: 'Date', flex: 1, minWidth: 120 },
      { field: 'target', headerName: 'Target', flex: 1.5, minWidth: 150 }
    ];

    const currencyColumns = selectedCurrencies.map((currency) => ({
      field: currency.value.toLowerCase(),
      headerName: currency.label,
      flex: 1.5,
      minWidth: 150,
    }));

    return [
      ...baseColumns,
      ...currencyColumns,
      { field: 'total', headerName: 'Total', flex: 1.5, minWidth: 150 },
    ];
  };

  const generateRows = () => {
    return filteredData.map((d, index) => {
      const rowData = {
        id: index + 1,
        date: d.Date,
        target: formatNumber(d.Target),
        total: formatNumber(d.Total),
      };
      selectedCurrencies.forEach((currency) => {
        rowData[currency.value.toLowerCase()] = formatNumber(d[currency.value]);
      });
      return rowData;
    });
  };

  const rows = generateRows();
  const columns = generateColumns();

  return (
    <>
      <div className="graph-container">
        <h2 className="graph-title">LCH Notional | Time Series</h2>
        <div className="selectors-container">
          <DateSelectors
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <div className="currency-selector">
            <CurrencySelector
              options={options}
              selectedCurrencies={selectedCurrencies}
              setSelectedCurrencies={setSelectedCurrencies}
            />
          </div>
        </div>
        <div className="main-panel">
          <GraphComponent
            startDate={startDate}
            endDate={endDate}
            selectedCurrencies={selectedCurrencies}
            isDarkMode={isDarkMode}
            data={filteredData}
            compareWithTarget={compareWithTarget}
            setCompareWithTarget={setCompareWithTarget}
            summary={summary}
            setSummary={setSummary}
          />
        </div>
      </div>

      <div className="table-container">
        <h2 className="table-title">LCH Notional | Summary Table</h2>
        <div className="data-grid-container">
          <div className="data-grid-wrapper">
            <Table rows={rows} columns={columns} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LCHNotional;
