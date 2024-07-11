import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsBoost from "highcharts/modules/boost";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAnnotations from "highcharts/modules/annotations";
import HighchartsMore from "highcharts/highcharts-more";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Topbar from "./Topbar";
import "../Styles/Graph.css";
import { DataTable } from "./DataTable";

HighchartsBoost(Highcharts);
HighchartsExporting(Highcharts);
HighchartsAnnotations(Highcharts);
HighchartsMore(Highcharts);

const Graph = () => {
  const [compareWithTarget, setCompareWithTarget] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    { value: "AUD", label: "AUD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "JPY", label: "JPY" },
    { value: "USD", label: "USD" },
  ]);
  const [summary, setSummary] = useState("");
  const [startDate, setStartDate] = useState(new Date("2022-06-01"));
  const [endDate, setEndDate] = useState(new Date("2024-06-25"));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const latestSummaryRef = useRef("");
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/xva");
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  useEffect(() => {
    if (!loading && data.length > 0) {
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

  const totalLine = {
    name: "Total",
    data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Total]),
    color: isDarkMode ? "#007bff" : "#343a40",
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
    linkedTo: "Total",
    color: "#2E8C39",
    fillOpacity: 0.3,
    zIndex: 0,
    marker: { enabled: false },
    boostThreshold: 0,
    boost: false,
  };

  const getData = () => {
    const compareData = [
      ...selectedCurrencies.map((currency) => ({
        name: currency.value,
        data: filteredData.map((d) => [
          new Date(d.Date).getTime(),
          d[currency.value],
        ]),
        color: getCurrencyColor(currency.value),
        marker: { enabled: false },
        boostThreshold: 1,
      })),
      totalLine,
      {
        name: "Target",
        data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Target]),
        color: "#007bff",
        marker: { enabled: false },
        zIndex: 1,
        boostThreshold: 1,
      },
      shadeData,
    ];
    return compareWithTarget ? compareData : compareData.slice(0, -1);
  };

  const getCurrencyColor = (currency) => {
    switch (currency) {
      case "AUD":
        return "#FFD700";
      case "EUR":
        return "#FF6347";
      case "GBP":
        return "#4682B4";
      case "JPY":
        return "#32CD32";
      case "USD":
        return "#FFA07A";
      case "BRL":
        return "#9400D3";
      case "CAD":
        return "#00FF00";
      case "CHF":
        return "#FF00FF";
      case "CLP":
        return "#00FFFF";
      case "CNY":
        return "#FF4500";
      case "CZK":
        return "#FF1493";
      case "DKK":
        return "#1E90FF";
      case "HKD":
        return "#FF69B4";
      case "HUF":
        return "#8A2BE2";
      case "INR":
        return "#00BFFF";
      case "KRW":
        return "#7B68EE";
      case "NOK":
        return "#FFD700";
      case "NZD":
        return "#FF6347";
      case "PLN":
        return "#4682B4";
      case "SEK":
        return "#32CD32";
      case "SGD":
        return "#FFA07A";
      case "THB":
        return "#9400D3";
      case "TWD":
        return "#00FF00";
      case "ZAR":
        return "#FF00FF";
      default:
        return "#FF4500";
    }
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Topbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="graph-container">
        <h2 className="graph-title">LCH Notional | Time Series</h2>
        <div className="selectors-container">
          <div className="currency-selector">
            <label>Select Currencies:</label>
            <Autocomplete
              multiple
              options={[
                { value: "AUD", label: "AUD" },
                { value: "EUR", label: "EUR" },
                { value: "GBP", label: "GBP" },
                { value: "JPY", label: "JPY" },
                { value: "USD", label: "USD" },
                { value: "BRL", label: "BRL" },
                { value: "CAD", label: "CAD" },
                { value: "CHF", label: "CHF" },
                { value: "CLP", label: "CLP" },
                { value: "CNY", label: "CNY" },
                { value: "CZK", label: "CZK" },
                { value: "DKK", label: "DKK" },
                { value: "HKD", label: "HKD" },
                { value: "HUF", label: "HUF" },
                { value: "INR", label: "INR" },
                { value: "KRW", label: "KRW" },
                { value: "MXN", label: "MXN" },
                { value: "NOK", label: "NOK" },
                { value: "NZD", label: "NZD" },
                { value: "PLN", label: "PLN" },
                { value: "SEK", label: "SEK" },
                { value: "SGD", label: "SGD" },
                { value: "THB", label: "THB" },
                { value: "TWD", label: "TWD" },
                { value: "ZAR", label: "ZAR" },
              ]}
              value={selectedCurrencies}
              onChange={(event, newValue) => {
                setSelectedCurrencies(newValue);
              }}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Currencies"
                  placeholder="Currencies"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option.label}
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </div>
          <div className="date-picker">
            <label>Select Date Range:</label>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" sx={{ minWidth: 150 }} />
              )}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" sx={{ minWidth: 150 }} />
              )}
            />
          </div>
        </div>
        <div className="main-panel">
          <HighchartsReact
            className="chart-actual"
            highcharts={Highcharts}
            options={{
              chart: {
                type: "line",
                zoomType: "x",
                backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                  stops: isDarkMode
                    ? [
                        [0, "#2e2e2e"],
                        [1, "#1a1a1a"],
                      ]
                    : [
                        [0, "#ffffff"],
                        [1, "#f0f0f0"],
                      ],
                },
                borderRadius: 10, // Rounded corners
                style: {
                  fontFamily: "Helvetica, Arial, sans-serif", // Font style for the chart
                },
                plotBorderColor: isDarkMode ? "#444444" : "#cccccc",
                plotBorderWidth: 1,
                events: {
                  load: function () {
                    this.xAxis[0].setExtremes(startDate.getTime(), endDate.getTime());
                  },
                },
                boost: {
                  useGPUTranslations: true,
                  usePreAllocated: true,
                },
              },
              title: {
                text: "",
                style: {
                  color: isDarkMode ? "#ffffff" : "#000000",
                  fontSize: "22px",
                  fontWeight: "bold",
                },
              },
              xAxis: {
                type: "datetime",
                title: {
                  text: "Date",
                  style: {
                    color: isDarkMode ? "#cccccc" : "#000000",
                    fontSize: "14px",
                    fontWeight: "bold",
                  },
                },
                lineColor: isDarkMode ? "#444444" : "#cccccc",
                tickColor: isDarkMode ? "#444444" : "#cccccc",
                labels: {
                  style: {
                    color: isDarkMode ? "#cccccc" : "#000000",
                    fontSize: "12px",
                  },
                },
              },
              yAxis: {
                title: {
                  text: "Notional (USD)",
                  style: {
                    color: isDarkMode ? "#cccccc" : "#000000",
                    fontSize: "14px",
                    fontWeight: "bold",
                  },
                },
                gridLineColor: isDarkMode ? "#444444" : "#cccccc",
                labels: {
                  style: {
                    color: isDarkMode ? "#cccccc" : "#000000",
                    fontSize: "12px",
                  },
                },
              },
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
                itemStyle: {
                  color: isDarkMode ? "#ffffff" : "#000000",
                  fontSize: "14px",
                  fontWeight: "bold",
                },
                itemHoverStyle: {
                  color: isDarkMode ? "#cccccc" : "#000000",
                },
                itemHiddenStyle: {
                  color: isDarkMode ? "#666666" : "#999999",
                },
              },
              tooltip: {
                shared: true,
                backgroundColor: isDarkMode ? "rgba(33, 33, 33, 0.85)" : "rgba(255, 255, 255, 0.85)",
                borderColor: isDarkMode ? "#666666" : "#cccccc",
                style: {
                  color: isDarkMode ? "#ffffff" : "#000000",
                },
                formatter: function () {
                  const points = this.points;
                  let targetValue = null;
                  let totalValue = null;

                  points.forEach((point) => {
                    if (point.series.name === "Target") {
                      targetValue = point.y;
                    }
                    if (point.series.name === "Total") {
                      totalValue = point.y;
                    }
                  });

                  if (targetValue !== null && totalValue !== null) {
                    const difference = formatNumber(totalValue - targetValue);
                    const totalBreakdown = selectedCurrencies
                      .map((currency) => {
                        const point = points.find((p) => p.series.name === currency.value);
                        return point
                          ? `${currency.value}: ${formatNumber(point.y)}`
                          : `${currency.value}: N/A`;
                      })
                      .join("<br>");

                    let summaryHTML = `<strong>Total: ${formatNumber(totalValue)}</strong><br>`;
                    summaryHTML += `<strong>Target: ${formatNumber(targetValue)}</strong><br>`;
                    summaryHTML += `Difference: ${difference}<br><br>`;
                    summaryHTML += `<strong>Breakdown of Selected Currencies:</strong><br>${totalBreakdown}`;

                    latestSummaryRef.current = summaryHTML;

                    return points.reduce((s, point) => {
                      return (
                        s +
                        `<br><span style="color:${point.series.color}">${point.series.name}</span>: ${formatNumber(point.y)}`
                      );
                    }, `<b>${Highcharts.dateFormat("%A, %b %e, %Y", this.x)}</b>`);
                  }
                  return points.reduce((s, point) => {
                    return (
                      s +
                      `<br><span style="color:${point.series.color}">${point.series.name}</span>: ${formatNumber(point.y)}`
                    );
                  }, `<b>${Highcharts.dateFormat("%A, %b %e, %Y", this.x)}</b>`);
                },
              },
              series: getData(),
              navigation: {
                buttonOptions: {
                  enabled: true,
                  theme: {
                    fill: isDarkMode ? "#444444" : "#f0f0f0",
                    stroke: isDarkMode ? "#666666" : "#cccccc",
                    style: {
                      color: isDarkMode ? "#ffffff" : "#000000",
                    },
                  },
                },
              },
              exporting: {
                buttons: {
                  contextButton: {
                    symbolStroke: isDarkMode ? "#cccccc" : "#000000",
                    theme: {
                      fill: isDarkMode ? "#444444" : "#f0f0f0",
                    },
                  },
                },
              },
            }}
            containerProps={{ className: "chart-container" }}
            updateArgs={[true, true, true]}
            ref={chartRef}
          />
          {compareWithTarget && (
            <div className="summary-box">
              <h3>Summary</h3>
              <div dangerouslySetInnerHTML={{ __html: summary }} />
            </div>
          )}
          <div className="bottom-right-buttons">
            <button
              onClick={() => setCompareWithTarget(!compareWithTarget)}
              className="toggle-button"
            >
              {compareWithTarget ? "Disable Compare with Target" : "Enable Compare with Target"}
            </button>
            <div className="download-section">
              <button className="toggle-button">Download</button>
              <div className="dropdown-content">
                <button
                  onClick={() =>
                    chartRef.current.chart.exportChart({ type: "image/png" })
                  }
                >
                  PNG
                </button>
                <button
                  onClick={() =>
                    chartRef.current.chart.exportChart({ type: "image/jpeg" })
                  }
                >
                  JPEG
                </button>
                <button
                  onClick={() =>
                    chartRef.current.chart.exportChart({ type: "application/pdf" })
                  }
                >
                  PDF
                </button>
                <button
                  onClick={() =>
                    chartRef.current.chart.exportChart({ type: "image/svg+xml" })
                  }
                >
                  SVG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-component">
        <h2 className="table-title">LCH Notional | Summary Table</h2>
        <div className="data-table-section">
          <DataTable rows={filteredData} columns={selectedCurrencies} />
        </div>
      </div>
    </div>
  );
};

export default Graph;
