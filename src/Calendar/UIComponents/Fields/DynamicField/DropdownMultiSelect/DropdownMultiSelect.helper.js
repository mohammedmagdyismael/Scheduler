/* eslint-disable react/no-array-index-key */
import React from 'react';
import Checkbox from '../../../checkbox/Checkbox';
import Icon from '../../../icon/Icon';
import IconsStore from '../../IconsStore';

import {
  ListItem,
  ItemLabel,
  ItemDescription,
  ItemContentContainer,
  OptionItemContent,
  TagContainer,
  TagLabel,
  TagWrapper,
  IconContainer,
  CategoryLabel,
  CategoryLabelContainer,
} from './DropdownMultiSelect.style';

export const dropDownListToggler = (optionsList, componentName, variationB) => {
  if (optionsList && optionsList.length) {
    const listBtn = document.getElementById(`dropdown-list-btn-${componentName}`);
    const list = document.getElementById(`dropdown-list-${componentName}`);
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

export const renderSelectedOptions = (optionList, isCounter, placeHolder) => {
  if (optionList.length) {
    if (isCounter) {
      let itemsCount = 0;
      optionList.forEach(item => {
        if (item.isChecked) {
          itemsCount += 1;
        }
      });
      return `${itemsCount > 0 ? `${itemsCount} ` : ''}${placeHolder}`;
    }
    const NUMBER_OF_DISPLAYED_VALUES = 2;
    let composedValue = '';
    let checkedItemsCounter = 0;
    let extraItems = 0;
    optionList.forEach(item => {
      if (item.isChecked) {
        if (checkedItemsCounter < NUMBER_OF_DISPLAYED_VALUES) {
          if (!composedValue) {
            composedValue = item.fieldValue;
          } else {
            composedValue += `, ${item.fieldValue}`;
          }
        } else {
          extraItems += 1;
        }
        checkedItemsCounter += 1;
      }
    });
    return `${composedValue}${extraItems > 0 ? ` +${extraItems}` : ''}`;
  }
};

export const renderDropDownList = (
  optionsList,
  callback,
  extendedStyle,
  isCategorized,
  enableAllOption,
  isAllSelected,
  allLabel,
) => {
  const mappedOptions = [];
  if (optionsList && optionsList.length) {
    // Categorized List
    if (isCategorized) {
      let categoryLetter;
      if (enableAllOption) {
        mappedOptions.push(
          <ListItem
            key="all"
            extendDropDownListItem={extendedStyle}
            isMultipleSelection
            style={{ boxShadow: 'inset 0px -1px 0px #f1f4f6' }}
          >
            <ItemContentContainer>
              <Checkbox isChecked={isAllSelected} onChange={() => callback(-1)}>
                <OptionItemContent withOutDesciption>
                  <ItemLabel isChecked={isAllSelected} style={{ fontWeight: 'bold' }}>
                    {allLabel}
                  </ItemLabel>
                </OptionItemContent>
              </Checkbox>
            </ItemContentContainer>
          </ListItem>,
        );
      }

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
            key={`${option.key}-${index}`}
            extendDropDownListItem={extendedStyle}
            isMultipleSelection
          >
            <ItemContentContainer>
              <Checkbox isChecked={option.isChecked} onChange={() => callback(option, index)}>
                <OptionItemContent withOutDesciption={!option.description}>
                  <ItemLabel isChecked={option.isChecked}>{option.fieldValue}</ItemLabel>
                  {option.description && <ItemDescription>{option.description}</ItemDescription>}
                </OptionItemContent>
              </Checkbox>
            </ItemContentContainer>
          </ListItem>,
        );
      });
    } else {
      // Normal List
      if (enableAllOption) {
        mappedOptions.push(
          <ListItem
            key="all"
            extendDropDownListItem={extendedStyle}
            isMultipleSelection
            style={{ boxShadow: 'inset 0px -1px 0px #f1f4f6' }}
          >
            <ItemContentContainer>
              <Checkbox isChecked={isAllSelected} onChange={() => callback(-1)}>
                <OptionItemContent withOutDesciption>
                  <ItemLabel isChecked={isAllSelected} style={{ fontWeight: 'bold' }}>
                    {allLabel}
                  </ItemLabel>
                </OptionItemContent>
              </Checkbox>
            </ItemContentContainer>
          </ListItem>,
        );
      }

      optionsList.forEach((option, index) => {
        mappedOptions.push(
          <ListItem
            key={`${option.key}-${index}`}
            extendDropDownListItem={extendedStyle}
            isMultipleSelection
          >
            <ItemContentContainer>
              <Checkbox isChecked={option.isChecked} onChange={() => callback(option, index)}>
                <OptionItemContent withOutDesciption={!option.description}>
                  <ItemLabel isChecked={option.isChecked}>{option.fieldValue}</ItemLabel>
                  {option.description && <ItemDescription>{option.description}</ItemDescription>}
                </OptionItemContent>
              </Checkbox>
            </ItemContentContainer>
          </ListItem>,
        );
      });
    }
  }

  return mappedOptions;
};

export const renderTags = (optionList, callback, isAllTagsShown, isCategorized) => {
  const tagsList = [];
  if (optionList.length) {
    if (isCategorized) {
      optionList.forEach((option, index) => {
        option.items.forEach((item, indexx) => {
          if (item.isChecked) {
            if (!isAllTagsShown && tagsList.length < 2) {
              tagsList.push(
                <TagContainer>
                  <TagWrapper>
                    <TagLabel>{item.fieldValue}</TagLabel>
                    <IconContainer>
                      <Icon
                        className="icon"
                        onClick={() => callback(item, index, indexx)}
                        icon={IconsStore.getIcon('close')}
                        width={8}
                      />
                    </IconContainer>
                  </TagWrapper>
                </TagContainer>,
              );
            } else if (isAllTagsShown) {
              tagsList.push(
                <TagContainer>
                  <TagWrapper>
                    <TagLabel>{item.fieldValue}</TagLabel>
                    <IconContainer>
                      <Icon
                        className="icon"
                        onClick={() => callback(item, index, indexx)}
                        icon={IconsStore.getIcon('close')}
                        width={8}
                      />
                    </IconContainer>
                  </TagWrapper>
                </TagContainer>,
              );
            }
          }
        });
      });
    } else {
      optionList.forEach((item, index) => {
        if (item.isChecked) {
          if (!isAllTagsShown && tagsList.length < 2) {
            tagsList.push(
              <TagContainer>
                <TagWrapper>
                  <TagLabel>{item.fieldValue}</TagLabel>
                  <IconContainer>
                    <Icon
                      className="icon"
                      onClick={() => callback(item, index)}
                      icon={IconsStore.getIcon('close')}
                      width={8}
                    />
                  </IconContainer>
                </TagWrapper>
              </TagContainer>,
            );
          } else if (isAllTagsShown) {
            tagsList.push(
              <TagContainer>
                <TagWrapper>
                  <TagLabel>{item.fieldValue}</TagLabel>
                  <IconContainer>
                    <Icon
                      className="icon"
                      onClick={() => callback(item, index)}
                      icon={IconsStore.getIcon('close')}
                      width={8}
                    />
                  </IconContainer>
                </TagWrapper>
              </TagContainer>,
            );
          }
        }
      });
    }
  }
  return tagsList;
};
