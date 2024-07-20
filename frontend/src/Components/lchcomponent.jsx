//graph

import React, { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GraphComponent = ({ isDarkMode, data, startDate, endDate, selectedCurrencies }) => {
  const chartRef = useRef(null);

  const getOptions = () => ({
    chart: {
      type: 'line',
      height: 600, // Ensure a fixed height
    },
    title: {
      text: 'LCH Notional | Time Series',
      style: {
        color: isDarkMode ? '#ffffff' : '#000000',
        fontSize: '22px',
        fontWeight: 'bold'
      }
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
        style: {
          color: isDarkMode ? '#cccccc' : '#000000',
          fontSize: '14px',
          fontWeight: 'bold'
        }
      },
      labels: {
        style: {
          color: isDarkMode ? '#cccccc' : '#000000',
          fontSize: '12px'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Notional (USD)',
        style: {
          color: isDarkMode ? '#cccccc' : '#000000',
          fontSize: '14px',
          fontWeight: 'bold'
        }
      },
      labels: {
        style: {
          color: isDarkMode ? '#cccccc' : '#000000',
          fontSize: '12px'
        }
      },
      gridLineColor: isDarkMode ? '#444444' : '#cccccc',
      tickColor: isDarkMode ? '#444444' : '#cccccc',
      lineColor: isDarkMode ? '#444444' : '#cccccc'
    },
    series: [
      // Your series data
    ],
    tooltip: {
      shared: true,
      backgroundColor: isDarkMode ? 'rgba(33, 33, 33, 0.85)' : 'rgba(255, 255, 255, 0.85)',
      borderColor: isDarkMode ? '#666666' : '#cccccc',
      style: {
        color: isDarkMode ? '#ffffff' : '#000000'
      }
    },
    legend: {
      itemStyle: {
        color: isDarkMode ? '#ffffff' : '#000000',
        fontSize: '14px',
        fontWeight: 'bold'
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      buttons: {
        contextButton: {
          symbolStroke: isDarkMode ? '#cccccc' : '#666666',
          theme: {
            fill: isDarkMode ? '#444444' : '#f0f0f0',
            stroke: isDarkMode ? '#666666' : '#cccccc',
            style: {
              color: isDarkMode ? '#ffffff' : '#000000'
            }
          }
        }
      }
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        },
        events: {
          load: function () {
            this.xAxis[0].setExtremes(startDate.getTime(), endDate.getTime());
          }
        }
      }
    },
    boost: {
      useGPUTranslations: true,
      usePreAllocated: true
    }
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current.chart;
      chart.setSize(null, 600); // Ensure a fixed height on updates
      chart.series[0].setData(data); // Update the chart data
    }
  }, [data]);

  return <HighchartsReact highcharts={Highcharts} options={getOptions()} ref={chartRef} />;
};

export default GraphComponent;



//lch

import React, { useState, useEffect, useRef } from 'react';
import CurrencySelector from '../../Components/xva/CurrencySelector';
import DateSelectors from '../../Components/generic/DateSelectors';
import Table from '../../Components/generic/GenericTable';
import GraphComponent from '../../Components/xva/GraphComponent';
import { formatNumber } from '../../Utils/Utils';
import { Button } from '@mui/material';
import ChartDownload from '../../Components/xva/ChartDownload';
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
  const [summary, setSummary] = useState('');
  const [startDate, setStartDate] = useState(new Date('2018-06-01'));
  const [endDate, setEndDate] = useState(new Date('2024-06-25'));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (loading && data.length > 0) {
      const updateSummary = () => {
        if (summary !== latestSummaryRef.current) {
          setSummary(latestSummaryRef.current);
        }
      };
      const interval = setInterval(updateSummary, 1000);
      return () => clearInterval(interval);
    }
  }, [loading, data, summary]);

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
