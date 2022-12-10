import React from 'react';

import {
  ListItem,
  ItemLabel,
  ItemDescription,
  ItemContentContainer,
  CheckBox,
  CategoryLabel,
  CategoryLabelContainer,
} from './DropDown.style';

export const dropDownListToggler = (optionsList, componentName, variationB) => {
  if (optionsList && optionsList.length) {
    const list = document.getElementById(`dropdown-list-${componentName}`);
    const listBtn = document.getElementById(`dropdown-list-btn-${componentName}`);
    if (list.style.display === 'none') {
      list.style.display = 'block';
      if (variationB) listBtn.style.backgroundColor = '#F7F8FA';
    } else {
      list.style.display = 'none';
      if (variationB) listBtn.style.backgroundColor = 'unset';
    }
  }
};

export const dropDownListTogglerBySearchOptions = (optionsList, listId) => {
  if (optionsList && optionsList.length) {
    const list = document.getElementById(listId);
    if (list.style.display === 'none') {
      list.style.display = 'block';
    }
  }
};

export const renderSelectedOptions = (selectedOptionsList, isMultipleSelection) => {
  if (selectedOptionsList.length) {
    if (isMultipleSelection) {
      const firstTwoItems = selectedOptionsList.slice(0, 3);
      let composedValue = '';
      firstTwoItems.forEach(item => {
        if (!composedValue) {
          composedValue = item.fieldValue;
        } else {
          composedValue += `, ${item.fieldValue}`;
        }
      });
      composedValue += selectedOptionsList.length > 3 ? ` +${selectedOptionsList.length - 3}` : '';
      return composedValue;
    }
    return selectedOptionsList[0].fieldValue;
  }
};

export const renderDropDownList = (
  optionsList,
  isMultipleSelection,
  callback,
  extendedStyle,
  language,
  isCategorized,
) => {
  let mappedOptions = [];

  if (optionsList && optionsList.length) {
    // Categorized List
    if (isCategorized) {
      let categoryLetter;

      optionsList.forEach((option, index) => {
        if (categoryLetter !== String(option.fieldValue).charAt(0)) {
          categoryLetter = String(option.fieldValue).charAt(0);
          mappedOptions.push(
            <CategoryLabelContainer>
              <CategoryLabel>{categoryLetter}</CategoryLabel>
            </CategoryLabelContainer>,
          );
        }

        mappedOptions.push(
          <ListItem
            isEnabled={!(option.isEnabled === false)}
            key={`${option.key}-${option.fieldValue}`}
            extendDropDownListItem={extendedStyle.extendDropDownListItem}
            onClick={() => {
              if (!(option.isEnabled === false)) callback(option, index);
            }}
            isMultipleSelection={isMultipleSelection}
          >
            <ItemContentContainer>
              {isMultipleSelection && <CheckBox type="checkbox" checked={option.isChecked} />}
              <div style={{ margin: '0px 10px', display: 'flex', flexDirection: 'column' }}>
                <ItemLabel isEnabled={!(option.isEnabled === false)}>{option.fieldValue}</ItemLabel>
                {option.description && (
                  <ItemDescription isEnabled={!(option.isEnabled === false)} language={language}>
                    {option.description}
                  </ItemDescription>
                )}
              </div>
            </ItemContentContainer>
          </ListItem>,
        );
      });
    } else {
      mappedOptions = optionsList.map((option, index) => (
        <ListItem
          isEnabled={!(option.isEnabled === false)}
          key={`${option.key}-${option.fieldValue}`}
          extendDropDownListItem={extendedStyle.extendDropDownListItem}
          onClick={() => {
            if (!(option.isEnabled === false)) callback(option, index);
          }}
          isMultipleSelection={isMultipleSelection}
        >
          <ItemContentContainer>
            {isMultipleSelection && <CheckBox type="checkbox" checked={option.isChecked} />}
            <div style={{ margin: '0px 10px', display: 'flex', flexDirection: 'column' }}>
              <ItemLabel isEnabled={!(option.isEnabled === false)}>{option.fieldValue}</ItemLabel>
              {option.description && (
                <ItemDescription isEnabled={!(option.isEnabled === false)} language={language}>
                  {option.description}
                </ItemDescription>
              )}
            </div>
          </ItemContentContainer>
        </ListItem>
      ));
    }
  }
  return mappedOptions;
};
