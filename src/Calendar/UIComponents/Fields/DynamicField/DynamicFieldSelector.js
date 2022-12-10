import React from 'react';
import InputField from './InputField';
import DropDown from './DropDown';
import ImageUploader from './ImageUploader';
import DropdownMultiSelect from './DropdownMultiSelect';

const DynamicFieldSelector = ({ isDropDown, isImageUploader, multipleSelection, ...props }) => {
  if (isDropDown) return <DropDown {...props} />;
  if (isImageUploader) return <ImageUploader {...props} />;
  if (multipleSelection) return <DropdownMultiSelect {...props} />;
  return <InputField {...props} />;
};

export default DynamicFieldSelector;
