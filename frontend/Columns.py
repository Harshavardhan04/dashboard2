const getColumns = (selectedCurrencies) => {
  const baseColumns = [
    {
      field: "Date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "Target",
      headerName: "Target",
      flex: 1,
      valueFormatter: (params) => formatNumber(params.value),
    },
  ];

  const currencyColumns = selectedCurrencies.map((currency) => ({
    field: currency.value,
    headerName: currency.label,
    flex: 1,
    valueFormatter: (params) => formatNumber(params.value),
  }));

  return [
    ...baseColumns,
    ...currencyColumns,
    {
      field: "Total",
      headerName: "Total",
      flex: 1,
      valueFormatter: (params) => formatNumber(params.value),
    },
  ];
};


const getRows = (filteredData, selectedCurrencies) => {
  return filteredData.map((d) => {
    const rowData = {
      id: d.Date, // Ensure each row has a unique id
      Date: d.Date,
      Target: d.Target,
      Total: d.Total,
    };

    selectedCurrencies.forEach((currency) => {
      rowData[currency.value] = d[currency.value];
    });

    return rowData;
  });
};
