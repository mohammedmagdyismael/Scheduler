import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icons from '../Icons';
import Color from 'color';
import { bgColor, width } from 'styled-system';

import Text from '../text/Text';
import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';
import { COLORS_VALUES, COLORS } from '../base/Colors';
import space from '../base/Space';

const TagContainer = styled(Text)`
  ${bgColor};
  ${width};
  border-radius: 15px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: ${props => (props.reverse && props.removable ? '0px' : `${space[3]}px`)};
  padding-right: ${props =>
    // eslint-disable-next-line no-nested-ternary
    props.reverse ? `${space[3]}px` : props.removable ? '0px' : `${space[3]}px`};
  white-space: nowrap;
`;

const CloseButton = styled.button`
  background: ${props =>
    Color(COLORS_VALUES[props.bg])
      .darken(0.15)
      .hex()};
  outline: none;
  display: flex;
  border: none;
  align-items: center;
  justify-content: center;
  margin-left: ${props => (props.reverse ? '0px' : `${space[2]}px`)};
  margin-right: ${props => (props.reverse ? `${space[2]}px` : '0px')};
  height: 24px;
  width: 24px;
  border-radius: 15px;
`;

const Tag = ({ children, removable, onRemove, callbackParams, reverse, ...otherProps }) => (
  <TagContainer
    lineHeight={14}
    pr={removable ? 0 : 3}
    color={COLORS.WHITE}
    bg={COLORS.PRIMARY_BLUE}
    width="max-content"
    reverse={reverse}
    removable={removable}
    {...otherProps}
  >
    {children}
    {removable && (
      <CloseButton
        reverse={reverse}
        bg={COLORS.PRIMARY_BLUE}
        onClick={() => onRemove(callbackParams)}
      >
        <Icon icon={new IconsStore(Icons).getIcon('close')} width={8} color={COLORS.WHITE} />
      </CloseButton>
    )}
  </TagContainer>
);

Tag.propTypes = {
  children: PropTypes.string.isRequired,
  removable: PropTypes.bool,
  onRemove: PropTypes.func,
  callbackParams: PropTypes.any, // eslint-disable-line
  reverse: PropTypes.bool,
};

Tag.defaultProps = {
  removable: true,
  onRemove: () => {},
  reverse: false,
};

export default Tag;
