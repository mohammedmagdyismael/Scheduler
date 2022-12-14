import styled from 'styled-components';
import PropTypes from 'prop-types';
import { space } from 'styled-system';

const Circle = styled.div`
  border-radius: 50%;
  height: ${props => props.radius}px;
  min-height: ${props => props.radius}px;
  width: ${props => props.radius}px;
  min-width: ${props => props.radius}px;
  ${space};
`;

Circle.propTypes = {
  radius: PropTypes.number,
};

Circle.defaultProps = {
  radius: 25,
};

export default Circle;
