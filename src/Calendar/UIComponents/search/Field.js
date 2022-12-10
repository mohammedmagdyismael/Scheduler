import styled from 'styled-components';
import { fontSize, fontWeight, space } from 'styled-system';

import { COLORS, COLORS_VALUES } from '../base/Colors';

const Field = styled.input`
  border: none;
  background-color: ${COLORS_VALUES[COLORS.PAGE_BACKGROUND]};
  color: ${COLORS_VALUES[COLORS.TEXT]};
  outline: none;
  padding: 0;
  flex: 1;
  min-width: 100px;
  ${fontSize};
  ${fontWeight};
  ${space};
  ${props => (props.extendSearchStyle ? props.extendSearchStyle : '')};
`;

export default Field;
