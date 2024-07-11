import React from 'react';
import CurrencyConverter from '../../components/currency/CurrencyConverter';
import './currency.css';

export const Currency = () => {
  return (
    <div className="currency-conversion-page">
        <CurrencyConverter />
    </div>
);
}