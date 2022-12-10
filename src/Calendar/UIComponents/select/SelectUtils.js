// @flow

import React from 'react';
import _ from 'lodash';
import Articles from 'articles';
import { Flex } from 'grid-styled';

import Text from '../text/Text';
import Image from '../image/Image';

/**
 * Adapts old items object into the new one
 * @param {Array} items
 * @return {Array} items
 */
const itemsAdapter = (items: Array<Object>): Array<Object> => {
  if (!items || items.length === 0) return [];
  if (Array.isArray(items)) {
    const newItems = [];

    if (!items[0].data) {
      items.forEach(item =>
        newItems.push({
          ...item,
          itemKey: item.key || item.value,
        }),
      );
    } else {
      items.forEach(item => {
        const { component } = item;
        const { placeholder, value, searchable, img, disable, key, groupBy, groupIcon } = item.data;

        newItems.push({
          children: component,
          fieldValue: placeholder,
          value,
          searchable,
          fieldImage: img,
          disabled: disable,
          itemKey: key || value,
          groupBy,
          groupIcon,
        });
      });
    }
    return newItems;
  }

  return [];
};

/**
 * Converts an array of items to a Map
 * @param {Array} items
 * @returns {Map} items
 */
const generateListFromItems = (items: Array<Object> = [], language: String): Object => {
  const list = new Map();
  const groupedList = new Map();
  let disabledItems = 0;

  items.forEach((item, index) => {
    const { itemKey, disabled, searchable, groupBy, groupIcon } = item;

    // Throw an error is key isn't string or number
    if (typeof itemKey !== 'string' && typeof itemKey !== 'number' && item.key !== undefined) {
      throw new Error(
        `${
          item.fieldValue
        } value's type isn't string or number, if this isn't a mistake pass 'key' to component object`,
      );
    }

    if (groupBy) {
      const groupParent = groupedList.get(groupBy);
      const groupParentSearchable = groupParent ? groupParent.searchable : [];

      if (searchable) {
        searchable.forEach(search => groupParentSearchable.push(search));
      }

      groupedList.set(groupBy, {
        children: (
          <Flex alignItems="center">
            <Image
              src={groupIcon}
              radius={14}
              alt={groupBy}
              name={groupBy}
              borderRadius="0"
              objectFit="contain"
            />
            <Text ml={language === 'en' ? 2 : 0} mr={language === 'ar' ? 2 : 0}>
              {groupBy}
            </Text>
          </Flex>
        ),
        value: groupBy,
        itemKey: groupBy,
        searchable: groupParentSearchable,
        isGroupHeadline: true,
      });
    }

    // Count disabled items
    if (disabled) disabledItems += 1;
    list.set(itemKey, { ...item, index });
    groupedList.set(itemKey, { ...item, index });
  });

  return { list, groupedList, isAllItemsDisabled: disabledItems === items.length };
};

/**
 * Compares two items
 * @param {Object} firstItem
 * @param {Object} secondItem
 */
const isItemsEqual = (firstItem: Object, secondItem: Object): boolean => {
  if (
    firstItem.fieldValue !== secondItem.fieldValue ||
    firstItem.fieldImage !== secondItem.fieldImage ||
    firstItem.disable !== secondItem.disable ||
    firstItem.itemKey !== secondItem.itemKey ||
    !_.isEqual(firstItem.searchable, secondItem.searchable) ||
    !_.isEqual(firstItem.value, secondItem.value)
  ) {
    return false;
  }

  return true;
};

/**
 * Compares two lists
 * @param {Array} firstList
 * @param {Array} secondList
 */
const isListsEqual = (firstList: Array<Object>, secondList: Array<Object>): boolean => {
  // If two lists have two different length, there is no need to compare items
  if (firstList.length !== secondList.length) {
    return false;
  }

  let isEqual = true;
  firstList.forEach((item, index) => {
    if (isEqual) {
      isEqual = isItemsEqual(firstList[index], secondList[index]);
    }
  });
  return isEqual;
};

const getErrorMessage = (props: Object): string => {
  const { multiple, placeholder, allowCustomChoice, language ,customErrorMassage } = props;
  if (multiple) {
    return language === 'en' ? `Select ${placeholder.toLowerCase()}` : `اختر ${placeholder}`;
  }
  if(customErrorMassage|| customErrorMassage !== ''){
    return customErrorMassage;
  }
  const enter = language === 'en' ? 'Enter' : 'ادخل';
  const select = language === 'en' ? 'Select' : 'اختر';
  return `${allowCustomChoice ? enter : select} ${
    language === 'en' ? Articles.articlize(placeholder.toLowerCase()) : placeholder
  }`;
};

export { itemsAdapter, generateListFromItems, isItemsEqual, isListsEqual, getErrorMessage };
