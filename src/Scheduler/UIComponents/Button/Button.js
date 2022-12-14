/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import ShimmerEffect from '../shimmerEffect/ShimmerEffect';
import { NoAnimationFlex } from '../shimmerEffect/NoAnimationContainer';
import Spinner from '../spinner/Spinner';

import IconsStore from './IconsStore';

import { ButtonContainer, ButtonText, LoadingButton } from './Button.style';

const NewButton = ({
  btnText,
  onClick,
  iconName,
  iconColor,
  iconSize,
  extendButtonStyle,
  isLoading,
  isSubmitting,
  disabled,
}) => (
  <div>
    {!isLoading ? (
      <ButtonContainer
        extendButtonStyle={extendButtonStyle}
        onClick={() => {
          if (onClick && !isSubmitting && !disabled) onClick();
        }}
        disabled={disabled}
      >
        {isSubmitting ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Spinner radius={20} color={iconColor} />
          </div>
        ) : (
          <div style={{ display: 'flex' }}>
            {iconName && (
              <div style={{ margin: '0px 5px', display: 'flex' }}>
                <Icon
                  className="icon"
                  icon={IconsStore.getIcon(iconName)}
                  width={iconSize || 12}
                  color={disabled ? '#484848' : iconColor}
                />
              </div>
            )}
          </div>
        )}
        {btnText && <ButtonText>{btnText}</ButtonText>}
      </ButtonContainer>
    ) : (
      <ShimmerEffect flexDirection="column">
        <NoAnimationFlex>
          <LoadingButton height={36} width={160} />
        </NoAnimationFlex>
      </ShimmerEffect>
    )}
  </div>
);

NewButton.propTypes = {
  btnText: PropTypes.string,
  iconName: PropTypes.string,
  onClick: PropTypes.func,
  iconColor: PropTypes.string,
  isLoading: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default NewButton;
