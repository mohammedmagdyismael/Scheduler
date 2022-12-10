import React from 'react';
import PropTypes from 'prop-types';
import Filters from './Filters';
import { getDatePickerDropDownList } from './Filters.helper';



const FiltersContainer = ({ ...props }) => {
  const {
    language,
    setDatePickerMode,
    datePickerMode,
    // startDate,
    // endDate
  } = props;


  const datePickerDropdownList = getDatePickerDropDownList(language);
  return (
    <Filters
      {...props}
      datePickerMode={datePickerMode}
      setDatePickerMode={setDatePickerMode}
      datePickerDropdownList={datePickerDropdownList}
    />
  );
};

FiltersContainer.propTypes = {
  selectedDate: PropTypes.string,
  onChangeDate: PropTypes.func,
  language: PropTypes.string,
  selectedView: PropTypes.string,
  onChangeViewSelection: PropTypes.func,
};

export default FiltersContainer;
