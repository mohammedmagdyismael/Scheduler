import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import _ from 'lodash';
import Icons from '../Icons';
import styled from 'styled-components';
import { width, space } from 'styled-system';

import Text from '../text/Text';
import Image from '../image/Image';
import Icon, { iconPropTypes } from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import MenuItem from './MenuItem';
import Search from '../search/Search';
import Tag from '../tag/Tag';
import TagsContainer from './TagsContainer';
import Separator from '../separator/Separator';
import { itemsAdapter, generateListFromItems, isListsEqual, getErrorMessage } from './SelectUtils';
import withDisplayName from '../WithDisplayName';
import { COLORS } from '../base/Colors';
import './Select.css';
import { FONT_WEIGHTS } from '../base/Typography';

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

const SELECT_ALL = 'SELECT_ALL';
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const ENTER = 13;
const ESCAPE = 27;
const SUPPORTED_SHORTCUTS = [UP_ARROW, DOWN_ARROW, ENTER, ESCAPE];

const NEXT = 0;
const PREVIOUS = 1;

// TODO: Separate the menu item and menu list into component
// TODO: Migrate the new `MenuItem` and `MenuList` into `Search`

const MenuList = styled.ul`
  ${props => (props.extendComboboxMenuList ? props.extendComboboxMenuList : '')};
`;

const SelectContainer = styled.div`
  ${width};
  ${space};
  ${props => (props.extendSelect ? props.extendSelect : '')};
`;

const InputContainer = styled.div`
  ${props => (props.extendInputContainer ? props.extendInputContainer : '')};
`;

const Input = styled.input`
  margin: ${props =>
    props.reverse
      ? `0 0 0 ${props.small ? '16px' : '24px'}`
      : `0 ${props.small ? '16px' : '24px'} 0 0`};
  margin-right: ${props =>
    props.reverse ? '0px !important' : `${props.small ? '16px' : '24px'} !important`};
  line-height: 20px;
`;

const IconContainer = styled(Flex)`
  cursor: pointer;
  position: relative;
  right: 0;
  transition: -webkit-transform 200ms ease-in-out;
  transition: transform 200ms ease-in-out;
  transition: transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;
  &.icon--up {
    transform: rotate(180deg);
  }
  svg {
    margin-right: 0;
  }
`;

const SelectIcon = styled(Icon)`
  margin: ${props => (props.reverse ? '0 0 0 12px' : '0 12px 0 0')};
`;

