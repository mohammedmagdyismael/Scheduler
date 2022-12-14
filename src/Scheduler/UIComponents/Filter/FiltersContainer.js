import React from 'react';
import PropTypes from 'prop-types';
import Filters from './Filters';
import { getDatePickerDropDownList, getLanguagesList } from './Filters.helper';



const FiltersContainer = ({ ...props }) => {
  const {
    setLanguage,
    language,
    setDatePickerMode,
    datePickerMode,
    // startDate,
    // endDate
  } = props;


  const datePickerDropdownList = getDatePickerDropDownList(language);
  const languagesList = getLanguagesList();

  return (
    <Filters
      {...props}
      datePickerMode={datePickerMode}
      setDatePickerMode={setDatePickerMode}
      datePickerDropdownList={datePickerDropdownList}
      languagesList={languagesList}
      language={language}
      setLanguage={setLanguage}
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
