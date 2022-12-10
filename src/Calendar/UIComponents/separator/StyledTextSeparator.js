import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { width, space } from 'styled-system';

import Text from '../text/Text';
import { COLORS, COLORS_VALUES } from '../base/Colors';
import { FONT_TYPES, FONT_WEIGHTS } from '../base/Typography';
import Space from '../base/Space';

const StyledLine = styled.div`
  background-color: ${COLORS_VALUES[COLORS.SEPARATOR]};
  height: 1px;
  ${width};
  ${space};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SeparatorText = styled(Text)`
  color: ${COLORS_VALUES[COLORS.SEPARATOR]};
  font-weight: ${FONT_WEIGHTS.LIGHT};
  display: inline-table;
  margin: 0 ${Space[2]}px;
  white-space: nowrap;
`;

const TextSeparator = props => (
  <Flex alignItems="center" justifyContent="center" {...props}>
    <StyledLine width={30} />
    <SeparatorText tag="span" type={FONT_TYPES.CAPTION}>
      {props.text}
    </SeparatorText>
    <StyledLine width={1} />
  </Flex>
);

TextSeparator.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextSeparator;
