import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../Icons';

import SearchContainer from './SearchContainer';
import Field from './Field';
import Text from '../text/Text';
import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import withDisplayName from '../WithDisplayName';
import { COLORS } from '../base/Colors';
import { FONT_WEIGHTS, FONT_SIZES, FONT_TYPES } from '../base/Typography';

const Search = ({
  placeholder,
  clearText,
  value,
  onChange,
  onBlur,
  onReset,
  showClearButton,
  iconProps,
  language,
  extendSearchStyle,
  ...otherProps
}) => (
  <SearchContainer extendSearchStyle={extendSearchStyle} alignItems="center" {...otherProps}>
    <Icon
      icon={new IconsStore(Icons).getIcon('search')}
      width={12}
      color={COLORS.HELP_TEXT}
      {...iconProps}
    />
    <Field
      type="text"
      autoComplete="off"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      fontSize={FONT_SIZES[FONT_TYPES.BODY]}
      fontWeight={FONT_WEIGHTS.NORMAL}
      m={language === 'en' ? '0 8px 0 0' : '0 0 0 8px'}
      extendSearchStyle={extendSearchStyle}
    />
    {showClearButton && (
      <Text
        color={COLORS.PRIMARY_BLUE}
        cursor="pointer"
        fontWeight={FONT_WEIGHTS.NORMAL}
        mr={1}
        onClick={onReset}
      >
        {clearText}
      </Text>
    )}
  </SearchContainer>
);

Search.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onReset: PropTypes.func,
  clearText: PropTypes.string,
  value: PropTypes.string,
  showClearButton: PropTypes.bool,
  language: PropTypes.string,
  iconProps: PropTypes.object, // eslint-disable-line
};

Search.defaultProps = {
  placeholder: 'Search',
  clearText: 'Reset',
  value: '',
  showClearButton: false,
  onChange: () => {},
  onBlur: () => {},
  onReset: () => {},
  language: 'en',
  iconProps: {},
};

export default withDisplayName(Search, 'Search');
