import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Text from '../text/Text';
import withDisplayName from '../WithDisplayName';
import './Tooltip.css';

const TOP = 'top';
const BOTTOM = 'bottom';
const LEFT = 'left';
const RIGHT = 'right';

class Tooltip extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    position: PropTypes.oneOf([TOP, BOTTOM, RIGHT, LEFT]),
    arrowPosition: PropTypes.oneOf([TOP, BOTTOM, RIGHT, LEFT]),
    show: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    showOnHover: PropTypes.bool,
  };

  static defaultProps = {
    position: BOTTOM,
    arrowPosition: TOP,
    className: '',
    show: false,
    showOnHover: false,
  };

  state = {
    show: this.props.show,
  };

  render() {
    const { position, children, arrowPosition, message, className, showOnHover } = this.props;
    const { show } = this.state;

    return (
      <div
        className={classnames(
          'tooltip',
          className,
          { [`tooltip--${position}`]: true },
          {
            'tooltip--show': show,
          },
          {
            'tooltip--toggler': showOnHover,
          },
        )}
      >
        <div>{children}</div>
        <Text className={`tooltip--message arrow--${arrowPosition}`}>{message}</Text>
      </div>
    );
  }
}

export default withDisplayName(Tooltip, 'Tooltip');
