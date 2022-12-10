/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  FieldContainer,
  FieldLabel,
  FieldValue,
  FieldTag,
  ValueTagContainer,
} from './StaticField.style';

const StaticField = ({ ...props }) => {
  const {
    fieldLabel,
    fieldValue,
    fieldTag,
    extendFieldContainer,
    language,
    extendFieldText,
  } = props;
  return (
    <FieldContainer extendFieldContainer={extendFieldContainer}>
      {fieldLabel && <FieldLabel>{fieldLabel}</FieldLabel>}
      <ValueTagContainer>
        {fieldTag && <FieldTag>{fieldTag}</FieldTag>}
        <FieldValue language={language} isTagged={fieldTag} extendFieldText={extendFieldText}>
          {fieldValue}
        </FieldValue>
      </ValueTagContainer>
    </FieldContainer>
  );
};

StaticField.propTypes = {
  fieldValue: PropTypes.string,
  fieldLabel: PropTypes.string.isRequired,
  fieldTag: PropTypes.string,
  extendFieldContainer: PropTypes.array,
  extendFieldText: PropTypes.array,
  language: PropTypes.string,
};
export default StaticField;
