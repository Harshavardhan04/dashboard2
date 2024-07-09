import React from "react";
import DataTable from "react-data-table-component";
import "../Styles/Graph2.css";

const Table = ({ isDarkMode, selectedCurrencies, filteredData, formatNumber }) => {
  return (
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
                fontSize: '22px',
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
              striped: {
                color: 'var(--text-color)',
                backgroundColor: 'var(--control-bg-color)',
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
              },
            },
          }}
        />
        <div className="download-section-table">
          <button className="toggle-button">Download Table</button>
        </div>
      </div>
    </div>
  );
};

export default Table;
