/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import _ from 'lodash';
import Icon from '../../../icon/Icon';
import IconsStore from '../../IconsStore';
import {
  FieldContainer,
  FieldLabel,
  FieldValue,
  ListContainer,
  SearchInput,
  LabelValueContainer,
  IsRequiredNote,
  DisableOverLay,
  TooltipContainer,
  TooltipMessage,
  Container,
} from './DropDown.style';

import {
  dropDownListToggler,
  renderDropDownList,
  renderSelectedOptions,
  dropDownListTogglerBySearchOptions,
} from './DropDown.helper';

const DropDown = ({ ...props }) => {
  const {
    fieldLabel,
    fieldValue,
    searchable,
    multipleSelection,
    options,
    extendDropDownStyle,
    extendFieldText,
    icon,
    iconSize,
    onChanges,
    onSearch,
    isRequired,
    extendDropDownList,
    extendDropDownListItem,
    onClickIconAction,
    componentName,
    isDisabled,
    language,
    showTooltip,
    isValid,
    placeHolder,
    fontSize,
    enableOtherOption,
    fieldIcon,
    fieldIconSize,
    variationB,
    isCategorized,
  } = props;
  const [optionList, setOptionList] = useState(options); // for List View
  const [searchedOptionList, setSearchedOptionList] = useState(options); // for List View
  const [selectedOptions, setSelectOption] = useState([]); // for selected items
  const [typedValue, setTypedValue] = useState('');

  const toggleDropDowns = () => {
    const dropDowns = document.querySelectorAll('div[class^="dropdown"]');
    const anotherDropDownsLabels = [];

    // Get all onther dropdown other than the current clicked one
    dropDowns.forEach(dropDown => {
      const dropDownClassName = Array.from(dropDown.classList).filter(className =>
        className.includes('dropdown-'),
      );
      if (dropDownClassName[0] !== `dropdown-${componentName}`) {
        anotherDropDownsLabels.push(dropDownClassName[0]);
      }
    });

    // Close opened lists of all onther dropdowns
    anotherDropDownsLabels.forEach(dropDown => {
      const label = dropDown.split('-')[1];
      const list = document.getElementById(`dropdown-list-${label}`);
      if (list) list.style.display = 'none';
    });
  };
  useEffect(
    () => {
      setOptionList(options);
      setSearchedOptionList(options);
    },
    [options],
  );
  // eslint-disable-next-line no-unused-vars
  const onItemSelect = (option, index) => {
    if (searchable) setTypedValue(option.fieldValue);
    setSelectOption([option]);
    if (onChanges) {
      onChanges(option.value);
    }
    dropDownListToggler(optionList, componentName, variationB);
  };

  useEffect(
    () => {
      if (fieldValue !== undefined && optionList && optionList.length) {
        const filteredOption = optionList.filter(option => option.value === fieldValue);
        if (filteredOption && filteredOption[0]) {
          setTypedValue(filteredOption[0].fieldValue);
          setSelectOption(filteredOption);
        }
      } else {
        const list = document.getElementById(`dropdown-list-${componentName}`);
        list.style.display = 'none';
        setTypedValue('');
        setSelectOption([]);
        setSearchedOptionList(options);
      }
    },
    [fieldValue, optionList],
  );

  const onSearchInList = value => {
    onChanges(undefined);
    if (value) {
      const serachResult = optionList.filter(
        option =>
          String(option.fieldValue)
            .toLowerCase()
            .includes(String(value).toLowerCase()) ||
          String(option.key)
            .toLowerCase()
            .includes('other'),
      );

      setSearchedOptionList(serachResult);
      dropDownListTogglerBySearchOptions(serachResult, `dropdown-list-${componentName}`);
    } else {
      setSearchedOptionList(options);
    }

    setTypedValue(value);
    setTimeout(() => {
      if (onSearch) onSearch(value);
    }, 1000);
  };

  const isFieldValueRendered = !searchable && selectedOptions.length > 0;
  const isInputFieldRendered = searchable;

  const getTooltipMessage = () => {
    if (showTooltip && fieldValue) {
      return renderSelectedOptions(selectedOptions, multipleSelection);
    }
    return false;
  };

  const onFieldClick = () => {
    // setFocus(true);
    if (searchable) {
      if (document.getElementById(`input-container-${componentName}`)) {
        document.getElementById(`input-container-${componentName}`).focus();
      }
    }
    toggleDropDowns();
    dropDownListToggler(optionList, componentName, variationB);
  };

  const listListenerHandler = event => {
    const myElementToCheckIfClicksAreInsideOf = document.querySelector(`#${componentName}`);
    if (!myElementToCheckIfClicksAreInsideOf.contains(event.target)) {
      const list = document.getElementById(`dropdown-list-${componentName}`);
      list.style.display = 'none';
      if (variationB) {
        const listBtn = document.getElementById(`dropdown-list-btn-${componentName}`);
        listBtn.style.backgroundColor = 'unset';
      }
    }
  };

  const addListener = () => {
    document.body.addEventListener('click', listListenerHandler, true);
  };

  const removeListener = () => {
    document.body.removeEventListener('click', listListenerHandler, true);
  };

  useEffect(() => {
    addListener();
    return () => {
      removeListener();
    };
  }, []);

  const showNoResultMessage =
    searchedOptionList &&
    searchedOptionList[0] &&
    searchedOptionList[0].key === 'other' &&
    enableOtherOption;

  return (
    <Container className={`dropdown dropdown-${componentName}`} id={componentName}>
      <DisableOverLay isDisabled={isDisabled} />
      {getTooltipMessage() && (
        <TooltipContainer language={language}>
          <TooltipMessage>{getTooltipMessage()}</TooltipMessage>
        </TooltipContainer>
      )}
      <FieldContainer
        id={`dropdown-list-btn-${componentName}`}
        isValid={isValid}
        isDimmed={false}
        extendDropDownStyle={extendDropDownStyle}
      >
        {fieldIcon && (
          <div
            style={{
              margin: '0px 4px',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Icon className="icon" icon={IconsStore.getIcon(fieldIcon)} width={fieldIconSize} />
          </div>
        )}
        <LabelValueContainer
          style={{ width: '90%' }}
          onClick={() => {
            if ((options && options.length) || searchable) onFieldClick();
          }}
        >
          {fieldLabel && (
            <FieldLabel isValueSelected={searchable || selectedOptions.length}>
              {fieldLabel}
              {isRequired && <IsRequiredNote>*</IsRequiredNote>}
            </FieldLabel>
          )}
          {isFieldValueRendered ? (
            <FieldValue fontSize={fontSize} extendFieldText={extendFieldText}>
              {renderSelectedOptions(selectedOptions, multipleSelection)}
            </FieldValue>
          ) : (
            <FieldValue isPlaceHolder fontSize={fontSize} extendFieldText={extendFieldText}>
              {placeHolder}
            </FieldValue>
          )}
          {isInputFieldRendered && (
            <SearchInput
              extendFieldText={extendFieldText}
              autoComplete="off"
              id={`input-container-${componentName}`}
              type="text"
              value={typedValue}
              onChange={e => {
                onSearchInList(e.target.value);
              }}
            />
          )}
        </LabelValueContainer>
        {icon && (
          <Icon
            className="icon"
            onClick={() => {
              if (onClickIconAction) {
                onClickIconAction();
              } else {
                onFieldClick();
              }
            }}
            icon={IconsStore.getIcon(icon)}
            width={iconSize}
          />
        )}
      </FieldContainer>
      <div id={`dropdown-list-${componentName}`} style={{ display: 'none', position: 'relative' }}>
        <ListContainer fontSize={fontSize} extendDropDownList={extendDropDownList}>
          {showNoResultMessage && (
            <div
              style={{
                padding: '13px 26px',
                boxShadow: 'inset 0px -1px 0px #f1f4f6',
              }}
            >
              <div>
                <p
                  style={{
                    color: '#7E7E7E',
                    fontSize: '13px',
                  }}
                >
                  {language === 'en'
                    ? 'No results found. Try different keywords or choose Other'
                    : 'لم يتم العثور على نتائج مماثلة، يرجى التأكد من كتابة اسم التأمين بشكل صحيح أو اختيار "أخرى"'}
                </p>
              </div>
            </div>
          )}
          {renderDropDownList(
            searchedOptionList,
            multipleSelection,
            onItemSelect,
            {
              extendDropDownListItem,
            },
            language,
            isCategorized,
          )}
        </ListContainer>
      </div>
    </Container>
  );
};

DropDown.propTypes = {
  showTooltip: PropTypes.bool,
  fieldValue: PropTypes.string,
  fieldLabel: PropTypes.string,
  icon: PropTypes.string,
  searchable: PropTypes.bool,
  selectFirst: PropTypes.bool,
  multipleSelection: PropTypes.bool,
  options: PropTypes.array,
  onChanges: PropTypes.func,
  iconSize: PropTypes.number,
  extendDropDownStyle: PropTypes.string,
  onSearch: PropTypes.func,
  isHorizontallySorted: PropTypes.bool,
  isRequired: PropTypes.bool,
  extendDropDownList: PropTypes.array,
  extendDropDownListItem: PropTypes.string,
  onClickIconAction: PropTypes.func,
  componentName: PropTypes.string,
  isDisabled: PropTypes.bool,
  language: PropTypes.string,
  isValid: PropTypes.bool,
  placeHolder: PropTypes.string,
  fontSize: PropTypes.number,
  extendFieldText: PropTypes.array,
  enableOtherOption: PropTypes.bool,
  variationB: PropTypes.bool,
  fieldIcon: PropTypes.string,
  fieldIconSize: PropTypes.number,
  isCategorized: PropTypes.bool,
};
export default DropDown;
