/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Fields';
import {
  ButtonsContainer,
  FilterSectionContainer,
  FiltersContainerWrapper,
  FiltersContainer,
  ExtendDropDownListItem,
  ExtendDropDownStyle,
  ExtendFieldText,
  ExtendDropDownListDatePicker,
} from './Filters.styles';
import DatePicker from './DatePicker';

const Filters = ({ ...props }) => {
  const {
    datePickerDropdownList,
    languagesList,
    startDate,
    endDate,
    onChangeDate,
    language,
    datePickerMode,
    setDatePickerMode,
    weekStartDay,
    setLanguage,
    localization,
  } = props;

  return (
    <FiltersContainer>
      <FiltersContainerWrapper>
          <div>
            <FilterSectionContainer id="filter-container__date-picker">
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                language={language}
                onChange={onChangeDate}
                datePickerMode={datePickerMode}
                weekStartDay={weekStartDay}
                localization={localization}
              />
            </FilterSectionContainer>
          </div>
        <FilterSectionContainer>
          <ButtonsContainer>
            <div style={{ minWidth: '100px' }}>
              <Field
                extendDropDownList={ExtendDropDownListDatePicker}
                extendFieldText={ExtendFieldText}
                placeHolder="Date Picker"
                extendDropDownListItem={ExtendDropDownListItem}
                extendDropDownStyle={ExtendDropDownStyle}
                fieldValue={datePickerMode}
                componentName="filters-datepicker-dropdown"
                options={datePickerDropdownList}
                onChanges={val => setDatePickerMode(val)}
                icon="downcarret"
                iconSize={12}
                isDynamic
                isDropDown
                language="en"
                fieldIcon="calendar"
                fieldIconSize={11}
                isDisabled={false}
                variationB
              />
            </div>
            <div style={{ minWidth: '100px' }}>
              <Field
                extendDropDownList={ExtendDropDownListDatePicker}
                extendFieldText={ExtendFieldText}
                placeHolder="language"
                extendDropDownListItem={ExtendDropDownListItem}
                extendDropDownStyle={ExtendDropDownStyle}
                fieldValue={language}
                componentName="filters-language-dropdown"
                options={languagesList}
                onChanges={val => setLanguage(val)}
                icon="downcarret"
                iconSize={12}
                isDynamic
                isDropDown
                language="en"
                fieldIcon="language_switch"
                fieldIconSize={11}
                isDisabled={false}
                variationB
              />
            </div>

          </ButtonsContainer>
        </FilterSectionContainer>
      </FiltersContainerWrapper>
    </FiltersContainer>
  );
};

Filters.propTypes = {
  selectedDate: PropTypes.string,
  onChangeDate: PropTypes.func,
  enableAddAppointment: PropTypes.bool,
  language: PropTypes.string,
  localization: PropTypes.object,
  appointmentsAutoUpdate: PropTypes.func,
  onClickAddAppointment: PropTypes.func,
  selectedView: PropTypes.string,
  onChangeViewSelection: PropTypes.func,
  mixpanel: PropTypes.object,
  onSearchChange: PropTypes.func,
  query: PropTypes.string,
  onPatientSelect: PropTypes.func,
  searchedPatients: PropTypes.array,
  isSearchingPatients: PropTypes.bool,
  isTeleHealth: PropTypes.bool,
  isPrimaryCare: PropTypes.bool,
};

export default Filters;
