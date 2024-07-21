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
        d[currency.value] !== undefined ? d[currency.value] : null
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
