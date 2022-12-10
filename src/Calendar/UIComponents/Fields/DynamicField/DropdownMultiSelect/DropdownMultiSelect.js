/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../icon/Icon';
import IconsStore from '../../IconsStore';
import {
  FieldContainer,
  FieldLabel,
  FieldValue,
  ListContainer,
  LabelValueContainer,
  IsRequiredNote,
  DisableOverLay,
  TagsContainer,
  TagContainer,
  TagLabel,
  TagWrapper,
  IconContainer,
  extendTagContainer,
} from './DropdownMultiSelect.style';

import {
  dropDownListToggler,
  renderDropDownList,
  renderSelectedOptions,
  renderTags,
} from './DropdownMultiSelect.helper';

const DropDown = ({ ...props }) => {
  const {
    fieldLabel,
    fieldValue,
    options,
    extendDropDownStyle,
    extendFieldText,
    icon,
    iconSize,
    onChanges,
    isRequired,
    extendDropDownList,
    extendDropDownListItem,
    componentName,
    isDisabled,
    isValid,
    tags,
    isCategorized,
    enableAllOption,
    placeHolder,
    fontSize,
    fieldIcon,
    fieldIconSize,
    allLabel,
    isCounter,
    variationB,
  } = props;
  const [optionList, setOptionList] = useState([]); // for List View
  const [isAllTagsShown, toggleTagsShown] = useState(false);

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

  const isAllSelected = (fieldValue && fieldValue.length) === (options && options.length);

  const onItemSelect = (option, itemIndex) => {
    const updatedOptionsList = [...optionList];

    if (option === -1) {
      updatedOptionsList.forEach((listItem, index) => {
        updatedOptionsList[index].isChecked = !isAllSelected;
      });
      const checkedSelections = [];
      updatedOptionsList.forEach(optionItem => {
        if (optionItem.isChecked) checkedSelections.push(optionItem.value);
      });
      setOptionList(updatedOptionsList);
      if (onChanges) onChanges(checkedSelections);
    } else {
      updatedOptionsList[itemIndex].isChecked = !option.isChecked;
      setOptionList(updatedOptionsList);
      const checkedSelections = [];
      updatedOptionsList.forEach(optionItem => {
        if (optionItem.isChecked) checkedSelections.push(optionItem.value);
      });
      if (onChanges) onChanges(checkedSelections);
    }
  };

  // Load for first time
  useEffect(
    () => {
      const resetedOptionsList = [];
      if (options && options.length && !optionList.length) {
        options.forEach(item => {
          resetedOptionsList.push({
            ...item,
            isChecked: false,
          });
        });
        setOptionList(resetedOptionsList);
      }
    },
    [options],
  );

  useEffect(
    () => {
      const resetedOptionsList = [];
      if (options && options.length) {
        options.forEach(item => {
          if (fieldValue.includes(item.key)) {
            resetedOptionsList.push({
              ...item,
              isChecked: true,
            });
          } else {
            resetedOptionsList.push({
              ...item,
              isChecked: false,
            });
          }
        });

        setOptionList(resetedOptionsList);
      }
    },
    [fieldValue],
  );

  const isFieldValueRendered = fieldValue.length > 0;

  const onFieldClick = () => {
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

  const renderSelectedOptionsField = () => {
    if (isFieldValueRendered && optionList && optionList.length) {
      if (tags) {
        return (
          <TagsContainer extendFieldText={extendFieldText}>
            {renderTags(optionList, onItemSelect, isAllTagsShown, isCategorized)}
            {fieldValue.length > 2 && (
              <TagContainer
                extendTagContainer={extendTagContainer}
                onClick={() => toggleTagsShown(!isAllTagsShown)}
              >
                <TagWrapper>
                  <TagLabel>
                    {isAllTagsShown ? 'Show less' : `${fieldValue.length - 2} more`}
                  </TagLabel>
                  <IconContainer isAllTagsShown={isAllTagsShown}>
                    <Icon className="icon" icon={IconsStore.getIcon('dropdown')} width={16} />
                  </IconContainer>
                </TagWrapper>
              </TagContainer>
            )}
          </TagsContainer>
        );
      }
      return (
        <FieldValue extendFieldText={extendFieldText}>
          {renderSelectedOptions(optionList, isCounter, placeHolder)}
        </FieldValue>
      );
    }
    return '';
  };

  return (
    <div
      style={{ position: 'relative' }}
      className={`dropdown dropdown-${componentName}`}
      id={componentName}
      key={componentName}
    >
      <DisableOverLay isDisabled={isDisabled} />
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
            if (options && options.length) onFieldClick();
          }}
        >
          {fieldLabel && (
            <FieldLabel isValueSelected={fieldValue.length}>
              {fieldLabel}
              {isRequired && <IsRequiredNote>*</IsRequiredNote>}
            </FieldLabel>
          )}

          {isFieldValueRendered ? (
            renderSelectedOptionsField(optionList)
          ) : (
            <FieldValue isPlaceHolder fontSize={fontSize} extendFieldText={extendFieldText}>
              {placeHolder}
            </FieldValue>
          )}
        </LabelValueContainer>
        {icon && (
          <Icon
            className="icon"
            onClick={() => {
              if (onFieldClick) {
                onFieldClick();
              }
            }}
            icon={IconsStore.getIcon(icon)}
            width={iconSize}
          />
        )}
      </FieldContainer>
      <div id={`dropdown-list-${componentName}`} style={{ display: 'none', position: 'relative' }}>
        <ListContainer extendDropDownList={extendDropDownList}>
          {renderDropDownList(
            optionList,
            onItemSelect,
            {
              extendDropDownListItem,
            },
            isCategorized,
            enableAllOption,
            isAllSelected,
            allLabel,
          )}
        </ListContainer>
      </div>
    </div>
  );
};

DropDown.propTypes = {
  fieldValue: PropTypes.string,
  fieldLabel: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  options: PropTypes.array,
  onChanges: PropTypes.func.isRequired,
  iconSize: PropTypes.number.isRequired,
  extendDropDownStyle: PropTypes.string,
  isRequired: PropTypes.bool,
  extendDropDownList: PropTypes.array,
  extendDropDownListItem: PropTypes.string,
  componentName: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isValid: PropTypes.bool,
  extendFieldText: PropTypes.string,
  tags: PropTypes.bool,
  isCategorized: PropTypes.bool,
  enableAllOption: PropTypes.bool,
  placeHolder: PropTypes.string,
  fontSize: PropTypes.number,
  fieldIcon: PropTypes.string,
  fieldIconSize: PropTypes.number,
  allLabel: PropTypes.string,
  isCounter: PropTypes.bool,
  variationB: PropTypes.bool,
};
export default DropDown;
