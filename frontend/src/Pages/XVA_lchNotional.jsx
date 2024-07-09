// // import React, { useState, useEffect } from "react";
// // import Graph from "../Components/Graph_component";
// // import Table from "../Components/Table_component";
// // import Topbar from "../Components/Topbar";
// // import "../Styles/Graph.css";

// // const XVA_lchNotional = () => {
// //   const [isDarkMode, setIsDarkMode] = useState(true);
// //   const [selectedCurrencies, setSelectedCurrencies] = useState([
// //     { value: "AUD", label: "AUD" },
// //     { value: "EUR", label: "EUR" },
// //     { value: "GBP", label: "GBP" },
// //     { value: "JPY", label: "JPY" },
// //     { value: "USD", label: "USD" }
// //   ]);
// //   const [startDate, setStartDate] = useState(new Date("2022-06-01"));
// //   const [endDate, setEndDate] = useState(new Date("2024-06-25"));
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);

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

// //   const filteredData = getFilteredData();

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
// //       <Graph
// //         isDarkMode={isDarkMode}
// //         selectedCurrencies={selectedCurrencies}
// //         setSelectedCurrencies={setSelectedCurrencies}
// //         startDate={startDate}
// //         setStartDate={setStartDate}
// //         endDate={endDate}
// //         setEndDate={setEndDate}
// //         data={data}
// //       />
// //       <Table
// //         isDarkMode={isDarkMode}
// //         selectedCurrencies={selectedCurrencies}
// //         filteredData={filteredData}
// //         formatNumber={formatNumber}
// //       />
// //     </div>
// //   );
// // };

// // export default XVA_lchNotional;

// import React, { useState, useEffect } from "react";
// import Graph from "../Components/Graph_component";
// import Table from "../Components/Table_component";
// import Topbar from "../Components/Topbar";
// import "../Styles/Graph.css";

// const XvaNotional = () => {
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [selectedCurrencies, setSelectedCurrencies] = useState([
//     { value: "AUD", label: "AUD" },
//     { value: "EUR", label: "EUR" },
//     { value: "GBP", label: "GBP" },
//     { value: "JPY", label: "JPY" },
//     { value: "USD", label: "USD" }
//   ]);
//   const [startDate, setStartDate] = useState(new Date("2022-06-01"));
//   const [endDate, setEndDate] = useState(new Date("2024-06-25"));
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [summary, setSummary] = useState("");

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

//   const filteredData = getFilteredData();

//   const formatNumber = (number) => {
//     return new Intl.NumberFormat('en-US', {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(number);
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
//       <Topbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
//       <Graph
//         isDarkMode={isDarkMode}
//         selectedCurrencies={selectedCurrencies}
//         setSelectedCurrencies={setSelectedCurrencies}
//         startDate={startDate}
//         setStartDate={setStartDate}
//         endDate={endDate}
//         setEndDate={setEndDate}
//         data={data}
//         summary={summary}
//         setSummary={setSummary}
//       />
//       <Table
//         isDarkMode={isDarkMode}
//         selectedCurrencies={selectedCurrencies}
//         filteredData={filteredData}
//         formatNumber={formatNumber}
//       />
//     </div>
//   );
// };

// export default XvaNotional;

import React, { useState, useEffect } from "react";
import Graph from "../Components/Graph_component";
import Table from "../Components/Table_component";
import Topbar from "../Components/Topbar";
import "../Styles/Graph2.css";

const XVA_lchNotional = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    { value: "AUD", label: "AUD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "JPY", label: "JPY" },
    { value: "USD", label: "USD" }
  ]);
  const [startDate, setStartDate] = useState(new Date("2022-06-01"));
  const [endDate, setEndDate] = useState(new Date("2024-06-25"));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("");

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

  const filteredData = getFilteredData();

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
      <Graph
        isDarkMode={isDarkMode}
        selectedCurrencies={selectedCurrencies}
        setSelectedCurrencies={setSelectedCurrencies}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        data={data}
        summary={summary}
        setSummary={setSummary}
      />
      <Table
        isDarkMode={isDarkMode}
        selectedCurrencies={selectedCurrencies}
        filteredData={filteredData}
        formatNumber={formatNumber}
      />
    </div>
  );
};

export default XVA_lchNotional;
