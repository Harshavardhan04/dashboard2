// // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import Highcharts from "highcharts";
// // // // // import HighchartsReact from "highcharts-react-official";
// // // // // import HighchartsBoost from "highcharts/modules/boost";
// // // // // import HighchartsExporting from "highcharts/modules/exporting";
// // // // // import HighchartsAnnotations from "highcharts/modules/annotations";
// // // // // import HighchartsMore from "highcharts/highcharts-more";
// // // // // import DataTable from "react-data-table-component";
// // // // // import DatePicker from "react-datepicker";
// // // // // import "react-datepicker/dist/react-datepicker.css";
// // // // // import Topbar from "./Topbar";
// // // // // import Selector from "./Selector";
// // // // // import "../Styles/Graph.css";

// // // // // HighchartsBoost(Highcharts);
// // // // // HighchartsExporting(Highcharts);
// // // // // HighchartsAnnotations(Highcharts);
// // // // // HighchartsMore(Highcharts);

// // // // // const Graph = () => {
// // // // //   const [compareWithTarget, setCompareWithTarget] = useState(false);
// // // // //   const [selectedCurrencies, setSelectedCurrencies] = useState([
// // // // //     { value: "AUD", label: "AUD" },
// // // // //     { value: "EUR", label: "EUR" },
// // // // //     { value: "GBP", label: "GBP" },
// // // // //     { value: "JPY", label: "JPY" },
// // // // //     { value: "USD", label: "USD" }
// // // // //   ]);
// // // // //   const [summary, setSummary] = useState("");
// // // // //   const [startDate, setStartDate] = useState(new Date("2022-06-01"));
// // // // //   const [endDate, setEndDate] = useState(new Date("2024-06-25"));
// // // // //   const [data, setData] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [isDarkMode, setIsDarkMode] = useState(true);
// // // // //   const latestSummaryRef = useRef("");
// // // // //   const chartRef = useRef(null);

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         const response = await fetch("http://localhost:5000/xva");
// // // // //         const result = await response.json();
// // // // //         setData(result);
// // // // //         setLoading(false);
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching data:", error);
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchData();
// // // // //   }, []);

