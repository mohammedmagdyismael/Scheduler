import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import Text from '../text/Text';
import { FONT_WEIGHTS, FONT_TYPES } from '../base/Typography';
import { COLORS } from '../base/Colors';
import withDisplayName from '../WithDisplayName';

class MenuItem extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    onClick: PropTypes.func,
    onHover: PropTypes.func,
    isSelected: PropTypes.bool,
    isFocused: PropTypes.bool,
    isMenuOpen: PropTypes.bool,
    isMultiple: PropTypes.bool,
    disableScroll: PropTypes.bool,
    disabled: PropTypes.bool,
    isGroupHeadline: PropTypes.bool,
    itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    index: PropTypes.number,
    keyPrefix: PropTypes.string.isRequired,
  };

  static defaultProps = {
    isSelected: false,
    isFocused: false,
    isMenuOpen: false,
    isMultiple: false,
    disableScroll: false,
    disabled: false,
    isGroupHeadline: false,
    index: 0,
  };

  static defaultProps = {
    onClick: () => {},
    onHover: () => {},
  };

  state = {
    isSelected: false,
    isFocused: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isSelected !== prevState.isSelected) {
      return {
        isSelected: nextProps.isSelected,
      };
    }

    if (nextProps.isFocused !== prevState.isFocused) {
      return {
        isFocused: nextProps.isFocused,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    if (
      (!this.props.isMultiple &&
        this.state.isSelected &&
        prevProps.isMenuOpen !== this.props.isMenuOpen) ||
      (this.state.isFocused && !this.props.disableScroll)
    ) {
      this.item.parentNode.scrollTop = this.item.offsetTop - (this.props.isMultiple ? 51 : 0);
    }
  }

  onClick = () => {
    const { disabled, isGroupHeadline, onClick } = this.props;
    if (!disabled && !isGroupHeadline) {
      onClick(this.props);
    }
  };

  onHover = () => {
    const { index, itemKey, onHover } = this.props;
    const { isFocused } = this.state;
    if (!isFocused) {
      onHover(itemKey, index);
    }
  };

  render() {
    const {
      children,
      isSelected,
      isFocused,
      disabled,
      itemKey,
      keyPrefix,
      isGroupHeadline,
    } = this.props;
    const fontType = isGroupHeadline ? FONT_TYPES.CAPTION : FONT_TYPES.BODY;
    const fontWeight = isGroupHeadline ? FONT_WEIGHTS.SEMI_BOLD : FONT_WEIGHTS.NORMAL;
    const color = isGroupHeadline ? COLORS.HELP_TEXT : COLORS.TEXT;
    const cursor = isGroupHeadline ? 'default' : 'pointer';

    return (
      <li
        className={ClassNames({
          selected: !disabled && isSelected,
          focused: !disabled && isFocused && !isGroupHeadline,
          disabled,
          headline: isGroupHeadline,
        })}
        onMouseDown={this.onClick}
        onMouseMove={this.onHover}
        onKeyDown={() => {}}
        tabIndex={0}
        key={`${keyPrefix}-${itemKey}`}
        ref={item => {
          this.item = item;
        }}
        role="button" // eslint-disable-line
      >
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text cursor={cursor} type={fontType} fontWeight={fontWeight} color={color}>
            {children}
          </Text>
        ) : (
          children
        )}
      </li>
    );
  }
}

export default withDisplayName(MenuItem, 'MenuItem');
