/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../icon/Icon';
import IconsStore from '../../IconsStore';
import {
  FieldContainer,
  FieldLabel,
  SearchInput,
  FieldTag,
  ValueTagContainer,
  DisableOverLay,
  IsRequiredNote,
} from './InputField.style';

const InputField = ({ ...props }) => {
  const {
    fieldLabel,
    componentName,
    fieldValue,
    fieldTag,
    extendDropDownStyle,
    extendFieldText,
    icon,
    iconSize,
    onChange,
    validation,
    isDisabled,
    isRequired,
    range,
    isValid,
    isPassword,
    placeHolder,
  } = props;
  const [isFocued, setFocus] = useState(true);

  const onChangeAndValidation = inputedValue => {
    let isValidInput = true;
    if (validation && validation.length) {
      validation.forEach(check => {
        isValidInput = isValidInput && check.regex.test(inputedValue);
      });
    }
    if (range && range.length) {
      isValidInput = isValidInput && !(Number(inputedValue) < 0 || Number(inputedValue) > 100);
    }
    if (isValidInput || !inputedValue) {
      if (onChange) onChange(inputedValue);
    }
  };

  const getFocusOnInputField = () => {
    setFocus(true);
    if (document.getElementById(`input-container-${componentName}`)) {
      document.getElementById(`input-container-${componentName}`).focus();
    }
  };

  return (
    <div style={{ position: 'relative' }} key={componentName}>
      <DisableOverLay extendDropDownStyle={extendDropDownStyle} isDisabled={isDisabled} />
      <FieldContainer
        extendDropDownStyle={extendDropDownStyle}
        className={`input-${componentName}`}
        onClick={() => getFocusOnInputField()}
        isValid={isValid}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {fieldLabel && (
            <FieldLabel isFocused={isFocued}>
              {fieldLabel}
              {isRequired && <IsRequiredNote>*</IsRequiredNote>}
            </FieldLabel>
          )}
          {isFocued && (
            <ValueTagContainer>
              <FieldTag>{fieldTag}</FieldTag>
              {isFocued && (
                <SearchInput
                  autoComplete="off"
                  placeholder={placeHolder}
                  id={`input-container-${componentName}`}
                  type={isPassword ? 'password' : 'text'}
                  value={fieldValue}
                  onChange={e => {
                    onChangeAndValidation(e.target.value);
                  }}
                  extendFieldText={extendFieldText}
                />
              )}
            </ValueTagContainer>
          )}
        </div>
        {icon && <Icon className="icon" icon={IconsStore.getIcon(icon)} width={iconSize} />}
      </FieldContainer>
    </div>
  );
};

InputField.propTypes = {
  placeHolder: PropTypes.string,
  fieldValue: PropTypes.string,
  fieldLabel: PropTypes.string.isRequired,
  componentName: PropTypes.string,
  fieldTag: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  iconSize: PropTypes.number,
  extendDropDownStyle: PropTypes.string,
  validation: PropTypes.array,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  range: PropTypes.array,
  isValid: PropTypes.bool,
  isPassword: PropTypes.bool,
  extendFieldText: PropTypes.string,
};
export default InputField;
