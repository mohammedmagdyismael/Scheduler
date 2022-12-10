import React from 'react';
import StaticField from './StaticField';
import DynamicField from './DynamicField';

const FieldSelector = ({ isDynamic, ...props }) => {
  if (isDynamic) return <DynamicField {...props} />;
  return <StaticField {...props} />;
};

export default FieldSelector;
