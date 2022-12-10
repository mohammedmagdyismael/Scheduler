import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';

import { COLORS_VALUES, COLORS } from '../base/Colors';
import generateKey from '../base/GenerateKey';

const IconContainer = styled.svg`
  ${space};
`;

const HEIGHT = 1024;

const Icon = props => {
  const { icon, width, color } = props;
  const viewBoxWidth = icon.icon.width || HEIGHT;
  const viewBox = `0 0 ${viewBoxWidth} ${HEIGHT}`;
  const { paths } = icon.icon;

  return (
    <IconContainer viewBox={viewBox} width={width} {...props}>
      <g>
        {paths.map(path => (
          <path fill={COLORS_VALUES[color] || color} key={generateKey('path')} d={path} />
        ))}
      </g>
    </IconContainer>
  );
};

export const iconPropTypes = PropTypes.shape({
  paths: PropTypes.array,
  width: PropTypes.number,
  attrs: PropTypes.array,
  isMulticolor: PropTypes.bool,
  isMulticolor2: PropTypes.bool,
  colorPermutations: PropTypes.any,
  tags: PropTypes.array,
  grid: PropTypes.number,
});

Icon.propTypes = {
  icon: iconPropTypes.isRequired,
  width: PropTypes.number,
  color: PropTypes.string,
};

Icon.defaultProps = {
  color: COLORS.TEXT,
  width: HEIGHT,
};

export default Icon;
