import styled from 'styled-components';
import PropTypes from 'prop-types';
import { space, width } from 'styled-system';

const Rect = styled.div`
  border-radius: 16px;
  height: ${props => props.height}px;
  ${width};
  ${space};
`;

Rect.propTypes = {
  height: PropTypes.number,
};

Rect.defaultProps = {
  height: 25,
  width: 250,
};

export default Rect;
