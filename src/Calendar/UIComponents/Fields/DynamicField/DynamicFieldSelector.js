import React from 'react';
import InputField from './InputField';
import DropDown from './DropDown';
import DropdownMultiSelect from './DropdownMultiSelect';

const DynamicFieldSelector = ({ isDropDown, isImageUploader, multipleSelection, ...props }) => {
  if (isDropDown) return <DropDown {...props} />;
  if (multipleSelection) return <DropdownMultiSelect {...props} />;
  return <InputField {...props} />;
};

export default DynamicFieldSelector;
