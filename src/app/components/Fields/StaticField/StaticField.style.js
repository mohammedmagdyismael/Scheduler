import styled from 'styled-components';

export const FieldContainer = styled.div`
  background-color: #f1f4f6;
  border: 1px solid #e3e6ea;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: column;
  padding: 7px 16px;
  // margin: 4px 0px;
  ${props => (props.extendFieldContainer ? props.extendFieldContainer : '')};
`;
export const FieldLabel = styled.p`
  color: #9c9c9c;
  font-size: 12px;
  line-height: 18px;
`;
export const FieldValue = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #484848;
  direction: ${props => (props.language === 'ar' ? 'ltr' : 'unset')};
  margin: ${props => (props.isTagged ? '0px 8px' : 'unset')};
  ${props => (props.extendFieldText ? props.extendFieldText : '')};
`;

export const FieldTag = styled(FieldValue)`
  margin: 0px 0px;
`;

export const ValueTagContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
