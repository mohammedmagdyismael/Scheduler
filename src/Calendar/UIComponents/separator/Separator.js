import React from 'react';
import PropTypes from 'prop-types';

import StyledSeparator from './StyledSeparator';
import TextSeparator from './StyledTextSeparator';

const Separator = props =>
  props.text ? <TextSeparator {...props} /> : <StyledSeparator {...props} />;

Separator.propTypes = {
  text: PropTypes.string,
};

Separator.defaultProps = {
  text: '',
};

export default Separator;
