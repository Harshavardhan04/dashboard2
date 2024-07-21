// GraphComponent.jsx
import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsBoost from 'highcharts/modules/boost';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAnnotations from 'highcharts/modules/annotations';
import HighchartsMore from 'highcharts/highcharts-more';
import { formatNumber } from '../../Utils/Utils';

HighchartsBoost(Highcharts);
HighchartsExporting(Highcharts);
HighchartsAnnotations(Highcharts);
HighchartsMore(Highcharts);

const GraphComponent = ({
  startDate,
  endDate,
  selectedCurrencies,
  isDarkMode,
  data,
  compareWithTarget,
  setCompareWithTarget,
  summary,
  setSummary
}) => {
  const chartRef = useRef(null);

  const getFilteredData = () => {
    return data.filter((d) => {
      const date = new Date(d.Date).getTime();
      return date >= startDate.getTime() && date <= endDate.getTime();
    });
  };

  const getData = () => {
    const filteredData = getFilteredData();
    const compareData = selectedCurrencies.map((currency) => ({
      name: currency.value,
      data: filteredData.map((d) => [
        new Date(d.Date).getTime(),
        d[currency.value]
      ]),
      color: getCurrencyColor(currency.value),
      marker: { enabled: false },
      boostThreshold: 1,
    }));

    const totalLine = {
      name: "Total",
      data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Total]),
      color: isDarkMode ? "#ffffff" : "#000000",
      marker: { enabled: false },
      zIndex: 1,
      boostThreshold: 1,
    };

    const target = {
      name: "Target",
      data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Target]),
      color: "#007bff",
      marker: { enabled: false },
      zIndex: 1,
      boostThreshold: 1,
    };

    const shadeData = {
      name: "Shaded Area",
      data: filteredData.map((d) => ({
        x: new Date(d.Date).getTime(),
        low: Math.min(d.Total, d.Target),
        high: Math.max(d.Total, d.Target),
      })),
      type: "arearange",
      lineWidth: 0,
      color: "#228B22",
      fillOpacity: 0.3,
      zIndex: 0,
      marker: { enabled: false },
      boostThreshold: 1,
    };

    return compareWithTarget ? [...compareData, totalLine, target, shadeData] : [...compareData, totalLine, target];
  };

  const getCurrencyColor = (currency) => {
    const colors = {
      AUD: "#ff6600",
      EUR: "#28a745",
      GBP: "#dc3545",
      JPY: "#343a40",
      USD: "#ffc107",
      BRL: "#f16767",
      CAD: "#00a5cf",
      CHF: "#69c267",
      CLP: "#9a67c2",
      CNY: "#d3a1c5",
      CZK: "#305d7b",
      DKK: "#9e68a2",
      HKD: "#778899",
      HUF: "#7ccc67",
      INR: "#2e4053",
      KRW: "#5f9ea0",
      MXN: "#4b0082",
      NOK: "#ec704a",
      NZD: "#9b59b6",
      PLN: "#ff6f61",
      SEK: "#00a99d",
      SGD: "#ff6f91",
      THB: "#1abc9c",
      TWD: "#6495ed",
      ZAR: "#dd5182",
    };

    return colors[currency] || "#000000";
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.update({
        series: getData(),
      });
    }
  }, [startDate, endDate, selectedCurrencies, data, isDarkMode, compareWithTarget]);

  const chartOptions = {
    chart: {
      type: 'line',
      zoomType: 'x',
      backgroundColor: isDarkMode ? '#2e2e2e' : '#fafafa',
      plotBorderWidth: 1,
      plotBorderColor: isDarkMode ? '#444444' : '#cccccc',
    },
    title: {
      text: 'LCH Notional | Time Series',
      style: {
        color: isDarkMode ? '#ffffff' : '#000000',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
        style: {
          color: isDarkMode ? '#cccccc' : '#000000',
          fontWeight: 'bold',
        },
      },
      labels: {
        style: {
          color: isDarkMode ? '#cccccc' : '#000000',
        },
      },
      lineColor: isDarkMode ? '#444444' : '#cccccc',
      tickColor: isDarkMode ? '#444444' : '#cccccc',
    },
    yAxis: {
      title: {
        text: 'Notional (USD)',
        style: {
          color: isDarkMode ? '#cccccc' : '#000000',
          fontWeight: 'bold',
        },
      },
      labels: {
        style: {
          color: isDarkMode ? '#cccccc' : '#000000',
        },
      },
      gridLineColor: isDarkMode ? '#444444' : '#cccccc',
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: {
        color: isDarkMode ? '#ffffff' : '#000000',
        fontWeight: 'bold',
      },
    },
    tooltip: {
      shared: true,
      backgroundColor: isDarkMode ? '#333333' : '#ffffff',
      borderColor: isDarkMode ? '#444444' : '#cccccc',
      style: {
        color: isDarkMode ? '#ffffff' : '#000000',
      },
      formatter: function () {
        let s = `<strong>Date:</strong> ${Highcharts.dateFormat('%A, %b %e, %Y', this.x)}<br>`;
        const totalPoint = this.points.find(p => p.series.name === 'Total');
        const targetPoint = this.points.find(p => p.series.name === 'Target');
        if (totalPoint && targetPoint) {
          s += `<strong>Total:</strong> ${Highcharts.numberFormat(totalPoint.y, 0)}<br>`;
          s += `<strong>Target:</strong> ${Highcharts.numberFormat(targetPoint.y, 0)}<br>`;
          s += `<strong>Difference:</strong> ${Highcharts.numberFormat(totalPoint.y - targetPoint.y, 0)}<br>`;
        }
        s += '<strong>Breakdown of Selected Currencies:</strong><br>';

        this.points.forEach(point => {
          if (point.series.name !== 'Total' && point.series.name !== 'Target') {
            s += `<strong>${point.series.name}:</strong> ${Highcharts.numberFormat(point.y, 0)}<br>`;
          }
        });

        return s;
      }
    },
    series: getData(),
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartRef}
      />
      <div className="bottom-right-buttons">
        <button onClick={() => setCompareWithTarget(!compareWithTarget)}>
          {compareWithTarget ? 'Disable Target Comparison' : 'Enable Target Comparison'}
        </button>
        <ChartDownload chartRef={chartRef} />
      </div>
    </>
  );
};

export default GraphComponent;

// LCHNotional.jsx
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