// // // // //   const getFilteredData = () => {
// // // // //     return data.filter((d) => {
// // // // //       const date = new Date(d.Date).getTime();
// // // // //       return date >= startDate.getTime() && date <= endDate.getTime();
// // // // //     });
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     if (!loading && data.length > 0) {
// // // // //       const updateSummary = () => {
// // // // //         if (summary !== latestSummaryRef.current) {
// // // // //           setSummary(latestSummaryRef.current);
// // // // //         }
// // // // //       };
// // // // //       const interval = setInterval(updateSummary, 1000);
// // // // //       return () => clearInterval(interval);
// // // // //     }
// // // // //   }, [loading, data, summary]);

// // // // //   const filteredData = getFilteredData();

// // // // //   const totalLine = {
// // // // //     name: "Total",
// // // // //     data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Total]),
// // // // //     color: isDarkMode ? "#007bff" : "#343a40",
// // // // //     marker: { enabled: false },
// // // // //     zIndex: 1,
// // // // //     boostThreshold: 1,
// // // // //   };

// // // // //   const shadeData = {
// // // // //     name: "Shaded Area",
// // // // //     data: filteredData.map((d) => ({
// // // // //       x: new Date(d.Date).getTime(),
// // // // //       low: Math.min(d.Total, d.Target),
// // // // //       high: Math.max(d.Total, d.Target),
// // // // //     })),
// // // // //     type: "arearange",
// // // // //     lineWidth: 0,
// // // // //     linkedTo: "Total",
// // // // //     color: "#2E8C39",
// // // // //     fillOpacity: 0.3,
// // // // //     zIndex: 0,
// // // // //     marker: { enabled: false },
// // // // //     boostThreshold: 0,
// // // // //     boost: false,
// // // // //   };

// // // // //   const getData = () => {
// // // // //     const compareData = [
// // // // //       ...selectedCurrencies.map((currency) => ({
// // // // //         name: currency.value,
// // // // //         data: filteredData.map((d) => [
// // // // //           new Date(d.Date).getTime(),
// // // // //           d[currency.value],
// // // // //         ]),
// // // // //         color: getCurrencyColor(currency.value),
// // // // //         marker: { enabled: false },
// // // // //         boostThreshold: 1,
// // // // //       })),
// // // // //       totalLine,
// // // // //       {
// // // // //         name: "Target",
// // // // //         data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Target]),
// // // // //         color: "#007bff",
// // // // //         marker: { enabled: false },
// // // // //         zIndex: 1,
// // // // //         boostThreshold: 1,
// // // // //       },
// // // // //       shadeData,
// // // // //     ];
// // // // //     return compareWithTarget ? compareData : compareData.slice(0, -1);
// // // // //   };

// // // // //   const getCurrencyColor = (currency) => {
// // // // //     switch (currency) {
// // // // //       case "AUD":
// // // // //         return "#FFD700";
// // // // //       case "EUR":
// // // // //         return "#FF6347";
// // // // //       case "GBP":
// // // // //         return "#4682B4";
// // // // //       case "JPY":
// // // // //         return "#32CD32";
// // // // //       case "USD":
// // // // //         return "#FFA07A";
// // // // //       case "BRL":
// // // // //         return "#9400D3";
// // // // //       case "CAD":
// // // // //         return "#00FF00";
// // // // //       case "CHF":
// // // // //         return "#FF00FF";
// // // // //       case "CLP":
// // // // //         return "#00FFFF";
// // // // //       case "CNY":
// // // // //         return "#FF4500";
// // // // //       case "CZK":
// // // // //         return "#FF1493";
// // // // //       case "DKK":
// // // // //         return "#1E90FF";
// // // // //       case "HKD":
// // // // //         return "#FF69B4";
// // // // //       case "HUF":
// // // // //         return "#8A2BE2";
// // // // //       case "INR":
// // // // //         return "#00BFFF";
// // // // //       case "KRW":
// // // // //         return "#7B68EE";
// // // // //       case "NOK":
// // // // //         return "#FFD700";
// // // // //       case "NZD":
// // // // //         return "#FF6347";
// // // // //       case "PLN":
// // // // //         return "#4682B4";
// // // // //       case "SEK":
// // // // //         return "#32CD32";
// // // // //       case "SGD":
// // // // //         return "#FFA07A";
// // // // //       case "THB":
// // // // //         return "#9400D3";
// // // // //       case "TWD":
// // // // //         return "#00FF00";
// // // // //       case "ZAR":
// // // // //         return "#FF00FF";
// // // // //       default:
// // // // //         return "#FF4500";
// // // // //     }
// // // // //   };

// // // // //   const toggleTheme = () => {
// // // // //     setIsDarkMode(!isDarkMode);
// // // // //   };

// // // // //   return (
// // // // //     <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
// // // // //       <Topbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
// // // // //       <div className="graph-container">
// // // // //         <h2 className="graph-title">LCH Notional | Time Series</h2>
// // // // //         <div className="selectors-container">
// // // // //           <div className="currency-selector">
// // // // //             <label>Select Currencies:</label>
// // // // //             <Selector
// // // // //               options={[
// // // // //                 { value: "AUD", label: "AUD" },
// // // // //                 { value: "EUR", label: "EUR" },
// // // // //                 { value: "GBP", label: "GBP" },
// // // // //                 { value: "JPY", label: "JPY" },
// // // // //                 { value: "USD", label: "USD" },
// // // // //                 { value: "BRL", label: "BRL" },
// // // // //                 { value: "CAD", label: "CAD" },
// // // // //                 { value: "CHF", label: "CHF" },
// // // // //                 { value: "CLP", label: "CLP" },
// // // // //                 { value: "CNY", label: "CNY" },
// // // // //                 { value: "CZK", label: "CZK" },
// // // // //                 { value: "DKK", label: "DKK" },
// // // // //                 { value: "HKD", label: "HKD" },
// // // // //                 { value: "HUF", label: "HUF" },
// // // // //                 { value: "INR", label: "INR" },
// // // // //                 { value: "KRW", label: "KRW" },
// // // // //                 { value: "MXN", label: "MXN" },
// // // // //                 { value: "NOK", label: "NOK" },
// // // // //                 { value: "NZD", label: "NZD" },
// // // // //                 { value: "PLN", label: "PLN" },
// // // // //                 { value: "SEK", label: "SEK" },
// // // // //                 { value: "SGD", label: "SGD" },
// // // // //                 { value: "THB", label: "THB" },
// // // // //                 { value: "TWD", label: "TWD" },
// // // // //                 { value: "ZAR", label: "ZAR" },
// // // // //               ]}
// // // // //               selectedCurrencies={selectedCurrencies}
// // // // //               setSelectedCurrencies={setSelectedCurrencies}
// // // // //             />
// // // // //           </div>
// // // // //           <div className="date-picker">
// // // // //             <label>Select Date Range:</label>
// // // // //             <DatePicker
// // // // //               selected={startDate}
// // // // //               onChange={(date) => setStartDate(date)}
// // // // //               selectsStart
// // // // //               startDate={startDate}
// // // // //               endDate={endDate}
// // // // //               className="date-input"
// // // // //             />
// // // // //             <DatePicker
// // // // //               selected={endDate}
// // // // //               onChange={(date) => setEndDate(date)}
// // // // //               selectsEnd
// // // // //               startDate={startDate}
// // // // //               endDate={endDate}
// // // // //               minDate={startDate}
// // // // //               className="date-input"
// // // // //             />
// // // // //           </div>
// // // // //         </div>
// // // // //         <div className="main-panel">
// // // // //           <HighchartsReact
// // // // //             className="chart-actual"
// // // // //             highcharts={Highcharts}
// // // // //             options={{
// // // // //               chart: {
// // // // //                 type: "line",
// // // // //                 zoomType: "x",
// // // // //                 backgroundColor: {
// // // // //                   linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
// // // // //                   stops: isDarkMode
// // // // //                     ? [
// // // // //                         [0, "#2e2e2e"],
// // // // //                         [1, "#1a1a1a"],
// // // // //                       ]
// // // // //                     : [
// // // // //                         [0, "#ffffff"],
// // // // //                         [1, "#f0f0f0"],
// // // // //                       ],
// // // // //                 },
// // // // //                 borderRadius: 10, // Rounded corners
// // // // //                 style: {
// // // // //                   fontFamily: "Helvetica, Arial, sans-serif", // Font style for the chart
// // // // //                 },
// // // // //                 plotBorderColor: isDarkMode ? "#444444" : "#cccccc",
// // // // //                 plotBorderWidth: 1,
// // // // //                 events: {
// // // // //                   load: function () {
// // // // //                     this.xAxis[0].setExtremes(startDate.getTime(), endDate.getTime());
// // // // //                   },
// // // // //                 },
// // // // //                 boost: {
// // // // //                   useGPUTranslations: true,
// // // // //                   usePreAllocated: true,
// // // // //                 },
// // // // //               },
// // // // //               title: {
// // // // //                 text: "",
// // // // //                 style: {
// // // // //                   color: isDarkMode ? "#ffffff" : "#000000",
// // // // //                   fontSize: "22px",
// // // // //                   fontWeight: "bold",
// // // // //                 },
// // // // //               },
// // // // //               xAxis: {
// // // // //                 type: "datetime",
// // // // //                 title: {
// // // // //                   text: "Date",
// // // // //                   style: {
// // // // //                     color: isDarkMode ? "#cccccc" : "#000000",
// // // // //                     fontSize: "14px",
// // // // //                     fontWeight: "bold",
// // // // //                   },
// // // // //                 },
// // // // //                 lineColor: isDarkMode ? "#444444" : "#cccccc",
// // // // //                 tickColor: isDarkMode ? "#444444" : "#cccccc",
// // // // //                 labels: {
// // // // //                   style: {
// // // // //                     color: isDarkMode ? "#cccccc" : "#000000",
// // // // //                     fontSize: "12px",
// // // // //                   },
// // // // //                 },
// // // // //               },
// // // // //               yAxis: {
// // // // //                 title: {
// // // // //                   text: "Notional (USD)",
// // // // //                   style: {
// // // // //                     color: isDarkMode ? "#cccccc" : "#000000",
// // // // //                     fontSize: "14px",
// // // // //                     fontWeight: "bold",
// // // // //                   },
// // // // //                 },
// // // // //                 gridLineColor: isDarkMode ? "#444444" : "#cccccc",
// // // // //                 labels: {
// // // // //                   style: {
// // // // //                     color: isDarkMode ? "#cccccc" : "#000000",
// // // // //                     fontSize: "12px",
// // // // //                   },
// // // // //                 },
// // // // //               },
// // // // //               legend: {
// // // // //                 layout: "horizontal",
// // // // //                 align: "center",
// // // // //                 verticalAlign: "bottom",
// // // // //                 itemStyle: {
// // // // //                   color: isDarkMode ? "#ffffff" : "#000000",
// // // // //                   fontSize: "14px",
// // // // //                   fontWeight: "bold",
// // // // //                 },
// // // // //                 itemHoverStyle: {
// // // // //                   color: isDarkMode ? "#cccccc" : "#000000",
// // // // //                 },
// // // // //                 itemHiddenStyle: {
// // // // //                   color: isDarkMode ? "#666666" : "#999999",
// // // // //                 },
// // // // //               },
// // // // //               tooltip: {
// // // // //                 shared: true,
// // // // //                 backgroundColor: isDarkMode ? "rgba(33, 33, 33, 0.85)" : "rgba(255, 255, 255, 0.85)",
// // // // //                 borderColor: isDarkMode ? "#666666" : "#cccccc",
// // // // //                 style: {
// // // // //                   color: isDarkMode ? "#ffffff" : "#000000",
// // // // //                 },
// // // // //                 formatter: function () {
// // // // //                   const points = this.points;
// // // // //                   let targetValue = null;
// // // // //                   let totalValue = null;

// // // // //                   points.forEach((point) => {
// // // // //                     if (point.series.name === "Target") {
// // // // //                       targetValue = point.y;
// // // // //                     }
// // // // //                     if (point.series.name === "Total") {
// // // // //                       totalValue = point.y;
// // // // //                     }
// // // // //                   });

// // // // //                   if (targetValue !== null && totalValue !== null) {
// // // // //                     const difference = (totalValue - targetValue).toFixed(2);
// // // // //                     const totalBreakdown = selectedCurrencies
// // // // //                       .map((currency) => {
// // // // //                         const point = points.find((p) => p.series.name === currency.value);
// // // // //                         return point
// // // // //                           ? `${currency.value}: ${point.y.toFixed(2)}`
// // // // //                           : `${currency.value}: N/A`;
// // // // //                       })
// // // // //                       .join("<br>");

// // // // //                     let summaryHTML = `<strong>Total: ${totalValue.toFixed(2)}</strong><br>`;
// // // // //                     summaryHTML += `<strong>Target: ${targetValue.toFixed(2)}</strong><br>`;
// // // // //                     summaryHTML += `Difference: ${difference}<br><br>`;
// // // // //                     summaryHTML += `<strong>Breakdown of Selected Currencies:</strong><br>${totalBreakdown}`;

// // // // //                     latestSummaryRef.current = summaryHTML;

// // // // //                     return points.reduce((s, point) => {
// // // // //                       return (
// // // // //                         s +
// // // // //                         `<br><span style="color:${point.series.color}">${point.series.name}</span>: ${point.y}`
// // // // //                       );
// // // // //                     }, `<b>${Highcharts.dateFormat("%A, %b %e, %Y", this.x)}</b>`);
// // // // //                   }
// // // // //                   return points.reduce((s, point) => {
// // // // //                     return (
// // // // //                       s +
// // // // //                       `<br><span style="color:${point.series.color}">${point.series.name}</span>: ${point.y}`
// // // // //                     );
// // // // //                   }, `<b>${Highcharts.dateFormat("%A, %b %e, %Y", this.x)}</b>`);
// // // // //                 },
// // // // //               },
// // // // //               series: getData(),
// // // // //               navigation: {
// // // // //                 buttonOptions: {
// // // // //                   enabled: true,
// // // // //                   theme: {
// // // // //                     fill: isDarkMode ? "#444444" : "#f0f0f0",
// // // // //                     stroke: isDarkMode ? "#666666" : "#cccccc",
// // // // //                     style: {
// // // // //                       color: isDarkMode ? "#ffffff" : "#000000",
// // // // //                     },
// // // // //                   },
// // // // //                 },
// // // // //               },
// // // // //               exporting: {
// // // // //                 buttons: {
// // // // //                   contextButton: {
// // // // //                     symbolStroke: isDarkMode ? "#cccccc" : "#000000",
// // // // //                     theme: {
// // // // //                       fill: isDarkMode ? "#444444" : "#f0f0f0",
// // // // //                     },
// // // // //                   },
// // // // //                 },
// // // // //               },
// // // // //             }}
// // // // //             containerProps={{ className: "chart-container" }}
// // // // //             updateArgs={[true, true, true]}
// // // // //             ref={chartRef}
// // // // //           />
// // // // //           {compareWithTarget && (
// // // // //             <div className="summary-box">
// // // // //               <h3>Summary</h3>
// // // // //               <div dangerouslySetInnerHTML={{ __html: summary }} />
// // // // //             </div>
// // // // //           )}
// // // // //           <div className="bottom-right-buttons">
// // // // //             <button
// // // // //               onClick={() => setCompareWithTarget(!compareWithTarget)}
// // // // //               className="toggle-button"
// // // // //             >
// // // // //               {compareWithTarget ? "Disable Compare with Target" : "Enable Compare with Target"}
// // // // //             </button>
// // // // //             <div className="download-section">
// // // // //               <button className="toggle-button">Download</button>
// // // // //               <div className="dropdown-content">
// // // // //                 <button
// // // // //                   onClick={() =>
// // // // //                     chartRef.current.chart.exportChart({ type: "image/png" })
// // // // //                   }
// // // // //                 >
// // // // //                   PNG
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={() =>
// // // // //                     chartRef.current.chart.exportChart({ type: "image/jpeg" })
// // // // //                   }
// // // // //                 >
// // // // //                   JPEG
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={() =>
// // // // //                     chartRef.current.chart.exportChart({ type: "application/pdf" })
// // // // //                   }
// // // // //                 >
// // // // //                   PDF
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={() =>
// // // // //                     chartRef.current.chart.exportChart({ type: "image/svg+xml" })
// // // // //                   }
// // // // //                 >
// // // // //                   SVG
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //       <div className="data-table-section">
// // // // //         <DataTable
// // // // //           title="LCH Notional | Summary Table"
// // // // //           columns={[
// // // // //             { name: "Date", selector: (row) => row.Date, sortable: true },
// // // // //             { name: "Target", selector: (row) => row.Target, sortable: true },
// // // // //             ...selectedCurrencies.map((currency) => ({
// // // // //               name: currency.label,
// // // // //               selector: (row) => row[currency.value],
// // // // //               sortable: true,
// // // // //             })),
// // // // //             { name: "Total", selector: (row) => row.Total, sortable: true },
// // // // //           ]}
// // // // //           data={filteredData.map((d) => {
// // // // //             const rowData = {
// // // // //               Date: d.Date,
// // // // //               Target: d.Target,
// // // // //               Total: d.Total,
// // // // //             };
// // // // //             selectedCurrencies.forEach((currency) => {
// // // // //               rowData[currency.value] = d[currency.value];
// // // // //             });
// // // // //             return rowData;
// // // // //           })}
// // // // //           pagination
// // // // //           highlightOnHover
// // // // //           pointerOnHover
// // // // //           customStyles={{
// // // // //             header: {
// // // // //               style: {
// // // // //                 fontSize: '22px',
// // // // //                 fontWeight: 'bold',
// // // // //                 color: 'var(--text-color)',
// // // // //                 backgroundColor: 'var(--control-bg-color)',
// // // // //               },
// // // // //             },
// // // // //             rows: {
// // // // //               style: {
// // // // //                 fontSize: '16px',
// // // // //                 color: 'var(--text-color)',
// // // // //                 backgroundColor: 'var(--input-bg-color)',
// // // // //                 '&:not(:last-of-type)': {
// // // // //                   borderBottomStyle: 'solid',
// // // // //                   borderBottomWidth: '1px',
// // // // //                   borderBottomColor: 'var(--control-bg-color)',
// // // // //                 },
// // // // //               },
// // // // //             },
// // // // //             headCells: {
// // // // //               style: {
// // // // //                 fontSize: '18px',
// // // // //                 fontWeight: 'bold',
// // // // //                 color: 'var(--text-color)',
// // // // //                 backgroundColor: 'var(--control-bg-color)',
// // // // //               },
// // // // //             },
// // // // //             cells: {
// // // // //               style: {
// // // // //                 fontSize: '16px',
// // // // //                 color: 'var(--text-color)',
// // // // //                 backgroundColor: 'var(--input-bg-color)',
// // // // //               },
// // // // //             },
// // // // //           }}
// // // // //         />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Graph;


// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import Highcharts from "highcharts";
// // // // import HighchartsReact from "highcharts-react-official";
// // // // import HighchartsBoost from "highcharts/modules/boost";
// // // // import HighchartsExporting from "highcharts/modules/exporting";
// // // // import HighchartsAnnotations from "highcharts/modules/annotations";
// // // // import HighchartsMore from "highcharts/highcharts-more";
// // // // import DataTable from "react-data-table-component";
// // // // import DatePicker from "react-datepicker";
// // // // import "react-datepicker/dist/react-datepicker.css";
// // // // import Topbar from "./Topbar";
// // // // import Selector from "./Selector";
// // // // import "../Styles/Graph.css";
// // // // import Sidebar from "./Sidebar";

// // // // HighchartsBoost(Highcharts);
// // // // HighchartsExporting(Highcharts);
// // // // HighchartsAnnotations(Highcharts);
// // // // HighchartsMore(Highcharts);

// // // // const Graph = () => {
// // // //   const [compareWithTarget, setCompareWithTarget] = useState(false);
// // // //   const [selectedCurrencies, setSelectedCurrencies] = useState([
// // // //     { value: "AUD", label: "AUD" },
// // // //     { value: "EUR", label: "EUR" },
// // // //     { value: "GBP", label: "GBP" },
// // // //     { value: "JPY", label: "JPY" },
// // // //     { value: "USD", label: "USD" }
// // // //   ]);
// // // //   const [summary, setSummary] = useState("");
// // // //   const [startDate, setStartDate] = useState(new Date("2022-06-01"));
// // // //   const [endDate, setEndDate] = useState(new Date("2024-06-25"));
// // // //   const [data, setData] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [isDarkMode, setIsDarkMode] = useState(true);
// // // //   const [showBreakdown, setShowBreakdown] = useState(false);
// // // //   const latestSummaryRef = useRef("");
// // // //   const chartRef = useRef(null);

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const response = await fetch("http://localhost:5000/xva");
// // // //         const result = await response.json();
// // // //         setData(result);
// // // //         setLoading(false);
// // // //       } catch (error) {
// // // //         console.error("Error fetching data:", error);
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchData();
// // // //   }, []);

// // // //   const getFilteredData = () => {
// // // //     return data.filter((d) => {
// // // //       const date = new Date(d.Date).getTime();
// // // //       return date >= startDate.getTime() && date <= endDate.getTime();
// // // //     });
// // // //   };

// // // //   useEffect(() => {
// // // //     if (!loading && data.length > 0) {
// // // //       const updateSummary = () => {
// // // //         if (summary !== latestSummaryRef.current) {
// // // //           setSummary(latestSummaryRef.current);
// // // //         }
// // // //       };
// // // //       const interval = setInterval(updateSummary, 1000);
// // // //       return () => clearInterval(interval);
// // // //     }
// // // //   }, [loading, data, summary]);

// // // //   const filteredData = getFilteredData();

// // // //   const totalLine = {
// // // //     name: "Total",
// // // //     data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Total]),
// // // //     color: isDarkMode ? "#007bff" : "#343a40",
// // // //     marker: { enabled: false },
// // // //     zIndex: 1,
// // // //     boostThreshold: 1,
// // // //   };

// // // //   const shadeData = {
// // // //     name: "Shaded Area",
// // // //     data: filteredData.map((d) => ({
// // // //       x: new Date(d.Date).getTime(),
// // // //       low: Math.min(d.Total, d.Target),
// // // //       high: Math.max(d.Total, d.Target),
// // // //     })),
// // // //     type: "arearange",
// // // //     lineWidth: 0,
// // // //     linkedTo: "Total",
// // // //     color: "#2E8C39",
// // // //     fillOpacity: 0.3,
// // // //     zIndex: 0,
// // // //     marker: { enabled: false },
// // // //     boostThreshold: 0,
// // // //     boost: false,
// // // //   };

// // // //   const getData = () => {
// // // //     const compareData = [
// // // //       ...selectedCurrencies.map((currency) => ({
// // // //         name: currency.value,
// // // //         data: filteredData.map((d) => [
// // // //           new Date(d.Date).getTime(),
// // // //           d[currency.value],
// // // //         ]),
// // // //         color: getCurrencyColor(currency.value),
// // // //         marker: { enabled: false },
// // // //         boostThreshold: 1,
// // // //       })),
// // // //       totalLine,
// // // //       {
// // // //         name: "Target",
// // // //         data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Target]),
// // // //         color: "#007bff",
// // // //         marker: { enabled: false },
// // // //         zIndex: 1,
// // // //         boostThreshold: 1,
// // // //       },
// // // //       shadeData,
// // // //     ];
// // // //     return compareWithTarget ? compareData : compareData.slice(0, -1);
// // // //   };

// // // //   const getCurrencyColor = (currency) => {
// // // //     switch (currency) {
// // // //       case "AUD":
// // // //         return "#FFD700";
// // // //       case "EUR":
// // // //         return "#FF6347";
// // // //       case "GBP":
// // // //         return "#4682B4";
// // // //       case "JPY":
// // // //         return "#32CD32";
// // // //       case "USD":
// // // //         return "#FFA07A";
// // // //       case "BRL":
// // // //         return "#9400D3";
// // // //       case "CAD":
// // // //         return "#00FF00";
// // // //       case "CHF":
// // // //         return "#FF00FF";
// // // //       case "CLP":
// // // //         return "#00FFFF";
// // // //       case "CNY":
// // // //         return "#FF4500";
// // // //       case "CZK":
// // // //         return "#FF1493";
// // // //       case "DKK":
// // // //         return "#1E90FF";
// // // //       case "HKD":
// // // //         return "#FF69B4";
// // // //       case "HUF":
// // // //         return "#8A2BE2";
// // // //       case "INR":
// // // //         return "#00BFFF";
// // // //       case "KRW":
// // // //         return "#7B68EE";
// // // //       case "NOK":
// // // //         return "#FFD700";
// // // //       case "NZD":
// // // //         return "#FF6347";
// // // //       case "PLN":
// // // //         return "#4682B4";
// // // //       case "SEK":
// // // //         return "#32CD32";
// // // //       case "SGD":
// // // //         return "#FFA07A";
// // // //       case "THB":
// // // //         return "#9400D3";
// // // //       case "TWD":
// // // //         return "#00FF00";
// // // //       case "ZAR":
// // // //         return "#FF00FF";
// // // //       default:
// // // //         return "#FF4500";
// // // //     }
// // // //   };

// // // //   const toggleTheme = () => {
// // // //     setIsDarkMode(!isDarkMode);
// // // //   };

// // // //   return (
// // // //     <div>
// // // //         <Sidebar/>
    
// // // //     <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
// // // //       <Topbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
// // // //       <div className="graph-container">
// // // //         <h2 className="graph-title">LCH Notional | Time Series</h2>
// // // //         <div className="selectors-container">
// // // //           <div className="currency-selector">
// // // //             <label>Select Currencies:</label>
// // // //             <Selector
// // // //               options={[
// // // //                 { value: "AUD", label: "AUD" },
// // // //                 { value: "EUR", label: "EUR" },
// // // //                 { value: "GBP", label: "GBP" },
// // // //                 { value: "JPY", label: "JPY" },
// // // //                 { value: "USD", label: "USD" },
// // // //                 { value: "BRL", label: "BRL" },
// // // //                 { value: "CAD", label: "CAD" },
// // // //                 { value: "CHF", label: "CHF" },
// // // //                 { value: "CLP", label: "CLP" },
// // // //                 { value: "CNY", label: "CNY" },
// // // //                 { value: "CZK", label: "CZK" },
// // // //                 { value: "DKK", label: "DKK" },
// // // //                 { value: "HKD", label: "HKD" },
// // // //                 { value: "HUF", label: "HUF" },
// // // //                 { value: "INR", label: "INR" },
// // // //                 { value: "KRW", label: "KRW" },
// // // //                 { value: "MXN", label: "MXN" },
// // // //                 { value: "NOK", label: "NOK" },
// // // //                 { value: "NZD", label: "NZD" },
// // // //                 { value: "PLN", label: "PLN" },
// // // //                 { value: "SEK", label: "SEK" },
// // // //                 { value: "SGD", label: "SGD" },
// // // //                 { value: "THB", label: "THB" },
// // // //                 { value: "TWD", label: "TWD" },
// // // //                 { value: "ZAR", label: "ZAR" },
// // // //               ]}
// // // //               selectedCurrencies={selectedCurrencies}
// // // //               setSelectedCurrencies={setSelectedCurrencies}
// // // //             />
// // // //           </div>
// // // //           <div className="date-picker">
// // // //             <label>Select Date Range:</label>
// // // //             <DatePicker
// // // //               selected={startDate}
// // // //               onChange={(date) => setStartDate(date)}
// // // //               selectsStart
// // // //               startDate={startDate}
// // // //               endDate={endDate}
// // // //               className="date-input"
// // // //             />
// // // //             <DatePicker
// // // //               selected={endDate}
// // // //               onChange={(date) => setEndDate(date)}
// // // //               selectsEnd
// // // //               startDate={startDate}
// // // //               endDate={endDate}
// // // //               minDate={startDate}
// // // //               className="date-input"
// // // //             />
// // // //           </div>
// // // //         </div>
// // // //         <div className="main-panel">
// // // //           <HighchartsReact
// // // //             className="chart-actual"
// // // //             highcharts={Highcharts}
// // // //             options={{
// // // //               chart: {
// // // //                 type: "line",
// // // //                 zoomType: "x",
// // // //                 backgroundColor: {
// // // //                   linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
// // // //                   stops: isDarkMode
// // // //                     ? [
// // // //                         [0, "#2e2e2e"],
// // // //                         [1, "#1a1a1a"],
// // // //                       ]
// // // //                     : [
// // // //                         [0, "#ffffff"],
// // // //                         [1, "#f0f0f0"],
// // // //                       ],
// // // //                 },
// // // //                 borderRadius: 10, // Rounded corners
// // // //                 style: {
// // // //                   fontFamily: "Helvetica, Arial, sans-serif", // Font style for the chart
// // // //                 },
// // // //                 plotBorderColor: isDarkMode ? "#444444" : "#cccccc",
// // // //                 plotBorderWidth: 1,
// // // //                 events: {
// // // //                   load: function () {
// // // //                     this.xAxis[0].setExtremes(startDate.getTime(), endDate.getTime());
// // // //                   },
// // // //                 },
// // // //                 boost: {
// // // //                   useGPUTranslations: true,
// // // //                   usePreAllocated: true,
// // // //                 },
// // // //               },
// // // //               title: {
// // // //                 text: "",
// // // //                 style: {
// // // //                   color: isDarkMode ? "#ffffff" : "#000000",
// // // //                   fontSize: "22px",
// // // //                   fontWeight: "bold",
// // // //                 },
// // // //               },
// // // //               xAxis: {
// // // //                 type: "datetime",
// // // //                 title: {
// // // //                   text: "Date",
// // // //                   style: {
// // // //                     color: isDarkMode ? "#cccccc" : "#000000",
// // // //                     fontSize: "14px",
// // // //                     fontWeight: "bold",
// // // //                   },
// // // //                 },
// // // //                 lineColor: isDarkMode ? "#444444" : "#cccccc",
// // // //                 tickColor: isDarkMode ? "#444444" : "#cccccc",
// // // //                 labels: {
// // // //                   style: {
// // // //                     color: isDarkMode ? "#cccccc" : "#000000",
// // // //                     fontSize: "12px",
// // // //                   },
// // // //                 },
// // // //               },
// // // //               yAxis: {
// // // //                 title: {
// // // //                   text: "Notional (USD)",
// // // //                   style: {
// // // //                     color: isDarkMode ? "#cccccc" : "#000000",
// // // //                     fontSize: "14px",
// // // //                     fontWeight: "bold",
// // // //                   },
// // // //                 },
// // // //                 gridLineColor: isDarkMode ? "#444444" : "#cccccc",
// // // //                 labels: {
// // // //                   style: {
// // // //                     color: isDarkMode ? "#cccccc" : "#000000",
// // // //                     fontSize: "12px",
// // // //                   },
// // // //                 },
// // // //               },
// // // //               legend: {
// // // //                 layout: "horizontal",
// // // //                 align: "center",
// // // //                 verticalAlign: "bottom",
// // // //                 itemStyle: {
// // // //                   color: isDarkMode ? "#ffffff" : "#000000",
// // // //                   fontSize: "14px",
// // // //                   fontWeight: "bold",
// // // //                 },
// // // //                 itemHoverStyle: {
// // // //                   color: isDarkMode ? "#cccccc" : "#000000",
// // // //                 },
// // // //                 itemHiddenStyle: {
// // // //                   color: isDarkMode ? "#666666" : "#999999",
// // // //                 },
// // // //               },
// // // //               tooltip: {
// // // //                 shared: true,
// // // //                 backgroundColor: isDarkMode ? "rgba(33, 33, 33, 0.85)" : "rgba(255, 255, 255, 0.85)",
// // // //                 borderColor: isDarkMode ? "#666666" : "#cccccc",
// // // //                 style: {
// // // //                   color: isDarkMode ? "#ffffff" : "#000000",
// // // //                 },
// // // //                 formatter: function () {
// // // //                   const points = this.points;
// // // //                   let targetValue = null;
// // // //                   let totalValue = null;

// // // //                   points.forEach((point) => {
// // // //                     if (point.series.name === "Target") {
// // // //                       targetValue = point.y;
// // // //                     }
// // // //                     if (point.series.name === "Total") {
// // // //                       totalValue = point.y;
// // // //                     }
// // // //                   });

// // // //                   if (targetValue !== null && totalValue !== null) {
// // // //                     const difference = (totalValue - targetValue).toFixed(2);
// // // //                     const totalBreakdown = selectedCurrencies
// // // //                       .map((currency) => {
// // // //                         const point = points.find((p) => p.series.name === currency.value);
// // // //                         return point
// // // //                           ? `${currency.value}: ${point.y.toFixed(2)}`
// // // //                           : `${currency.value}: N/A`;
// // // //                       })
// // // //                       .join("<br>");

// // // //                     let summaryHTML = `<strong>Total: ${totalValue.toFixed(2)}</strong><br>`;
// // // //                     summaryHTML += `<strong>Target: ${targetValue.toFixed(2)}</strong><br>`;
// // // //                     summaryHTML += `Difference: ${difference}<br><br>`;
// // // //                     summaryHTML += `<strong>Breakdown of Selected Currencies:</strong><br>${totalBreakdown}`;

// // // //                     latestSummaryRef.current = summaryHTML;

// // // //                     return points.reduce((s, point) => {
// // // //                       return (
// // // //                         s +
// // // //                         `<br><span style="color:${point.series.color}">${point.series.name}</span>: ${point.y}`
// // // //                       );
// // // //                     }, `<b>${Highcharts.dateFormat("%A, %b %e, %Y", this.x)}</b>`);
// // // //                   }
// // // //                   return points.reduce((s, point) => {
// // // //                     return (
// // // //                       s +
// // // //                       `<br><span style="color:${point.series.color}">${point.series.name}</span>: ${point.y}`
// // // //                     );
// // // //                   }, `<b>${Highcharts.dateFormat("%A, %b %e, %Y", this.x)}</b>`);
// // // //                 },
// // // //               },
// // // //               series: getData(),
// // // //               navigation: {
// // // //                 buttonOptions: {
// // // //                   enabled: true,
// // // //                   theme: {
// // // //                     fill: isDarkMode ? "#444444" : "#f0f0f0",
// // // //                     stroke: isDarkMode ? "#666666" : "#cccccc",
// // // //                     style: {
// // // //                       color: isDarkMode ? "#ffffff" : "#000000",
// // // //                     },
// // // //                   },
// // // //                 },
// // // //               },
// // // //               exporting: {
// // // //                 buttons: {
// // // //                   contextButton: {
// // // //                     symbolStroke: isDarkMode ? "#cccccc" : "#000000",
// // // //                     theme: {
// // // //                       fill: isDarkMode ? "#444444" : "#f0f0f0",
// // // //                     },
// // // //                   },
// // // //                 },
// // // //               },
// // // //             }}
// // // //             containerProps={{ className: "chart-container" }}
// // // //             updateArgs={[true, true, true]}
// // // //             ref={chartRef}
// // // //           />
// // // //           {compareWithTarget && (
// // // //             <div className="summary-box">
// // // //               <div className="summary-content">
// // // //                 <span>Total: {parseFloat(summary.split('Total: ')[1]?.split('<br>')[0])}</span>
// // // //                 <span>Target: {parseFloat(summary.split('Target: ')[1]?.split('<br>')[0])}</span>
// // // //                 <span>Difference: {parseFloat(summary.split('Difference: ')[1]?.split('<br>')[0])}</span>
// // // //                 <span
// // // //                   className="dropdown-arrow"
// // // //                   onClick={() => setShowBreakdown(!showBreakdown)}
// // // //                   title="Show currency breakdown"
// // // //                 >
// // // //                   &#9660;
// // // //                 </span>
// // // //               </div>
// // // //               {showBreakdown && (
// // // //                 <div className="currency-breakdown">
// // // //                   <div dangerouslySetInnerHTML={{ __html: summary.split('<br><br>')[1] }} />
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           )}
// // // //           <div className="bottom-right-buttons">
// // // //             <button
// // // //               onClick={() => setCompareWithTarget(!compareWithTarget)}
// // // //               className="toggle-button"
// // // //             >
// // // //               {compareWithTarget ? "Disable Compare with Target" : "Enable Compare with Target"}
// // // //             </button>
// // // //             <div className="download-section">
// // // //               <button className="toggle-button">Download</button>
// // // //               <div className="dropdown-content">
// // // //                 <button
// // // //                   onClick={() =>
// // // //                     chartRef.current.chart.exportChart({ type: "image/png" })
// // // //                   }
// // // //                 >
// // // //                   PNG
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() =>
// // // //                     chartRef.current.chart.exportChart({ type: "image/jpeg" })
// // // //                   }
// // // //                 >
// // // //                   JPEG
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() =>
// // // //                     chartRef.current.chart.exportChart({ type: "application/pdf" })
// // // //                   }
// // // //                 >
// // // //                   PDF
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() =>
// // // //                     chartRef.current.chart.exportChart({ type: "image/svg+xml" })
// // // //                   }
// // // //                 >
// // // //                   SVG
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //       <div className="data-table-section">
// // // //         <DataTable
// // // //           title="LCH Notional | Summary Table"
// // // //           columns={[
// // // //             { name: "Date", selector: (row) => row.Date, sortable: true },
// // // //             { name: "Target", selector: (row) => row.Target, sortable: true },
// // // //             ...selectedCurrencies.map((currency) => ({
// // // //               name: currency.label,
// // // //               selector: (row) => row[currency.value],
// // // //               sortable: true,
// // // //             })),
// // // //             { name: "Total", selector: (row) => row.Total, sortable: true },
// // // //           ]}
// // // //           data={filteredData.map((d) => {
// // // //             const rowData = {
// // // //               Date: d.Date,
// // // //               Target: d.Target,
// // // //               Total: d.Total,
// // // //             };
// // // //             selectedCurrencies.forEach((currency) => {
// // // //               rowData[currency.value] = d[currency.value];
// // // //             });
// // // //             return rowData;
// // // //           })}
// // // //           pagination
// // // //           highlightOnHover
// // // //           pointerOnHover
// // // //           customStyles={{
// // // //             header: {
// // // //               style: {
// // // //                 fontSize: '22px',
// // // //                 fontWeight: 'bold',
// // // //                 color: 'var(--text-color)',
// // // //                 backgroundColor: 'var(--control-bg-color)',
// // // //               },
// // // //             },
// // // //             rows: {
// // // //               style: {
// // // //                 fontSize: '16px',
// // // //                 color: 'var(--text-color)',
// // // //                 backgroundColor: 'var(--input-bg-color)',
// // // //                 '&:not(:last-of-type)': {
// // // //                   borderBottomStyle: 'solid',
// // // //                   borderBottomWidth: '1px',
// // // //                   borderBottomColor: 'var(--control-bg-color)',
// // // //                 },
// // // //               },
// // // //             },
// // // //             headCells: {
// // // //               style: {
// // // //                 fontSize: '18px',
// // // //                 fontWeight: 'bold',
// // // //                 color: 'var(--text-color)',
// // // //                 backgroundColor: 'var(--control-bg-color)',
// // // //               },
// // // //             },
// // // //             cells: {
// // // //               style: {
// // // //                 fontSize: '16px',
// // // //                 color: 'var(--text-color)',
// // // //                 backgroundColor: 'var(--input-bg-color)',
// // // //               },
// // // //             },
// // // //           }}
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Graph;



// // // import React, { useState, useEffect, useRef } from "react";
// // // import Highcharts from "highcharts";
// // // import HighchartsReact from "highcharts-react-official";
// // // import HighchartsBoost from "highcharts/modules/boost";
// // // import HighchartsExporting from "highcharts/modules/exporting";
// // // import HighchartsAnnotations from "highcharts/modules/annotations";
// // // import HighchartsMore from "highcharts/highcharts-more";
// // // import DataTable from "react-data-table-component";
// // // import DatePicker from "react-datepicker";
// // // import "react-datepicker/dist/react-datepicker.css";
// // // import Topbar from "./Topbar";
// // // import Selector from "./Selector";
// // // import Sidebar from "./Sidebar"; // Import the Sidebar component
// // // import "../Styles/Graph.css";

// // // HighchartsBoost(Highcharts);
// // // HighchartsExporting(Highcharts);
// // // HighchartsAnnotations(Highcharts);
// // // HighchartsMore(Highcharts);

// // // const Graph = () => {
// // //     const [compareWithTarget, setCompareWithTarget] = useState(false);
// // //     const [selectedCurrencies, setSelectedCurrencies] = useState([
// // //         { value: "AUD", label: "AUD" },
// // //         { value: "EUR", label: "EUR" },
// // //         { value: "GBP", label: "GBP" },
// // //         { value: "JPY", label: "JPY" },
// // //         { value: "USD", label: "USD" }
// // //     ]);
// // //     const [summary, setSummary] = useState("");
// // //     const [startDate, setStartDate] = useState(new Date("2022-06-01"));
// // //     const [endDate, setEndDate] = useState(new Date("2024-06-25"));
// // //     const [data, setData] = useState([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const [isDarkMode, setIsDarkMode] = useState(true);
// // //     const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state
// // //     const latestSummaryRef = useRef("");
// // //     const chartRef = useRef(null);

// // //     useEffect(() => {
// // //         const fetchData = async () => {
// // //             try {
// // //                 const response = await fetch("http://localhost:5000/xva");
// // //                 const result = await response.json();
// // //                 setData(result);
// // //                 setLoading(false);
// // //             } catch (error) {
// // //                 console.error("Error fetching data:", error);
// // //                 setLoading(false);
// // //             }
// // //         };
// // //         fetchData();
// // //     }, []);

// // //     const getFilteredData = () => {
// // //         return data.filter((d) => {
// // //             const date = new Date(d.Date).getTime();
// // //             return date >= startDate.getTime() && date <= endDate.getTime();
// // //         });
// // //     };

// // //     useEffect(() => {
// // //         if (!loading && data.length > 0) {
// // //             const updateSummary = () => {
// // //                 if (summary !== latestSummaryRef.current) {
// // //                     setSummary(latestSummaryRef.current);
// // //                 }
// // //             };
// // //             const interval = setInterval(updateSummary, 1000);
// // //             return () => clearInterval(interval);
// // //         }
// // //     }, [loading, data, summary]);

// // //     const filteredData = getFilteredData();

// // //     const totalLine = {
// // //         name: "Total",
// // //         data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Total]),
// // //         color: isDarkMode ? "#007bff" : "#343a40",
// // //         marker: { enabled: false },
// // //         zIndex: 1,
// // //         boostThreshold: 1,
// // //     };

// // //     const shadeData = {
// // //         name: "Shaded Area",
// // //         data: filteredData.map((d) => ({
// // //             x: new Date(d.Date).getTime(),
// // //             low: Math.min(d.Total, d.Target),
// // //             high: Math.max(d.Total, d.Target),
// // //         })),
// // //         type: "arearange",
// // //         lineWidth: 0,
// // //         linkedTo: "Total",
// // //         color: "#2E8C39",
// // //         fillOpacity: 0.3,
// // //         zIndex: 0,
// // //         marker: { enabled: false },
// // //         boostThreshold: 0,
// // //         boost: false,
// // //     };

// // //     const getData = () => {
// // //         const compareData = [
// // //             ...selectedCurrencies.map((currency) => ({
// // //                 name: currency.value,
// // //                 data: filteredData.map((d) => [
// // //                     new Date(d.Date).getTime(),
// // //                     d[currency.value],
// // //                 ]),
// // //                 color: getCurrencyColor(currency.value),
// // //                 marker: { enabled: false },
// // //                 boostThreshold: 1,
// // //             })),
// // //             totalLine,
// // //             {
// // //                 name: "Target",
// // //                 data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Target]),
// // //                 color: "#007bff",
// // //                 marker: { enabled: false },
// // //                 zIndex: 1,
// // //                 boostThreshold: 1,
// // //             },
// // //             shadeData,
// // //         ];
// // //         return compareWithTarget ? compareData : compareData.slice(0, -1);
// // //     };

// // //     const getCurrencyColor = (currency) => {
// // //         switch (currency) {
// // //             case "AUD":
// // //                 return "#FFD700";
// // //             case "EUR":
// // //                 return "#FF6347";
// // //             case "GBP":
// // //                 return "#4682B4";
// // //             case "JPY":
// // //                 return "#32CD32";
// // //             case "USD":
// // //                 return "#FFA07A";
// // //             case "BRL":
// // //                 return "#9400D3";
// // //             case "CAD":
// // //                 return "#00FF00";
// // //             case "CHF":
// // //                 return "#FF00FF";
// // //             case "CLP":
// // //                 return "#00FFFF";
// // //             case "CNY":
// // //                 return "#FF4500";
// // //             case "CZK":
// // //                 return "#FF1493";
// // //             case "DKK":
// // //                 return "#1E90FF";
// // //             case "HKD":
// // //                 return "#FF69B4";
// // //             case "HUF":
// // //                 return "#8A2BE2";
// // //             case "INR":
// // //                 return "#00BFFF";
// // //             case "KRW":
// // //                 return "#7B68EE";
// // //             case "NOK":
// // //                 return "#FFD700";
// // //             case "NZD":
// // //                 return "#FF6347";
// // //             case "PLN":
// // //                 return "#4682B4";
// // //             case "SEK":
// // //                 return "#32CD32";
// // //             case "SGD":
// // //                 return "#FFA07A";
// // //             case "THB":
// // //                 return "#9400D3";
// // //             case "TWD":
// // //                 return "#00FF00";
// // //             case "ZAR":
// // //                 return "#FF00FF";
// // //             default:
// // //                 return "#FF4500";
// // //         }
// // //     };

// // //     const toggleTheme = () => {
// // //         setIsDarkMode(!isDarkMode);
// // //     };

// // //     const toggleSidebar = () => {
// // //         setSidebarOpen(!sidebarOpen);
// // //     };

// // //     return (
// // //         <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
// // //             <Topbar toggleSidebar={toggleSidebar} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
// // //             <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
// // //             <div className="graph-container">
// // //                 <h2 className="graph-title">LCH Notional | Time Series</h2>
// // //                 <div className="selectors-container">
// // //                     <div className="currency-selector">
// // //                         <label>Select Currencies:</label>
// // //                         <Selector
// // //                             options={[
// // //                                 { value: "AUD", label: "AUD" },
// // //                                 { value: "EUR", label: "EUR" },
// // //                                 { value: "GBP", label: "GBP" },
// // //                                 { value: "JPY", label: "JPY" },
// // //                                 { value: "USD", label: "USD" },
// // //                                 { value: "BRL", label: "BRL" },
// // //                                 { value: "CAD", label: "CAD" },
// // //                                 { value: "CHF", label: "CHF" },
// // //                                 { value: "CLP", label: "CLP" },
// // //                                 { value: "CNY", label: "CNY" },
// // //                                 { value: "CZK", label: "CZK" },
// // //                                 { value: "DKK", label: "DKK" },
// // //                                 { value: "HKD", label: "HKD" },
// // //                                 { value: "HUF", label: "HUF" },
// // //                                 { value: "INR", label: "INR" },
// // //                                 { value: "KRW", label: "KRW" },
// // //                                 { value: "MXN", label: "MXN" },
// // //                                 { value: "NOK", label: "NOK" },
// // //                                 { value: "NZD", label: "NZD" },
// // //                                 { value: "PLN", label: "PLN" },
// // //                                 { value: "SEK", label: "SEK" },
// // //                                 { value: "SGD", label: "SGD" },
// // //                                 { value: "THB", label: "THB" },
// // //                                 { value: "TWD", label: "TWD" },
// // //                                 { value: "ZAR", label: "ZAR" },
// // //                             ]}
// // //                             selectedCurrencies={selectedCurrencies}
// // //                             setSelectedCurrencies={setSelectedCurrencies}
// // //                         />
// // //                     </div>
// // //                     <div className="date-picker">
// // //                         <label>Select Date Range:</label>
// // //                         <DatePicker
// // //                             selected={startDate}
// // //                             onChange={(date) => setStartDate(date)}
// // //                             selectsStart
// // //                             startDate={startDate}
// // //                             endDate={endDate}
// // //                             className="date-input"
// // //                         />
// // //                         <DatePicker
// // //                             selected={endDate}
// // //                             onChange={(date) => setEndDate(date)}
// // //                             selectsEnd
// // //                             startDate={startDate}
// // //                             endDate={endDate}
// // //                             minDate={startDate}
// // //                             className="date-input"
// // //                         />
// // //                     </div>
// // //                 </div>
// // //                 <div className="main-panel">
// // //                     <HighchartsReact
// // //                         className="chart-actual"
// // //                         highcharts={Highcharts}
// // //                         options={{
// // //                             chart: {
// // //                                 type: "line",
// // //                                 zoomType: "x",
// // //                                 backgroundColor: {
// // //                                     linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
// // //                                     stops: isDarkMode
// // //                                         ? [
// // //                                             [0, "#2e2e2e"],
// // //                                             [1, "#1a1a1a"],
// // //                                         ]
// // //                                         : [
// // //                                             [0, "#ffffff"],
// // //                                             [1, "#f0f0f0"],
// // //                                         ],
// // //                                 },
// // //                                 borderRadius: 10, // Rounded corners
// // //                                 style: {
// // //                                     fontFamily: "Helvetica, Arial, sans-serif", // Font style for the chart
// // //                                 },
// // //                                 plotBorderColor: isDarkMode ? "#444444" : "#cccccc",
// // //                                 plotBorderWidth: 1,
// // //                                 events: {
// // //                                     load: function () {
// // //                                         this.xAxis[0].setExtremes(startDate.getTime(), endDate.getTime());
// // //                                     },
// // //                                 },
// // //                                 boost: {
// // //                                     useGPUTranslations: true,
// // //                                     usePreAllocated: true,
// // //                                 },
// // //                             },
// // //                             title: {
// // //                                 text: "",
// // //                                 style: {
// // //                                     color: isDarkMode ? "#ffffff" : "#000000",
// // //                                     fontSize: "22px",
// // //                                     fontWeight: "bold",
// // //                                 },
// // //                             },
// // //                             xAxis: {
// // //                                 type: "datetime",
// // //                                 title: {
// // //                                     text: "Date",
// // //                                     style: {
// // //                                         color: isDarkMode ? "#cccccc" : "#000000",
// // //                                         fontSize: "14px",
// // //                                         fontWeight: "bold",
// // //                                     },
// // //                                 },
// // //                                 lineColor: isDarkMode ? "#444444" : "#cccccc",
// // //                                 tickColor: isDarkMode ? "#444444" : "#cccccc",
// // //                                 labels: {
// // //                                     style: {
// // //                                         color: isDarkMode ? "#cccccc" : "#000000",
// // //                                         fontSize: "12px",
// // //                                     },
// // //                                 },
// // //                             },
// // //                             yAxis: {
// // //                                 title: {
// // //                                     text: "Notional (USD)",
// // //                                     style: {
// // //                                         color: isDarkMode ? "#cccccc" : "#000000",
// // //                                         fontSize: "14px",
// // //                                         fontWeight: "bold",
// // //                                     },
// // //                                 },
// // //                                 gridLineColor: isDarkMode ? "#444444" : "#cccccc",
// // //                                 labels: {
// // //                                     style: {
// // //                                         color: isDarkMode ? "#cccccc" : "#000000",
// // //                                         fontSize: "12px",
// // //                                     },
// // //                                 },
// // //                             },
// // //                             legend: {
// // //                                 layout: "horizontal",
// // //                                 align: "center",
// // //                                 verticalAlign: "bottom",
// // //                                 itemStyle: {
// // //                                     color: isDarkMode ? "#ffffff" : "#000000",
// // //                                     fontSize: "14px",
// // //                                     fontWeight: "bold",
// // //                                 },
// // //                                 itemHoverStyle: {
// // //                                     color: isDarkMode ? "#cccccc" : "#000000",
// // //                                 },
// // //                                 itemHiddenStyle: {
// // //                                     color: isDarkMode ? "#666666" : "#999999",
// // //                                 },
// // //                             },
// // //                             tooltip: {
// // //                                 shared: true,
// // //                                 backgroundColor: isDarkMode ? "rgba(33, 33, 33, 0.85)" : "rgba(255, 255, 255, 0.85)",
// // //                                 borderColor: isDarkMode ? "#666666" : "#cccccc",
// // //                                 style: {
// // //                                     color: isDarkMode ? "#ffffff" : "#000000",
// // //                                 },
// // //                                 formatter: function () {
// // //                                     const points = this.points;
// // //                                     let targetValue = null;
// // //                                     let totalValue = null;

// // //                                     points.forEach((point) => {
// // //                                         if (point.series.name === "Target") {
// // //                                             targetValue = point.y;
// // //                                         }
// // //                                         if (point.series.name === "Total") {
// // //                                             totalValue = point.y;
// // //                                         }
// // //                                     });

// // //                                     if (targetValue !== null && totalValue !== null) {
// // //                                         const difference = (totalValue - targetValue).toFixed(2);
// // //                                         const totalBreakdown = selectedCurrencies
// // //                                             .map((currency) => {
// // //                                                 const point = points.find((p) => p.series.name === currency.value);
// // //                                                 return point
// // //                                                     ? `${currency.value}: ${point.y.toFixed(2)}`
// // //                                                     : `${currency.value}: N/A`;
// // //                                             })
// // //                                             .join("<br>");

// // //                                         let summaryHTML = `<strong>Total: ${totalValue.toFixed(2)}</strong><br>`;
// // //                                         summaryHTML += `<strong>Target: ${targetValue.toFixed(2)}</strong><br>`;
// // //                                         summaryHTML += `Difference: ${difference}<br><br>`;
// // //                                         summaryHTML += `<strong>Breakdown of Selected Currencies:</strong><br>${totalBreakdown}`;

// // //                                         latestSummaryRef.current = summaryHTML;

// // //                                         return points.reduce((s, point) => {
// // //                                             return (
// // //                                                 s +
// // //                                                 `<br><span style="color:${point.series.color}">${point.series.name}</span>: ${point.y}`
// // //                                             );
// // //                                         }, `<b>${Highcharts.dateFormat("%A, %b %e, %Y", this.x)}</b>`);
// // //                                     }
// // //                                     return points.reduce((s, point) => {
// // //                                         return (
// // //                                             s +
// // //                                             `<br><span style="color:${point.series.color}">${point.series.name}</span>: ${point.y}`
// // //                                         );
// // //                                     }, `<b>${Highcharts.dateFormat("%A, %b %e, %Y", this.x)}</b>`);
// // //                                 },
// // //                             },
// // //                             series: getData(),
// // //                             navigation: {
// // //                                 buttonOptions: {
// // //                                     enabled: true,
// // //                                     theme: {
// // //                                         fill: isDarkMode ? "#444444" : "#f0f0f0",
// // //                                         stroke: isDarkMode ? "#666666" : "#cccccc",
// // //                                         style: {
// // //                                             color: isDarkMode ? "#ffffff" : "#000000",
// // //                                         },
// // //                                     },
// // //                                 },
// // //                             },
// // //                             exporting: {
// // //                                 buttons: {
// // //                                     contextButton: {
// // //                                         symbolStroke: isDarkMode ? "#cccccc" : "#000000",
// // //                                         theme: {
// // //                                             fill: isDarkMode ? "#444444" : "#f0f0f0",
// // //                                         },
// // //                                     },
// // //                                 },
// // //                             },
// // //                         }}
// // //                         containerProps={{ className: "chart-container" }}
// // //                         updateArgs={[true, true, true]}
// // //                         ref={chartRef}
// // //                     />
// // //                     {compareWithTarget && (
// // //                         <div className="summary-box">
// // //                             <div className="summary-content">
// // //                                 <span>Total: {summary.total}</span>
// // //                                 <span>Target: {summary.target}</span>
// // //                                 <span>Difference: {summary.difference}</span>
// // //                                 <div className="summary-dropdown">
// // //                                     <span className="dropdown-arrow">▼</span>
// // //                                     <div className="currency-breakdown">
// // //                                         {summary.currencyBreakdown}
// // //                                     </div>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     )}
// // //                     <div className="bottom-right-buttons">
// // //                         <button
// // //                             onClick={() => setCompareWithTarget(!compareWithTarget)}
// // //                             className="toggle-button"
// // //                         >
// // //                             {compareWithTarget ? "Disable Compare with Target" : "Enable Compare with Target"}
// // //                         </button>
// // //                         <div className="download-section">
// // //                             <button className="toggle-button">Download</button>
// // //                             <div className="dropdown-content">
// // //                                 <button
// // //                                     onClick={() =>
// // //                                         chartRef.current.chart.exportChart({ type: "image/png" })
// // //                                     }
// // //                                 >
// // //                                     PNG
// // //                                 </button>
// // //                                 <button
// // //                                     onClick={() =>
// // //                                         chartRef.current.chart.exportChart({ type: "image/jpeg" })
// // //                                     }
// // //                                 >
// // //                                     JPEG
// // //                                 </button>
// // //                                 <button
// // //                                     onClick={() =>
// // //                                         chartRef.current.chart.exportChart({ type: "application/pdf" })
// // //                                     }
// // //                                 >
// // //                                     PDF
// // //                                 </button>
// // //                                 <button
// // //                                     onClick={() =>
// // //                                         chartRef.current.chart.exportChart({ type: "image/svg+xml" })
// // //                                     }
// // //                                 >
// // //                                     SVG
// // //                                 </button>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //             <div className="data-table-section">
// // //                 <DataTable
// // //                     title="LCH Notional | Summary Table"
// // //                     columns={[
// // //                         { name: "Date", selector: (row) => row.Date, sortable: true },
// // //                         { name: "Target", selector: (row) => row.Target, sortable: true },
// // //                         ...selectedCurrencies.map((currency) => ({
// // //                             name: currency.label,
// // //                             selector: (row) => row[currency.value],
// // //                             sortable: true,
// // //                         })),
// // //                         { name: "Total", selector: (row) => row.Total, sortable: true },
// // //                     ]}
// // //                     data={filteredData.map((d) => {
// // //                         const rowData = {
// // //                             Date: d.Date,
// // //                             Target: d.Target,
// // //                             Total: d.Total,
// // //                         };
// // //                         selectedCurrencies.forEach((currency) => {
// // //                             rowData[currency.value] = d[currency.value];
// // //                         });
// // //                         return rowData;
// // //                     })}
// // //                     pagination
// // //                     highlightOnHover
// // //                     pointerOnHover
// // //                     customStyles={{
// // //                         header: {
// // //                             style: {
// // //                                 fontSize: '22px',
// // //                                 fontWeight: 'bold',
// // //                                 color: 'var(--text-color)',
// // //                                 backgroundColor: 'var(--control-bg-color)',
// // //                             },
// // //                         },
// // //                         rows: {
// // //                             style: {
// // //                                 fontSize: '16px',
// // //                                 color: 'var(--text-color)',
// // //                                 backgroundColor: 'var(--input-bg-color)',
// // //                                 '&:not(:last-of-type)': {
// // //                                     borderBottomStyle: 'solid',
// // //                                     borderBottomWidth: '1px',
// // //                                     borderBottomColor: 'var(--control-bg-color)',
// // //                                 },
// // //                             },
// // //                         },
// // //                         headCells: {
// // //                             style: {
// // //                                 fontSize: '18px',
// // //                                 fontWeight: 'bold',
// // //                                 color: 'var(--text-color)',
// // //                                 backgroundColor: 'var(--control-bg-color)',
// // //                             },
// // //                         },
// // //                         cells: {
// // //                             style: {
// // //                                 fontSize: '16px',
// // //                                 color: 'var(--text-color)',
// // //                                 backgroundColor: 'var(--input-bg-color)',
// // //                             },
// // //                         },
// // //                     }}
// // //                 />
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default Graph;
// // import React, { useState, useEffect, useRef } from "react";
// // import Highcharts from "highcharts";
// // import HighchartsReact from "highcharts-react-official";
// // import HighchartsBoost from "highcharts/modules/boost";
// // import HighchartsExporting from "highcharts/modules/exporting";
// // import HighchartsAnnotations from "highcharts/modules/annotations";
// // import HighchartsMore from "highcharts/highcharts-more";
// // import DataTable from "react-data-table-component";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import Topbar from "./Topbar";
// // import Selector from "./Selector";
// // import "../Styles/Graph.css";

// // HighchartsBoost(Highcharts);
// // HighchartsExporting(Highcharts);
// // HighchartsAnnotations(Highcharts);
// // HighchartsMore(Highcharts);

// // const Graph = () => {
// //   const [compareWithTarget, setCompareWithTarget] = useState(false);
// //   const [selectedCurrencies, setSelectedCurrencies] = useState([
// //     { value: "AUD", label: "AUD" },
// //     { value: "EUR", label: "EUR" },
// //     { value: "GBP", label: "GBP" },
// //     { value: "JPY", label: "JPY" },
// //     { value: "USD", label: "USD" }
// //   ]);
// //   const [summary, setSummary] = useState("");
// //   const [startDate, setStartDate] = useState(new Date("2022-06-01"));
// //   const [endDate, setEndDate] = useState(new Date("2024-06-25"));
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isDarkMode, setIsDarkMode] = useState(true);
// //   const latestSummaryRef = useRef("");
// //   const chartRef = useRef(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await fetch("http://localhost:5000/xva");
// //         const result = await response.json();
// //         setData(result);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   const getFilteredData = () => {
// //     return data.filter((d) => {
// //       const date = new Date(d.Date).getTime();
// //       return date >= startDate.getTime() && date <= endDate.getTime();
// //     });
// //   };

// //   useEffect(() => {
// //     if (!loading && data.length > 0) {
// //       const updateSummary = () => {
// //         if (summary !== latestSummaryRef.current) {
// //           setSummary(latestSummaryRef.current);
// //         }
// //       };
// //       const interval = setInterval(updateSummary, 1000);
// //       return () => clearInterval(interval);
// //     }
// //   }, [loading, data, summary]);

// //   const filteredData = getFilteredData();

// //   const totalLine = {
// //     name: "Total",
// //     data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Total]),
// //     color: isDarkMode ? "#007bff" : "#343a40",
// //     marker: { enabled: false },
// //     zIndex: 1,
// //     boostThreshold: 1,
// //   };

// //   const shadeData = {
// //     name: "Shaded Area",
// //     data: filteredData.map((d) => ({
// //       x: new Date(d.Date).getTime(),
// //       low: Math.min(d.Total, d.Target),
// //       high: Math.max(d.Total, d.Target),
// //     })),
// //     type: "arearange",
// //     lineWidth: 0,
// //     linkedTo: "Total",
// //     color: "#2E8C39",
// //     fillOpacity: 0.3,
// //     zIndex: 0,
// //     marker: { enabled: false },
// //     boostThreshold: 0,
// //     boost: false,
// //   };

// //   const getData = () => {
// //     const compareData = [
// //       ...selectedCurrencies.map((currency) => ({
// //         name: currency.value,
// //         data: filteredData.map((d) => [
// //           new Date(d.Date).getTime(),
// //           d[currency.value],
// //         ]),
// //         color: getCurrencyColor(currency.value),
// //         marker: { enabled: false },
// //         boostThreshold: 1,
// //       })),
// //       totalLine,
// //       {
// //         name: "Target",
// //         data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Target]),
// //         color: "#007bff",
// //         marker: { enabled: false },
// //         zIndex: 1,
// //         boostThreshold: 1,
// //       },
// //       shadeData,
// //     ];
// //     return compareWithTarget ? compareData : compareData.slice(0, -1);
// //   };

// //   const getCurrencyColor = (currency) => {
// //     switch (currency) {
// //       case "AUD":
// //         return "#FFD700";
// //       case "EUR":
// //         return "#FF6347";
// //       case "GBP":
// //         return "#4682B4";
// //       case "JPY":
// //         return "#32CD32";
// //       case "USD":
// //         return "#FFA07A";
// //       case "BRL":
// //         return "#9400D3";
// //       case "CAD":
// //         return "#00FF00";
// //       case "CHF":
// //         return "#FF00FF";
// //       case "CLP":
// //         return "#00FFFF";
// //       case "CNY":
// //         return "#FF4500";
// //       case "CZK":
// //         return "#FF1493";
// //       case "DKK":
// //         return "#1E90FF";
// //       case "HKD":
// //         return "#FF69B4";
// //       case "HUF":
// //         return "#8A2BE2";
// //       case "INR":
// //         return "#00BFFF";
// //       case "KRW":
// //         return "#7B68EE";
// //       case "NOK":
// //         return "#FFD700";
// //       case "NZD":
// //         return "#FF6347";
// //       case "PLN":
// //         return "#4682B4";
// //       case "SEK":
// //         return "#32CD32";
// //       case "SGD":
// //         return "#FFA07A";
// //       case "THB":
// //         return "#9400D3";
// //       case "TWD":
// //         return "#00FF00";
// //       case "ZAR":
// //         return "#FF00FF";
// //       default:
// //         return "#FF4500";
// //     }
// //   };

// //   const formatNumber = (number) => {
// //     return new Intl.NumberFormat('en-US', {
// //       minimumFractionDigits: 0,
// //       maximumFractionDigits: 0
// //     }).format(number);
// //   };

// //   const toggleTheme = () => {
// //     setIsDarkMode(!isDarkMode);
// //   };

// //   return (
// //     <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
// //       <Topbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
// //       <div className="graph-container">
// //         <h2 className="graph-title">LCH Notional | Time Series</h2>
// //         <div className="selectors-container">
// //           <div className="currency-selector">
// //             <label>Select Currencies:</label>
// //             <Selector
// //               options={[
// //                 { value: "AUD", label: "AUD" },
// //                 { value: "EUR", label: "EUR" },
// //                 { value: "GBP", label: "GBP" },
// //                 { value: "JPY", label: "JPY" },
// //                 { value: "USD", label: "USD" },
// //                 { value: "BRL", label: "BRL" },
// //                 { value: "CAD", label: "CAD" },
// //                 { value: "CHF", label: "CHF" },
// //                 { value: "CLP", label: "CLP" },
// //                 { value: "CNY", label: "CNY" },
// //                 { value: "CZK", label: "CZK" },
// //                 { value: "DKK", label: "DKK" },
// //                 { value: "HKD", label: "HKD" },
// //                 { value: "HUF", label: "HUF" },
// //                 { value: "INR", label: "INR" },
// //                 { value: "KRW", label: "KRW" },
// //                 { value: "MXN", label: "MXN" },
// //                 { value: "NOK", label: "NOK" },
// //                 { value: "NZD", label: "NZD" },
// //                 { value: "PLN", label: "PLN" },
// //                 { value: "SEK", label: "SEK" },
// //                 { value: "SGD", label: "SGD" },
// //                 { value: "THB", label: "THB" },
// //                 { value: "TWD", label: "TWD" },
// //                 { value: "ZAR", label: "ZAR" },
// //               ]}
// //               selectedCurrencies={selectedCurrencies}
// //               setSelectedCurrencies={setSelectedCurrencies}
// //             />
// //           </div>
// //           <div className="date-picker">
// //             <label>Select Date Range:</label>
// //             <DatePicker
// //               selected={startDate}
// //               onChange={(date) => setStartDate(date)}
// //               selectsStart
// //               startDate={startDate}
// //               endDate={endDate}
// //               className="date-input"
// //             />
// //             <DatePicker
// //               selected={endDate}
// //               onChange={(date) => setEndDate(date)}
// //               selectsEnd
// //               startDate={startDate}
// //               endDate={endDate}
// //               minDate={startDate}
// //               className="date-input"
// //             />
// //           </div>
// //         </div>
// //         <div className="main-panel">
// //           <HighchartsReact
// //             className="chart-actual"
// //             highcharts={Highcharts}
// //             options={{
// //               chart: {
// //                 type: "line",
// //                 zoomType: "x",
// //                 backgroundColor: {
// //                   linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
// //                   stops: isDarkMode
// //                     ? [
// //                         [0, "#2e2e2e"],
// //                         [1, "#1a1a1a"],
// //                       ]
// //                     : [
// //                         [0, "#ffffff"],
// //                         [1, "#f0f0f0"],
// //                       ],
// //                 },
// //                 borderRadius: 10, // Rounded corners
// //                 style: {
// //                   fontFamily: "Helvetica, Arial, sans-serif", // Font style for the chart
// //                 },
// //                 plotBorderColor: isDarkMode ? "#444444" : "#cccccc",
// //                 plotBorderWidth: 1,
// //                 events: {
// //                   load: function () {
// //                     this.xAxis[0].setExtremes(startDate.getTime(), endDate.getTime());
// //                   },
// //                 },
// //                 boost: {
// //                   useGPUTranslations: true,
// //                   usePreAllocated: true,
// //                 },
// //               },
// //               title: {
// //                 text: "",
// //                 style: {
// //                   color: isDarkMode ? "#ffffff" : "#000000",
// //                   fontSize: "22px",
// //                   fontWeight: "bold",
// //                 },
// //               },
// //               xAxis: {
// //                 type: "datetime",
// //                 title: {
// //                   text: "Date",
// //                   style: {
// //                     color: isDarkMode ? "#cccccc" : "#000000",
// //                     fontSize: "14px",
// //                     fontWeight: "bold",
// //                   },
// //                 },
// //                 lineColor: isDarkMode ? "#444444" : "#cccccc",
// //                 tickColor: isDarkMode ? "#444444" : "#cccccc",
// //                 labels: {
// //                   style: {
// //                     color: isDarkMode ? "#cccccc" : "#000000",
// //                     fontSize: "12px",
// //                   },
// //                 },
// //               },
// //               yAxis: {
// //                 title: {
// //                   text: "Notional (USD)",
// //                   style: {
// //                     color: isDarkMode ? "#cccccc" : "#000000",
// //                     fontSize: "14px",
// //                     fontWeight: "bold",
// //                   },
// //                 },
// //                 gridLineColor: isDarkMode ? "#444444" : "#cccccc",
// //                 labels: {
// //                   style: {
// //                     color: isDarkMode ? "#cccccc" : "#000000",
// //                     fontSize: "12px",
// //                   },
// //                 },
// //               },
// //               legend: {
// //                 layout: "horizontal",
// //                 align: "center",
// //                 verticalAlign: "bottom",
// //                 itemStyle: {
// //                   color: isDarkMode ? "#ffffff" : "#000000",
// //                   fontSize: "14px",
// //                   fontWeight: "bold",
// //                 },
// //                 itemHoverStyle: {
// //                   color: isDarkMode ? "#cccccc" : "#000000",
// //                 },
// //                 itemHiddenStyle: {
// //                   color: isDarkMode ? "#666666" : "#999999",
// //                 },
// //               },
// //               tooltip: {
// //                 shared: true,
// //                 backgroundColor: isDarkMode ? "rgba(33, 33, 33, 0.85)" : "rgba(255, 255, 255, 0.85)",
// //                 borderColor: isDarkMode ? "#666666" : "#cccccc",
// //                 style: {
// //                   color: isDarkMode ? "#ffffff" : "#000000",
// //                 },
// //                 formatter: function () {
// //                   const points = this.points;
// //                   let targetValue = null;
// //                   let totalValue = null;

// //                   points.forEach((point) => {
// //                     if (point.series.name === "Target") {
// //                       targetValue = point.y;
// //                     }
// //                     if (point.series.name === "Total") {
// //                       totalValue = point.y;
// //                     }
// //                   });

// //                   if (targetValue !== null && totalValue !== null) {
// //                     const difference = formatNumber(totalValue - targetValue);
// //                     const totalBreakdown = selectedCurrencies
// //                       .map((currency) => {
// //                         const point = points.find((p) => p.series.name === currency.value);
// //                         return point
// //                           ? `${currency.value}: ${formatNumber(point.y)}`
// //                           : `${currency.value}: N/A`;
// //                       })
// //                       .join("<br>");

// //                     let summaryHTML = `<strong>Total: ${formatNumber(totalValue)}</strong><br>`;
// //                     summaryHTML += `<strong>Target: ${formatNumber(targetValue)}</strong><br>`;
// //                     summaryHTML += `Difference: ${difference}<br><br>`;
// //                     summaryHTML += `<strong>Breakdown of Selected Currencies:</strong><br>${totalBreakdown}`;

// //                     latestSummaryRef.current = summaryHTML;

// //                     return points.reduce((s, point) => {
// //                       return (
// //                         s +
// //                         `<br><span style="color:${point.series.color}">${point.series.name}</span>: ${formatNumber(point.y)}`
// //                       );
// //                     }, `<b>${Highcharts.dateFormat("%A, %b %e, %Y", this.x)}</b>`);
// //                   }
// //                   return points.reduce((s, point) => {
// //                     return (
// //                       s +
// //                       `<br><span style="color:${point.series.color}">${point.series.name}</span>: ${formatNumber(point.y)}`
// //                     );
// //                   }, `<b>${Highcharts.dateFormat("%A, %b %e, %Y", this.x)}</b>`);
// //                 },
// //               },
// //               series: getData(),
// //               navigation: {
// //                 buttonOptions: {
// //                   enabled: true,
// //                   theme: {
// //                     fill: isDarkMode ? "#444444" : "#f0f0f0",
// //                     stroke: isDarkMode ? "#666666" : "#cccccc",
// //                     style: {
// //                       color: isDarkMode ? "#ffffff" : "#000000",
// //                     },
// //                   },
// //                 },
// //               },
// //               exporting: {
// //                 buttons: {
// //                   contextButton: {
// //                     symbolStroke: isDarkMode ? "#cccccc" : "#000000",
// //                     theme: {
// //                       fill: isDarkMode ? "#444444" : "#f0f0f0",
// //                     },
// //                   },
// //                 },
// //               },
// //             }}
// //             containerProps={{ className: "chart-container" }}
// //             updateArgs={[true, true, true]}
// //             ref={chartRef}
// //           />
// //           {compareWithTarget && (
// //             <div className="summary-box">
// //               <h3>Summary</h3>
// //               <div dangerouslySetInnerHTML={{ __html: summary }} />
// //             </div>
// //           )}
// //           <div className="bottom-right-buttons">
// //             <button
// //               onClick={() => setCompareWithTarget(!compareWithTarget)}
// //               className="toggle-button"
// //             >
// //               {compareWithTarget ? "Disable Compare with Target" : "Enable Compare with Target"}
// //             </button>
// //             <div className="download-section">
// //               <button className="toggle-button">Download</button>
// //               <div className="dropdown-content">
// //                 <button
// //                   onClick={() =>
// //                     chartRef.current.chart.exportChart({ type: "image/png" })
// //                   }
// //                 >
// //                   PNG
// //                 </button>
// //                 <button
// //                   onClick={() =>
// //                     chartRef.current.chart.exportChart({ type: "image/jpeg" })
// //                   }
// //                 >
// //                   JPEG
// //                 </button>
// //                 <button
// //                   onClick={() =>
// //                     chartRef.current.chart.exportChart({ type: "application/pdf" })
// //                   }
// //                 >
// //                   PDF
// //                 </button>
// //                 <button
// //                   onClick={() =>
// //                     chartRef.current.chart.exportChart({ type: "image/svg+xml" })
// //                   }
// //                 >
// //                   SVG
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="data-table-section">
// //         <DataTable
// //           title="LCH Notional | Summary Table"
// //           columns={[
// //             { name: "Date", selector: (row) => row.Date, sortable: true },
// //             { name: "Target", selector: (row) => formatNumber(row.Target), sortable: true },
// //             ...selectedCurrencies.map((currency) => ({
// //               name: currency.label,
// //               selector: (row) => formatNumber(row[currency.value]),
// //               sortable: true,
// //             })),
// //             { name: "Total", selector: (row) => formatNumber(row.Total), sortable: true },
// //           ]}
// //           data={filteredData.map((d) => {
// //             const rowData = {
// //               Date: d.Date,
// //               Target: d.Target,
// //               Total: d.Total,
// //             };
// //             selectedCurrencies.forEach((currency) => {
// //               rowData[currency.value] = d[currency.value];
// //             });
// //             return rowData;
// //           })}
// //           pagination
// //           highlightOnHover
// //           pointerOnHover
// //           customStyles={{
// //             header: {
// //               style: {
// //                 fontSize: '22px',
// //                 fontWeight: 'bold',
// //                 color: 'var(--text-color)',
// //                 backgroundColor: 'var(--control-bg-color)',
// //               },
// //             },
// //             rows: {
// //               style: {
// //                 fontSize: '16px',
// //                 color: 'var(--text-color)',
// //                 backgroundColor: 'var(--input-bg-color)',
// //                 '&:not(:last-of-type)': {
// //                   borderBottomStyle: 'solid',
// //                   borderBottomWidth: '1px',
// //                   borderBottomColor: 'var(--control-bg-color)',
// //                 },
// //               },
// //             },
// //             headCells: {
// //               style: {
// //                 fontSize: '18px',
// //                 fontWeight: 'bold',
// //                 color: 'var(--text-color)',
// //                 backgroundColor: 'var(--control-bg-color)',
// //               },
// //             },
// //             cells: {
// //               style: {
// //                 fontSize: '16px',
// //                 color: 'var(--text-color)',
// //                 backgroundColor: 'var(--input-bg-color)',
// //               },
// //             },
// //           }}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Graph;
// import React, { useState, useEffect, useRef } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import HighchartsBoost from "highcharts/modules/boost";
// import HighchartsExporting from "highcharts/modules/exporting";
// import HighchartsAnnotations from "highcharts/modules/annotations";
// import HighchartsMore from "highcharts/highcharts-more";
// import DataTable from "react-data-table-component";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Topbar from "./Topbar";
// import Selector from "./Selector";
// import "../Styles/Graph.css";

// HighchartsBoost(Highcharts);
// HighchartsExporting(Highcharts);
// HighchartsAnnotations(Highcharts);
// HighchartsMore(Highcharts);

// const Graph = () => {
//   const [compareWithTarget, setCompareWithTarget] = useState(false);
//   const [selectedCurrencies, setSelectedCurrencies] = useState([
//     { value: "AUD", label: "AUD" },
//     { value: "EUR", label: "EUR" },
//     { value: "GBP", label: "GBP" },
//     { value: "JPY", label: "JPY" },
//     { value: "USD", label: "USD" }
//   ]);
//   const [summary, setSummary] = useState("");
//   const [startDate, setStartDate] = useState(new Date("2022-06-01"));
//   const [endDate, setEndDate] = useState(new Date("2024-06-25"));
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const latestSummaryRef = useRef("");
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/xva");
//         const result = await response.json();
//         setData(result);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const getFilteredData = () => {
//     return data.filter((d) => {
//       const date = new Date(d.Date).getTime();
//       return date >= startDate.getTime() && date <= endDate.getTime();
//     });
//   };

//   useEffect(() => {
//     if (!loading && data.length > 0) {
//       const updateSummary = () => {
//         if (summary !== latestSummaryRef.current) {
//           setSummary(latestSummaryRef.current);
//         }
//       };
//       const interval = setInterval(updateSummary, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [loading, data, summary]);

//   const filteredData = getFilteredData();

//   const totalLine = {
//     name: "Total",
//     data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Total]),
//     color: isDarkMode ? "#007bff" : "#343a40",
//     marker: { enabled: false },
//     zIndex: 1,
//     boostThreshold: 1,
//   };

//   const shadeData = {
//     name: "Shaded Area",
//     data: filteredData.map((d) => ({
//       x: new Date(d.Date).getTime(),
//       low: Math.min(d.Total, d.Target),
//       high: Math.max(d.Total, d.Target),
//     })),
//     type: "arearange",
//     lineWidth: 0,
//     linkedTo: "Total",
//     color: "#2E8C39",
//     fillOpacity: 0.3,
//     zIndex: 0,
//     marker: { enabled: false },
//     boostThreshold: 0,
//     boost: false,
//   };

//   const getData = () => {
//     const compareData = [
//       ...selectedCurrencies.map((currency) => ({
//         name: currency.value,
//         data: filteredData.map((d) => [
//           new Date(d.Date).getTime(),
//           d[currency.value],
//         ]),
//         color: getCurrencyColor(currency.value),
//         marker: { enabled: false },
//         boostThreshold: 1,
//       })),
//       totalLine,
//       {
//         name: "Target",
//         data: filteredData.map((d) => [new Date(d.Date).getTime(), d.Target]),
//         color: "#007bff",
//         marker: { enabled: false },
//         zIndex: 1,
//         boostThreshold: 1,
//       },
//       shadeData,
//     ];
//     return compareWithTarget ? compareData : compareData.slice(0, -1);
//   };

//   const getCurrencyColor = (currency) => {
//     switch (currency) {
//       case "AUD":
//         return "#FFD700";
//       case "EUR":
//         return "#FF6347";
//       case "GBP":
//         return "#4682B4";
//       case "JPY":
//         return "#32CD32";
//       case "USD":
//         return "#FFA07A";
//       case "BRL":
//         return "#9400D3";
//       case "CAD":
//         return "#00FF00";
//       case "CHF":
//         return "#FF00FF";
//       case "CLP":
//         return "#00FFFF";
//       case "CNY":
//         return "#FF4500";
//       case "CZK":
//         return "#FF1493";
//       case "DKK":
//         return "#1E90FF";
//       case "HKD":
//         return "#FF69B4";
//       case "HUF":
//         return "#8A2BE2";
//       case "INR":
//         return "#00BFFF";
//       case "KRW":
//         return "#7B68EE";
//       case "NOK":
//         return "#FFD700";
//       case "NZD":
//         return "#FF6347";
//       case "PLN":
//         return "#4682B4";
//       case "SEK":
//         return "#32CD32";
//       case "SGD":
//         return "#FFA07A";
//       case "THB":
//         return "#9400D3";
//       case "TWD":
//         return "#00FF00";
//       case "ZAR":
//         return "#FF00FF";
//       default:
//         return "#FF4500";
//     }
//   };

//   const formatNumber = (number) => {
//     return new Intl.NumberFormat('en-US', {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(number);
//   };

//   const handleDownloadTable = () => {
//     // Implement the logic to download the table data
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
//       <Topbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
//       <div className="graph-container">
//         <h2 className="graph-title">LCH Notional | Time Series</h2>
//         <div className="selectors-container">
//           <div className="currency-selector">
//             <label>Select Currencies:</label>
//             <Selector
//               options={[
//                 { value: "AUD", label: "AUD" },
//                 { value: "EUR", label: "EUR" },
//                 { value: "GBP", label: "GBP" },
//                 { value: "JPY", label: "JPY" },
//                 { value: "USD", label: "USD" },
//                 { value: "BRL", label: "BRL" },
//                 { value: "CAD", label: "CAD" },
//                 { value: "CHF", label: "CHF" },
//                 { value: "CLP", label: "CLP" },
//                 { value: "CNY", label: "CNY" },
//                 { value: "CZK", label: "CZK" },
//                 { value: "DKK", label: "DKK" },
//                 { value: "HKD", label: "HKD" },
//                 { value: "HUF", label: "HUF" },
//                 { value: "INR", label: "INR" },
//                 { value: "KRW", label: "KRW" },
//                 { value: "MXN", label: "MXN" },
//                 { value: "NOK", label: "NOK" },
//                 { value: "NZD", label: "NZD" },
//                 { value: "PLN", label: "PLN" },
//                 { value: "SEK", label: "SEK" },
//                 { value: "SGD", label: "SGD" },
//                 { value: "THB", label: "THB" },
//                 { value: "TWD", label: "TWD" },
//                 { value: "ZAR", label: "ZAR" },
//               ]}
//               selectedCurrencies={selectedCurrencies}
//               setSelectedCurrencies={setSelectedCurrencies}
//             />
//           </div>
//           <div className="date-picker">
//             <label>Select Date Range:</label>
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//               className="date-input"
//             />
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               minDate={startDate}
//               className="date-input"
//             />
//           </div>
//         </div>
//         <div className="main-panel">
//           <HighchartsReact
//             className="chart-actual"
//             highcharts={Highcharts}
//             options={{
//               chart: {
//                 type: "line",
//                 zoomType: "x",
//                 backgroundColor: {
//                   linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
//                   stops: isDarkMode
//                     ? [
//                         [0, "#2e2e2e"],
//                         [1, "#1a1a1a"],
//                       ]
//                     : [
//                         [0, "#ffffff"],
//                         [1, "#f0f0f0"],
//                       ],
//                 },
//                 borderRadius: 10, // Rounded corners
//                 style: {
//                   fontFamily: "Helvetica, Arial, sans-serif", // Font style for the chart
//                 },
//                 plotBorderColor: isDarkMode ? "#444444" : "#cccccc",
//                 plotBorderWidth: 1,
//                 events: {
//                   load: function () {
//                     this.xAxis[0].setExtremes(startDate.getTime(), endDate.getTime());
//                   },
//                 },
//                 boost: {
//                   useGPUTranslations: true,
//                   usePreAllocated: true,
//                 },
//               },
//               title: {
//                 text: "",
//                 style: {
//                   color: isDarkMode ? "#ffffff" : "#000000",
//                   fontSize: "22px",
//                   fontWeight: "bold",
//                 },
//               },
//               xAxis: {
//                 type: "datetime",
//                 title: {
//                   text: "Date",
//                   style: {
//                     color: isDarkMode ? "#cccccc" : "#000000",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                   },
//                 },
//                 lineColor: isDarkMode ? "#444444" : "#cccccc",
//                 tickColor: isDarkMode ? "#444444" : "#cccccc",
//                 labels: {
//                   style: {
//                     color: isDarkMode ? "#cccccc" : "#000000",
//                     fontSize: "12px",
//                   },
//                 },
//               },
//               yAxis: {
//                 title: {
//                   text: "Notional (USD)",
//                   style: {
//                     color: isDarkMode ? "#cccccc" : "#000000",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                   },
//                 },
//                 gridLineColor: isDarkMode ? "#444444" : "#cccccc",
//                 labels: {
//                   style: {
//                     color: isDarkMode ? "#cccccc" : "#000000",
//                     fontSize: "12px",
//                   },
//                 },
//               },
//               legend: {
//                 layout: "horizontal",
//                 align: "center",
//                 verticalAlign: "bottom",
//                 itemStyle: {
//                   color: isDarkMode ? "#ffffff" : "#000000",
//                   fontSize: "14px",
//                   fontWeight: "bold",
//                 },
//                 itemHoverStyle: {
//                   color: isDarkMode ? "#cccccc" : "#000000",
//                 },
//                 itemHiddenStyle: {
//                   color: isDarkMode ? "#666666" : "#999999",
//                 },
//               },
//               tooltip: {
//                 shared: true,
//                 backgroundColor: isDarkMode ? "rgba(33, 33, 33, 0.85)" : "rgba(255, 255, 255, 0.85)",
//                 borderColor: isDarkMode ? "#666666" : "#cccccc",
//                 style: {
//                   color: isDarkMode ? "#ffffff" : "#000000",
//                 },
//                 formatter: function () {
//                   const points = this.points;
//                   let targetValue = null;
//                   let totalValue = null;

//                   points.forEach((point) => {
//                     if (point.series.name === "Target") {
//                       targetValue = point.y;
//                     }
//                     if (point.series.name === "Total") {
//                       totalValue = point.y;
//                     }
//                   });

//                   if (targetValue !== null && totalValue !== null) {
//                     const difference = formatNumber(totalValue - targetValue);
//                     const totalBreakdown = selectedCurrencies
//                       .map((currency) => {
//                         const point = points.find((p) => p.series.name === currency.value);
//                         return point
//                           ? `${currency.value}: ${formatNumber(point.y)}`
//                           : `${currency.value}: N/A`;
//                       })
//                       .join("<br>");

//                     let summaryHTML = `<strong>Total: ${formatNumber(totalValue)}</strong><br>`;
//                     summaryHTML += `<strong>Target: ${formatNumber(targetValue)}</strong><br>`;
//                     summaryHTML += `Difference: ${difference}<br><br>`;
//                     summaryHTML += `<strong>Breakdown of Selected Currencies:</strong><br>${totalBreakdown}`;

//                     latestSummaryRef.current = summaryHTML;

//                     return points.reduce((s, point) => {
//                       return (
//                         s +
//                         `<br><span style="color:${point.series.color}">${point.series.name}</span>: ${formatNumber(point.y)}`
//                       );
//                     }, `<b>${Highcharts.dateFormat("%A, %b %e, %Y", this.x)}</b>`);
//                   }
//                   return points.reduce((s, point) => {
//                     return (
//                       s +
//                       `<br><span style="color:${point.series.color}">${point.series.name}</span>: ${formatNumber(point.y)}`
//                     );
//                   }, `<b>${Highcharts.dateFormat("%A, %b %e, %Y", this.x)}</b>`);
//                 },
//               },
//               series: getData(),
//               navigation: {
//                 buttonOptions: {
//                   enabled: true,
//                   theme: {
//                     fill: isDarkMode ? "#444444" : "#f0f0f0",
//                     stroke: isDarkMode ? "#666666" : "#cccccc",
//                     style: {
//                       color: isDarkMode ? "#ffffff" : "#000000",
//                     },
//                   },
//                 },
//               },
//               exporting: {
//                 buttons: {
//                   contextButton: {
//                     symbolStroke: isDarkMode ? "#cccccc" : "#000000",
//                     theme: {
//                       fill: isDarkMode ? "#444444" : "#f0f0f0",
//                     },
//                   },
//                 },
//               },
//             }}
//             containerProps={{ className: "chart-container" }}
//             updateArgs={[true, true, true]}
//             ref={chartRef}
//           />
//           {compareWithTarget && (
//             <div className="summary-box">
//               <h3>Summary</h3>
//               <div dangerouslySetInnerHTML={{ __html: summary }} />
//             </div>
//           )}
//           <div className="bottom-right-buttons">
//             <button
//               onClick={() => setCompareWithTarget(!compareWithTarget)}
//               className="toggle-button"
//             >
//               {compareWithTarget ? "Disable Compare with Target" : "Enable Compare with Target"}
//             </button>
//             <div className="download-section">
//               <button className="toggle-button">Download</button>
//               <div className="dropdown-content">
//                 <button
//                   onClick={() =>
//                     chartRef.current.chart.exportChart({ type: "image/png" })
//                   }
//                 >
//                   PNG
//                 </button>
//                 <button
//                   onClick={() =>
//                     chartRef.current.chart.exportChart({ type: "image/jpeg" })
//                   }
//                 >
//                   JPEG
//                 </button>
//                 <button
//                   onClick={() =>
//                     chartRef.current.chart.exportChart({ type: "application/pdf" })
//                   }
//                 >
//                   PDF
//                 </button>
//                 <button
//                   onClick={() =>
//                     chartRef.current.chart.exportChart({ type: "image/svg+xml" })
//                   }
//                 >
//                   SVG
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="table-component">
//         <h2 className="table-title">LCH Notional | Summary Table</h2>
//         <div className="data-table-section">
//           <DataTable
//             columns={[
//               { name: "Date", selector: (row) => row.Date, sortable: true },
//               { name: "Target", selector: (row) => formatNumber(row.Target), sortable: true },
//               ...selectedCurrencies.map((currency) => ({
//                 name: currency.label,
//                 selector: (row) => formatNumber(row[currency.value]),
//                 sortable: true,
//               })),
//               { name: "Total", selector: (row) => formatNumber(row.Total), sortable: true },
//             ]}
//             data={filteredData.map((d) => {
//               const rowData = {
//                 Date: d.Date,
//                 Target: d.Target,
//                 Total: d.Total,
//               };
//               selectedCurrencies.forEach((currency) => {
//                 rowData[currency.value] = d[currency.value];
//               });
//               return rowData;
//             })}
//             pagination
//             highlightOnHover
//             pointerOnHover
//             customStyles={{
//               header: {
//                 style: {
//                   fontSize: '24px', // Bigger font size for headers
//                   fontWeight: 'bold',
//                   color: 'var(--text-color)',
//                   backgroundColor: 'var(--control-bg-color)',
//                 },
//               },
//               rows: {
//                 style: {
//                   fontSize: '16px',
//                   color: 'var(--text-color)',
//                   backgroundColor: 'var(--row-bg-color)',
//                   '&:nth-of-type(odd)': {
//                     backgroundColor: 'var(--row-alt-bg-color)',
//                   },
//                   '&:nth-of-type(even)': {
//                     backgroundColor: 'var(--row-bg-color)',
//                   },
//                   borderBottomStyle: 'solid',
//                   borderBottomWidth: '1px',
//                   borderBottomColor: 'var(--control-bg-color)',
//                 },
//               },
//               headCells: {
//                 style: {
//                   fontSize: '18px',
//                   fontWeight: 'bold',
//                   color: 'var(--text-color)',
//                   backgroundColor: 'var(--control-bg-color)',
//                   borderBottomStyle: 'solid',
//                   borderBottomWidth: '1px',
//                   borderBottomColor: 'var(--control-bg-color)',
//                 },
//               },
//               cells: {
//                 style: {
//                   fontSize: '16px',
//                   color: 'var(--text-color)',
//                   backgroundColor: 'var(--input-bg-color)',
//                   borderRightStyle: 'solid',
//                   borderRightWidth: '1px',
//                   borderRightColor: 'var(--control-bg-color)',
//                 },
//               },
//             }}
//           />
//           <div className="bottom-right-buttons">
//             <button onClick={handleDownloadTable} className="toggle-button">
//               Download Table
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Graph;

import React, { useState, useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsBoost from "highcharts/modules/boost";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAnnotations from "highcharts/modules/annotations";
import HighchartsMore from "highcharts/highcharts-more";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Topbar from "./Topbar";
import Selector from "./Selector";
import "../Styles/Graph.css";

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
    { value: "USD", label: "USD" }
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
            <Selector
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
              selectedCurrencies={selectedCurrencies}
              setSelectedCurrencies={setSelectedCurrencies}
            />
          </div>
          <div className="date-picker">
            <label>Select Date Range:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="date-input"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="date-input"
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
          <DataTable
            columns={[
              { name: "Date", selector: (row) => row.Date, sortable: true },
              { name: "Target", selector: (row) => formatNumber(row.Target), sortable: true },
              ...selectedCurrencies.map((currency) => ({
                name: currency.label,
                selector: (row) => formatNumber(row[currency.value]),
                sortable: true,
              })),
              { name: "Total", selector: (row) => formatNumber(row.Total), sortable: true },
            ]}
            data={filteredData.map((d) => {
              const rowData = {
                Date: d.Date,
                Target: d.Target,
                Total: d.Total,
              };
              selectedCurrencies.forEach((currency) => {
                rowData[currency.value] = d[currency.value];
              });
              return rowData;
            })}
            pagination
            highlightOnHover
            pointerOnHover
            customStyles={{
              header: {
                style: {
                  fontSize: '20px', // Bigger font size for header
                  fontWeight: 'bold',
                  color: 'var(--text-color)',
                  backgroundColor: 'var(--control-bg-color)',
                },
              },
              rows: {
                style: {
                  fontSize: '16px',
                  color: 'var(--text-color)',
                  backgroundColor: 'var(--input-bg-color)',
                  '&:not(:last-of-type)': {
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px',
                    borderBottomColor: 'var(--control-bg-color)',
                  },
                },
              },
              headCells: {
                style: {
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'var(--text-color)',
                  backgroundColor: 'var(--control-bg-color)',
                },
              },
              cells: {
                style: {
                  fontSize: '16px',
                  color: 'var(--text-color)',
                  backgroundColor: 'var(--input-bg-color)',
                  borderRight: '1px solid var(--control-bg-color)', // Add right border for distinct columns
                },
              },
            }}
          />
          </div>
          <div className="bottom-right-buttons">
            <button className="toggle-button">Download Table</button>
          </div>

      </div>
    </div>
  );
};

export default Graph;