class Select extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          data: PropTypes.shape({
            placeholder: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
            searchable: PropTypes.array,
            img: PropTypes.string,
            disabled: PropTypes.bool,
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            groupBy: PropTypes.string,
            groupIcon: PropTypes.string,
          }),
          component: PropTypes.any,
        }),
        PropTypes.shape({
          children: PropTypes.any,
          fieldValue: PropTypes.string,
          value: PropTypes.any,
          searchable: PropTypes.array,
          fieldImage: PropTypes.string,
          disabled: PropTypes.bool,
          groupBy: PropTypes.string,
          groupIcon: PropTypes.string,
          key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
      ]),
    ),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    hideErrorMessage: PropTypes.bool,
    icon: iconPropTypes,
    iconWidth: PropTypes.number,
    noIcon: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    noSearch: PropTypes.bool,
    callbackParams: PropTypes.bool,
    select: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    selectFirst: PropTypes.bool,
    allowCustomChoice: PropTypes.bool,
    customChoiceMessage: PropTypes.string,
    emptyStateMessage: PropTypes.string,
    noBottomBorder: PropTypes.bool,
    multiple: PropTypes.bool,
    allowSelectAll: PropTypes.bool,
    searchTimeout: PropTypes.number,
    reverse: PropTypes.bool,
    language: PropTypes.string,
    small: PropTypes.bool,
    customErrorMassage: PropTypes.string
  };

  static defaultProps = {
    items: [],
    placeholder: '',
    className: '',
    noIcon: false,
    noSearch: false,
    emptyStateMessage: 'No options are available...',
    noBottomBorder: false,
    multiple: false,
    onChange: () => {},
    onSearch: () => {},
    hideErrorMessage: false,
    icon: undefined,
    iconWidth: undefined,
    callbackParams: undefined,
    select: undefined,
    selectFirst: false,
    allowCustomChoice: false,
    customChoiceMessage: undefined,
    disabled: false,
    allowSelectAll: false,
    searchTimeout: 500,
    reverse: false,
    language: 'en',
    small: false,
    customErrorMassage:''
  };

  state = {
    list: new Map(),
    prevList: new Map(),
    fieldValue: new Map(),
    fieldImage: undefined,
    select: undefined,
    value: new Map(),
    isOpen: false,
    isDanger: false,
    errorMessage: getErrorMessage(this.props),
    currentFocusedItemKey: undefined,
    currentFocusedItemIndex: -1,
    isFocusedByMouse: false,
    searchValue: '',
    isAllSelected: false,
    isAllItemsDisabled: false,
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    // Remove children key from object comparison
    const prevItems = Array.from(prevState.prevList.values());
    const nextItems = itemsAdapter(nextProps.items);

    // Comparing the current and the new items
    if (!isListsEqual(prevItems, nextItems)) {
      // Adapting items to new structure
      const { list, groupedList, isAllItemsDisabled } = generateListFromItems(
        nextItems,
        nextProps.language,
      );

      return { list: groupedList, prevList: list, isAllItemsDisabled };
    }

    // There is no update to the state
    return null;
  };

  componentDidMount = () => {
    document.addEventListener('mousedown', this.onBlur);
    const { list } = this.state;
    const { select, selectFirst } = this.props;
    this.originalList = new Map(list);

    if (select !== null && select !== undefined && list && list.size !== 0) {
      this.selectItem(select);
    }

    if (selectFirst && list && list.size !== 0) {
      this.selectFirstItem();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { list, value, select, searchValue } = this.state;
    const { allowCustomChoice, allowSelectAll, selectFirst, items, multiple } = this.props;
    const prevItems = itemsAdapter(prevProps.items);
    const nextItems = itemsAdapter(items);
    const prevSelect = prevProps.select;
    const nextSelect = this.props.select;
    const firstItem = Array.from(list.values())[0];
    const firsItemValue = firstItem && firstItem.value;
    const isItemsChanged = !isListsEqual(prevItems, nextItems);

    // Comparing the current and the new items
    if (!isListsEqual(prevItems, nextItems)) {
      // Update originalList
      this.originalList = new Map(list);
    }

    // Disable any operations if specific values changed
    if (
      prevState.isOpen !== this.state.isOpen ||
      prevState.value !== this.state.value ||
      prevState.fieldValue !== this.state.fieldValue ||
      prevState.fieldImage !== this.state.fieldImage ||
      prevState.isDanger !== this.state.isDanger ||
      prevState.currentFocusedItemIndex !== this.state.currentFocusedItemIndex ||
      prevState.currentFocusedItemKey !== this.state.currentFocusedItemKey ||
      prevState.searchValue !== this.state.searchValue
    )
      return;

    // Update originalList
    this.originalList = new Map(list);

    // If allowCustomChoice enabled, we inject the item in the top of the list
    if (allowCustomChoice && !list.has('custom') && searchValue !== '') {
      this.injectCustomItem(this.renderCustomInputItem());
    }

    // If allowSelectAll enabled, we inject the item in the top of the list
    if (allowSelectAll && !list.has(SELECT_ALL) && list.size !== 0) {
      this.injectCustomItem(this.renderSelectAllItem());
    }

    if (
      !allowCustomChoice &&
      !selectFirst &&
      nextSelect !== null &&
      nextSelect !== undefined &&
      ((!this.isItemsEqual(
        nextSelect,
        multiple ? Array.from(value.values()) : value.get(nextSelect),
      ) &&
        !this.isItemsEqual(nextSelect, prevSelect)) ||
        isItemsChanged)
    ) {
      this.selectItem(nextSelect);
    }

    // To support @deprecated select() method
    if (!this.isItemsEqual(select, value.get(select)) && select) {
      this.selectItem(select);
    }

    if (selectFirst) {
      if (!this.isItemsEqual(value, firsItemValue) && isItemsChanged) {
        this.selectFirstItem();
      }
    }
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onBlur);
  }

  /**
   * Handle user's click within the field container
   */
  onClick = () => {
    const { disabled } = this.props;

    // If field disabled don't open/close the menu
    if (!disabled) {
      this.setState(prevState => ({
        isOpen: !prevState.isOpen,
      }));
    }
  };

  /**
   * Handles users' click outside field container
   * @param {event} event
   */
  onBlur = event => {
    const { isOpen } = this.state;
    const isVisibleScrollBar = window.innerWidth > document.documentElement.clientWidth;
    const isClickOnScrollBar = window.outerWidth - 18 <= event.x;

    // Only enter if the menu is closed and the click isn't inside the field or the menu
    if (
      this.selectContainer &&
      !this.selectContainer.contains(event.target) &&
      (!isVisibleScrollBar || (isVisibleScrollBar && !isClickOnScrollBar)) &&
      isOpen
    ) {
      // Validate field
      this.validate();

      this.setState({
        isOpen: false,
        currentFocusedItemIndex: -1,
        currentFocusedItemKey: undefined,
        isFocusedByMouse: false,
      });
    }
  };

  /**
   * Select an item
   * @param {object} item
   */
  onSelect = selection => {
    const { multiple, allowSelectAll, allowCustomChoice } = this.props;
    const { list, prevList, isAllSelected, isDanger } = this.state;
    let items = [];
    let isSelectingAll = false;
    let lockMultipleClear = false;

    if (Array.isArray(selection)) {
      // This case only happens when passing an array as `select` prop
      items = selection;
      lockMultipleClear = true;
    } else {
      const selectionValue = selection.value;

      if (selectionValue === SELECT_ALL) {
        // Handles select all option
        items = Array.from(list.values());
        isSelectingAll = true;
      } else {
        // Handles single selection
        items.push(selection);
      }
    }

    this.setState(
      prevState => {
        let newValues;
        let newFieldValues;
        let newFieldImage;
        let newIsAllSelected = isAllSelected;
        let enabledItemsSize = 0;
        let lastFocusedItemKey;
        let lastFocusedItemIndex = -1;

        if (!multiple) {
          // If not multiple select, clear current selected items
          newValues = new Map();
          newFieldValues = new Map();
        } else {
          // If multiple select, add to the previous values
          newValues = prevState.value;
          newFieldValues = prevState.fieldValue;
        }

        if (multiple) {
          prevList.forEach(item => {
            if (!item) return;
            const { itemKey, disabled } = item;
            if (itemKey === SELECT_ALL || disabled) return;
            enabledItemsSize += 1;
          });
        }

        // Get value and fieldValue from each item
        items.forEach(item => {
          if (!item) return;
          const { itemKey, value, fieldValue, fieldImage, disabled, index } = item;
          if (itemKey === SELECT_ALL || disabled) return;

          lastFocusedItemKey = itemKey;
          lastFocusedItemIndex = index;
          newFieldImage = fieldImage;
          if (isSelectingAll) {
            if (isAllSelected) {
              newValues.delete(itemKey);
              newFieldValues.delete(itemKey);
            } else {
              newValues.set(itemKey, value);
              newFieldValues.set(itemKey, fieldValue);
            }
          } else if (newValues.has(itemKey) && !lockMultipleClear) {
            // This case only happens with multiple select
            // If the item is already selected, we remove it from selected values
            newValues.delete(itemKey);
            newFieldValues.delete(itemKey);
          } else {
            // Add the selected value
            newValues.set(itemKey, value);
            newFieldValues.set(itemKey, fieldValue);
          }
        });

        if (newValues.size === enabledItemsSize && enabledItemsSize !== 0) {
          newIsAllSelected = true;
        } else {
          newIsAllSelected = false;
        }

        return {
          value: newValues,
          fieldValue: newFieldValues,
          fieldImage: newFieldImage,
          list: this.originalList,
          isDanger: !allowCustomChoice ? false : isDanger,
          isOpen: multiple && (!lockMultipleClear || (allowSelectAll && !lockMultipleClear)),
          isAllSelected: newIsAllSelected,
          currentFocusedItemKey: lastFocusedItemKey,
          currentFocusedItemIndex: lastFocusedItemIndex,
        };
      },
      () => {
        // Return an array of selected items to onChange prop
        let selectedValue = Array.from(this.state.value.values());

        // If not multiple select, return selected item.
        // Why not return Array? to support backward compatibility
        if (!multiple) {
          selectedValue = selectedValue.pop();
        }

        if (allowSelectAll) {
          this.injectCustomItem(this.renderSelectAllItem());
        }

        this.props.onChange(selectedValue, this.props.callbackParams);

        if (allowCustomChoice) this.validate();
      },
    );
  };

  /**
   * Only called from Tag component
   * @param {string} itemValue
   */
  onUnSelect = itemValue => {
    // Get the actual item, then pass it to onSelect and onSelect will
    // find that this item is already selected so it will remove it from selected values
    const item = this.getItemByValue(itemValue);
    this.onSelect(item);
  };

  /**
   * Called when user's types in search field
   * @param {string} value
   */
  onSearch = (value, overrideFieldValue = false) => {
    const { allowSelectAll, items, searchTimeout, allowCustomChoice } = this.props;

    // This is just for performance, since onSearch prop
    // is mainly for calling APIs, so if each key press will trigger
    // an API call this will cause a lot calls.
    // What we do here is, we wait for searchTimeout (default 500ms)
    // before we call onSearch prop, if the user pressed on another key
    // the previous timer is canceled and a new one is created
    if (searchTimeout > 0) {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.props.onSearch(value);
      }, searchTimeout);
    } else {
      this.props.onSearch(value);
    }

    // Filter current items then update the state
    const list = this.filterList(value);
    this.setState(
      prevState => {
        let { fieldValue } = prevState;

        if (overrideFieldValue) {
          fieldValue = new Map();
          fieldValue.set(value, value);
        }

        return {
          searchValue: value,
          fieldValue,
          value: overrideFieldValue ? new Map() : prevState.value,
          list,
          isOpen: true,
          currentFocusedItemKey: undefined,
          currentFocusedItemIndex: -1,
        };
      },
      () => {
        if (allowSelectAll && list.size === items.length) {
          this.injectCustomItem(this.renderSelectAllItem());
        }

        if (allowCustomChoice && value !== '') {
          this.injectCustomItem(this.renderCustomInputItem());
        }
      },
    );
  };

  /**
   * Triggered when hovering on an item
   * @param {string | number} key
   * @param {number} index
   */
  onItemHover = (key, index) => {
    this.setState({
      currentFocusedItemIndex: index,
      currentFocusedItemKey: key,
      isFocusedByMouse: true,
    });
  };

  /**
   * Get item by it's value
   * @param {any} value
   * @returns {object} item
   */
  getItemByValue = value => {
    const { list } = this.state;

    // Loop through current list and get matched items
    const matchedItem = Array.from(list.values()).filter(item =>
      this.isItemsEqual(item.value, value),
    );

    if (matchedItem.length === 1) {
      // Return the first item in an array
      return matchedItem.pop();
    }
  };

  /**
   * Returns current value
   */
  getInputValue = () => {
    const { multiple } = this.props;
    let { value } = this.state;

    // Get values as an Array
    value = Array.from(value.values());

    // Returns an array if multiple otherwise return on item
    if (!multiple) {
      value = value.pop();
    }
    return value;
  };

  /**
   * Gets the next/previous available item
   * @param {number} direction
   * @param {number} index
   * @return {number} newIndex
   */
  getAvailableItem = (direction, index) => {
    const { list } = this.state;
    const listArray = Array.from(list.values());
    let newIndex = index;
    let item;

    switch (direction) {
      case NEXT: {
        newIndex = index + 1 === list.size ? 0 : index + 1;
        item = listArray[newIndex];

        // Checks if the item should be skipped
        if (item) {
          if (this.shouldSkipItem(item)) {
            return this.getAvailableItem(NEXT, newIndex);
          }
        }

        return newIndex;
      }

      case PREVIOUS: {
        newIndex = index - 1 === -1 ? list.size - 1 : index - 1;
        item = listArray[newIndex];

        // Checks if the item should be skipped
        if (item) {
          if (this.shouldSkipItem(item)) {
            return this.getAvailableItem(PREVIOUS, newIndex);
          }
        }

        return newIndex;
      }

      default: {
        return newIndex;
      }
    }
  };

  iconsStore = new IconsStore(Icons);
  typingTimer;

  /**
   * Selects an item or reset current selection if the item
   * @param {any} value
   */
  selectItem = values => {
    let items;

    // Incase selecting multiple items at a time
    if (Array.isArray(values)) {
      items = values.map(value => this.getItemByValue(value)).filter(value => !!value);
    } else {
      items = this.getItemByValue(values);
    }

    // If the requested item is exists we select it, if not we reset the field values
    if (items && items.length !== 0) {
      this.onSelect(items);
    } else {
      this.resetSelect();
    }
  };

  /**
   * Selects first item from the list
   */
  selectFirstItem = () => {
    const { list } = this.state;

    // Get the first item from the current list
    const item = Array.from(list.values())[0];

    if (item) {
      this.onSelect(item);
    }
  };

  /**
   * Compares two items
   * @param {any} firstItem
   * @param {any} secondtItem
   * @returns {boolean} isEqual
   */
  isItemsEqual = (firstItem, secondItem) => {
    let isEqual;

    /**
     * If the item's type is string or number we do a normal comparison
     * Otherwise we use lodash to do comparison on Arrays and Objects
     */
    if (typeof firstItem !== 'object' && typeof secondItem !== 'object') {
      isEqual = firstItem === secondItem;
    } else if (typeof firstItem === 'object' && typeof secondItem === 'object') {
      isEqual = _.isEqual(firstItem, secondItem);
    }
    return isEqual;
  };

  /**
   * Filter current list based on a query
   * @param {string} query
   */
  filterList = query => {
    const { allowCustomChoice, placeholder, emptyStateMessage } = this.props;
    if (!query && query === '') {
      if (!allowCustomChoice) {
        // If query is undefined or an empty string
        return this.originalList;
      }

      return new Map();
    }

    const results = new Map();
    const stringQuery = `${query}`;

    // Filtering current items list
    this.originalList.forEach((value, key) => {
      if (value.searchable) {
        value.searchable.forEach(search => {
          const stringSearch = `${search}`;

          // Matching part of the search with entered query
          if (stringSearch.toLowerCase().includes(stringQuery.toLowerCase())) {
            results.set(key, value);
          }
        });
      }
    });

    // If there is no results, we will show an empty state
    if (results.size === 0 && !allowCustomChoice) {
      results.set(-1, {
        disabled: true,
        key: `${placeholder}-empty-results`,
        itemKey: 'empty-results',
        children: emptyStateMessage,
        keyPrefix: placeholder,
        index: 0,
      });
    }

    return results;
  };

  /**
   * Resets current state
   */
  resetSelect = () => {
    const { list } = this.state;
    const { items, allowSelectAll, allowCustomChoice } = this.props;

    this.setState(
      {
        value: new Map(),
        fieldValue: new Map(),
        fieldImage: undefined,
        list: this.originalList,
        isAllSelected: false,
      },
      () => {
        if (allowSelectAll && list.size === items.length) {
          this.injectCustomItem(this.renderSelectAllItem());
        }
        if (allowCustomChoice) {
          this.onSearch('');
        }
      },
    );
  };

  /**
   * @deprecated
   */
  clearSelected = () => this.resetSelect();

  /**
   * Navigate between items using keyboard
   */
  navigateWithKeyboard = e => {
    const key = e.keyCode;

    // Return if the keyCode isn't supported
    if (!SUPPORTED_SHORTCUTS.includes(key)) {
      return;
    }
    e.preventDefault();

    const { currentFocusedItemIndex, list, isOpen } = this.state;
    let itemToBeSelected;
    let newIndex = currentFocusedItemIndex;

    switch (key) {
      case DOWN_ARROW:
        this.setState({
          isOpen: true,
        });
        newIndex = this.getAvailableItem(NEXT, currentFocusedItemIndex);
        break;

      case UP_ARROW:
        this.setState({
          isOpen: true,
        });
        newIndex = this.getAvailableItem(PREVIOUS, currentFocusedItemIndex);
        break;

      case ENTER:
        if (isOpen) {
          itemToBeSelected = Array.from(list.values())[currentFocusedItemIndex];
          this.onSelect(itemToBeSelected);
        }
        break;
      case ESCAPE:
        this.onBlur(e);
        break;
      default:
        break;
    }

    const currentFocusedItem = Array.from(list.values())[newIndex];

    this.setState({
      currentFocusedItemIndex: newIndex,
      currentFocusedItemKey: currentFocusedItem ? currentFocusedItem.itemKey : undefined,
      isFocusedByMouse: false,
    });
  };

  /**
   * Focus on input field
   */
  focus = () => {
    this.input.focus();
    this.setState({
      isOpen: true,
    });
  };

  /**
   * Validate current state and show an error message if not valid
   */
  validate = () => {
    this.isValid();
  };

  /**
   * Checks if the current value is valid
   * @returns {boolean}
   */
  isValid = () => {
    const { value, isDanger, searchValue } = this.state;
    const { hideErrorMessage, allowCustomChoice, validationChecks } = this.props;
    let validationChecksResult = true;

    if (validationChecks) {
      validationChecks.forEach(check => {
        const regexResult = check.regex.test(searchValue);

        if (!regexResult) {
          this.showErrorMessage(check.errorMessage[this.props.language]);
          validationChecksResult = false;
        }
      });
    }

    if (validationChecksResult) {
      if (
        (value.size === 0 || isDanger) &&
        !hideErrorMessage &&
        (!allowCustomChoice || (allowCustomChoice && searchValue === ''))
      ) {
        this.showErrorMessage();
        return false;
      }
      this.hideErrorMessage();
      return true;
    }
    return false;
  };

  /**
   * Show an error message
   * @param {string} errorMessage
   */
  showErrorMessage = (errorMessage = getErrorMessage(this.props)) => {
    this.setState({
      isDanger: true,
      errorMessage,
    });
  };

  /**
   * Hide error message
   */
  hideErrorMessage = () => {
    this.setState({
      isDanger: false,
    });
  };

  /**
   * Update current items
   * @deprecated
   * @param {Array} items
   */
  updateItems = items => {
    const { list } = this.state;
    const newItems = itemsAdapter(items);

    // Only updates if the list changed
    if (!isListsEqual(newItems, list)) {
      this.setState(() => {
        const newList = generateListFromItems(newItems, this.props.language).list;

        return {
          list: newList,
        };
      });
    }
  };

  /**
   * Selects an item
   * @deprecated
   * @param {any} value
   */
  select = value => {
    const { multiple } = this.props;
    if (
      !this.isItemsEqual(
        value,
        multiple ? Array.from(this.state.value.values()) : this.state.value.get(value),
      )
    ) {
      this.setState({
        select: value,
      });
    }
  };

  /**
   * Add custom item into menu items
   */
  injectCustomItem = item => {
    const currentItems = itemsAdapter(this.props.items);
    currentItems.unshift(item);
    const { groupedList } = generateListFromItems(currentItems, this.props.language);

    this.setState({
      list: groupedList,
    });
  };

  /**
   *
   */
  shouldSkipItem = ({ disabled, isGroupHeadline, isSelected }) =>
    disabled || isGroupHeadline || isSelected;

  /**
   * Renders custom input item
   * @return {element}
   */
  renderCustomInputItem = () => {
    const { customChoiceMessage, placeholder } = this.props;
    const { fieldValue } = this.state;
    const value = Array.from(fieldValue.values()).join(', ');

    return {
      value,
      fieldValue: value,
      itemKey: 'custom',
      key: `${placeholder}-custom`,
      keyPrefix: placeholder,
      children: (
        <div className="custom-option--container">
          <Icon
            className="custom-option--icon"
            icon={this.iconsStore.getIcon('plus')}
            width={9}
            color={"#0070cd"}
          />
          <Text ml={2} className="custom-option--text">{`${customChoiceMessage}: ${value}`}</Text>
        </div>
      ),
    };
  };

  /**
   * Create select/unselect all option
   */
  renderSelectAllItem = () => ({
    value: SELECT_ALL,
    fieldValue: SELECT_ALL,
    itemKey: SELECT_ALL,
    key: `${this.props.placeholder}-${SELECT_ALL}`,
    keyPrefix: this.props.placeholder,
    disabled: this.state.isAllItemsDisabled,
    children: (
      <Text fontWeight={FONT_WEIGHTS.SEMI_BOLD}>
        {this.props.language === 'en'
          ? `${this.state.isAllSelected ? 'Unselect' : 'Select'} All ${this.props.placeholder}`
          : `${this.state.isAllSelected ? 'إلغاء التحديد على' : 'اختر'} كل ${
            this.props.placeholder // eslint-disable-line
          }` // eslint-disable-line
        }
      </Text>
    ),
  });

  /**
   * Render an array of <MenuItem />
   * @returns {Array} listItems
   */
  renderItems = () => {
    const { list, isOpen, value, searchValue } = this.state;
    const { allowCustomChoice, emptyStateMessage, multiple, placeholder } = this.props;
    const menuItems = [];

    if (list.size === 0 && (!allowCustomChoice || (allowCustomChoice && searchValue === ''))) {
      menuItems.push(
        <MenuItem
          keyPrefix={placeholder}
          itemKey="empty"
          key={`${placeholder}-empty`}
          index={0}
          disabled
        >
          {emptyStateMessage}
        </MenuItem>,
      );
    } else {
      list.forEach((item, index) => {
        menuItems.push(
          <MenuItem
            {...item}
            keyPrefix={placeholder}
            onHover={this.onItemHover}
            isSelected={value.has(index)}
            itemKey={item.itemKey}
            isFocused={this.isItemsEqual(index, this.state.currentFocusedItemKey)}
            isMenuOpen={isOpen}
            isMultiple={multiple}
            disableScroll={this.state.isFocusedByMouse}
            onClick={this.onSelect}
            key={`${placeholder}-${item.itemKey}`}
          />,
        );
      });
    }

    return menuItems;
  };

  /**
   * Render selected items in tags
   */
  renderTags = () => {
    const { fieldValue } = this.state;
    const { placeholder, reverse } = this.props;
    const tags = [];

    fieldValue.forEach((value, key) => {
      if (key === SELECT_ALL) return;

      tags.push(
        <Tag
          key={`${placeholder}-${value}`}
          mr={reverse ? 0 : 1}
          ml={reverse ? 1 : 0}
          mt={1}
          onRemove={() => this.onUnSelect(key)}
          reverse={reverse}
        >
          {value}
        </Tag>,
      );
    });

    return tags;
  };

  render() {
    const { fieldValue, fieldImage, isOpen, errorMessage, isDanger, searchValue } = this.state;
    const {
      hideErrorMessage,
      icon,
      iconWidth,
      noIcon,
      className,
      disabled,
      noBottomBorder,
      placeholder,
      multiple,
      items,
      reverse,
      small,
      language,
      onChange, // eslint-disable-line
      onSearch, // eslint-disable-line
      extendSelect,
      extendInputContainer,
      extendComboboxMenuList,
      ...filteredProps
    } = this.props;
    const showSearchBar = multiple && items.length !== 0;
    let inputIcon;
    let iconColor;

    // Changing icon color depending on component state
    if (isDanger) {
      iconColor = "#ef0f0f";
    } else if (isOpen) {
      iconColor = "#0070cd";
    } else {
      iconColor = "#58595b";
    }

    if (icon) {
      inputIcon = <SelectIcon reverse={reverse} icon={icon} width={iconWidth} color={iconColor} />;
    } else {
      inputIcon = (
        <Image
          src={fieldImage}
          radius={20}
          alt={fieldImage}
          name={fieldImage}
          m={!reverse ? '0 10px 0 0' : '0 0 0 10px'}
        />
      );
    }

    const containerClasses = ClassNames('select', className, {
      'select--danger': isDanger,
      'select--no-icon': noIcon,
      'select--disabled': disabled,
      'select--focused': isOpen,
      'select--no_borders': noBottomBorder,
    });

    return (
      <SelectContainer
        innerRef={div => {
          this.selectContainer = div;
        }}
        className={containerClasses}
        {...filteredProps}
        extendSelect={extendSelect}
      >
        <InputContainer
          className={ClassNames('input-container', { 'input-container--multiple': multiple })}
          onClick={this.onClick}
          onKeyDown={this.navigateWithKeyboard}
          tabIndex="-1"
          extendInputContainer={extendInputContainer}
        >
          {!noIcon && inputIcon}
          {multiple && fieldValue.size !== 0 ? (
            <TagsContainer width={1} flexWrap="wrap">
              {this.renderTags()}
            </TagsContainer>
          ) : (
            <Input
              reverse={reverse}
              type="text"
              value={Array.from(fieldValue.values()).join(', ')}
              placeholder={`${placeholder}${!hideErrorMessage ? '*' : ''}`}
              tabIndex="0"
              innerRef={input => {
                this.input = input;
              }}
              onChange={e => this.onSearch(e.target.value, true)}
              onKeyDown={this.onKeyDown}
              readOnly={multiple}
              disabled={disabled}
              autoComplete="off"
              small={small}
            />
          )}
          <IconContainer
            alignItems="center"
            justifyContent="center"
            className={ClassNames({ 'icon--up': isOpen })}
            onKeyDown={() => {}}
            reverse={reverse}
          >
            <Icon icon={this.iconsStore.getIcon('dropdown')} width={18} color={COLORS.TEXT} />
          </IconContainer>
        </InputContainer>
        {!hideErrorMessage && <span className="error-message">{errorMessage}</span>}
        <MenuList
          extendComboboxMenuList={extendComboboxMenuList}
          ref={menu => {
            this.menu = menu;
          }}
          className={ClassNames('menu', { 'menu--open': isOpen })}
        >
          {showSearchBar && (
            <React.Fragment>
              <Flex className="search--container" p={2} justifyContent="center" alignItems="center">
                <Search
                  p={2}
                  width={1}
                  placeholder={
                    reverse ? `ابحث ب${placeholder}` : `Search ${placeholder.toLowerCase()}`
                  }
                  onChange={this.onSearch}
                  value={searchValue}
                  flexDirection="row-reverse"
                  iconProps={{ m: 0 }}
                  language={language}
                />
              </Flex>
              <Separator />
            </React.Fragment>
          )}
          <div className="items--container">{this.renderItems()}</div>
        </MenuList>
      </SelectContainer>
    );
  }
}

export default withDisplayName(Select, 'Select');
