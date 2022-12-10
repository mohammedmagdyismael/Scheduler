import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Search from './Search';
import MenuList from '../menuList/MenuList';
import withDisplayName from '../WithDisplayName';

const SearchContainer = styled.div`
  position: relative;
  width: 500px;
  ${props => (props.extendSearchContainerStyle ? props.extendSearchContainerStyle : '')};
`;

let typingTimeout;

class SearchWithMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fieldValue: '',
      showMenuList: false,
      showClearButton: false,
    };
  }

  onSelect = (index, value, fieldValue) => {
    this.setState(
      {
        fieldValue,
        showMenuList: false,
        showClearButton: true,
      },
      () => {
        if (this.props.onSelect) {
          this.props.onSelect(value);
        }
      },
    );
  };

  onTyping = fieldValue => {
    this.setState(
      {
        fieldValue,
        showClearButton: true,
      },
      () => {
        if (fieldValue) {
          this.showMenuList();
        } else {
          this.hideMenuList();
        }

        if (Array.from(fieldValue).length >= this.props.triggerOnTypingAfter) {
          clearTimeout(typingTimeout);
          typingTimeout = setTimeout(() => {
            if (this.props.onTyping) {
              this.props.onTyping(fieldValue);
            }
          }, this.props.onTypingDelay);
        }
      },
    );
  };

  onReset = () => {
    this.setState(
      {
        fieldValue: '',
        showClearButton: false,
      },
      () => {
        this.hideMenuList();

        if (this.props.onReset) {
          this.props.onReset();
        }
      },
    );
  };

  toggleMenuList = () => {
    if (!this.state.showMenuList) {
      this.showMenuList();
    } else {
      this.hideMenuList();
    }
  };

  showMenuList = () => {
    this.setState({
      showMenuList: true,
    });
  };

  hideMenuList = () => {
    this.setState({
      showMenuList: false,
    });
  };

  render() {
    const { extendSearchContainerStyle, extendSearchStyle, isMenuDisabled } = this.props;
    const { placeholder } = this.props;
    const iconProps = {
      mr: 3,
    };

    return (
      <SearchContainer extendSearchContainerStyle={extendSearchContainerStyle}>
        <Search
          width={1}
          px={3}
          value={this.state.fieldValue}
          onChange={this.onTyping}
          onClick={this.toggleMenuList}
          placeholder={placeholder}
          onReset={this.onReset}
          showClearButton={this.state.showClearButton && this.state.fieldValue}
          iconProps={iconProps}
          clearText={this.props.clearText}
          extendSearchStyle={extendSearchStyle}
        />
        {!isMenuDisabled && (
          <MenuList
            items={this.props.items}
            disabledItems={this.props.disabledItems}
            show={this.state.showMenuList}
            onClick={this.onSelect}
          />
        )}
      </SearchContainer>
    );
  }
}

SearchWithMenu.propTypes = {
  isMenuDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onTyping: PropTypes.func,
  onSelect: PropTypes.func,
  onTypingDelay: PropTypes.number,
  triggerOnTypingAfter: PropTypes.number,
  onReset: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.any,
      value: PropTypes.any,
      fieldValue: PropTypes.string,
      disable: PropTypes.bool,
    }),
  ),
  disabledItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  clearText: PropTypes.string,
  extendSearchContainerStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  extendSearchStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

SearchWithMenu.defaultProps = {
  placeholder: 'Search',
  items: [],
  onTypingDelay: 2000,
  triggerOnTypingAfter: 3,
  onSelect: () => {},
  onTyping: () => {},
  onReset: () => {},
  disabledItems: [],
  clearText: 'Reset',
};

export default withDisplayName(SearchWithMenu, 'SearchWithMenu');
