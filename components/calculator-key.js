import React from 'react';
import PointTarget from 'react-point';

const CalculatorKey = ({ onPress, className, ...props }) => (
  <button
    onClick={onPress}
    className={`calculator-key ${className}`}
    {...props}
  />
);

export default CalculatorKey;
