// utils.js
import React from 'react';

export const formatNumber = (num) => {
  if (num === null || num === undefined) return '';

  const formattedNumber = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <span style={{ color: parseFloat(num) < 0 ? 'red' : 'black' }}>
      {formattedNumber}
    </span>
  );
};
