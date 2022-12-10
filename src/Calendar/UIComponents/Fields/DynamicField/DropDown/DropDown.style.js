import styled from 'styled-components';

export const FieldContainer = styled.div`
  background-color: ${props => (props.isDimmed ? '#f5f5f5 !important' : '#f1f4f6')};
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  border: ${props => (props.isValid ? '1px solid #e3e6ea' : '1px solid #db3226')};
  justify-content: space-between;
  padding: 7px 16px;
  // margin: 4px 0px;
  border-radius: 8px;
  cursor: ${props => (props.isDimmed ? 'unset !important' : 'pointer')};
  ${props => (props.extendDropDownStyle ? props.extendDropDownStyle : '')};
`;

export const LabelValueContainer = styled.div`
  width: 90%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FieldLabel = styled.div`
  color: #9c9c9c;
  width: 100%;
  font-size: ${props => (props.isValueSelected ? '12px' : '16px')};
  line-height: ${props => (props.isValueSelected ? '18px' : '40px')};
`;
export const FieldValue = styled.p`
  width: 100%;
  font-size: inherit;
  line-height: 24px;
  color: ${props => (props.isPlaceHolder ? '#9c9c9c' : '#484848')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${props => (props.extendFieldText ? props.extendFieldText : '')};
`;

export const ListContainer = styled.div`
  position: absolute;
  top: 6px;
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.16));
  background-color: #fff;
  min-width: 300px;
  width: 100%;
  z-index: 2;
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '16px')};
  max-height: 210px;
  overflow: auto;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #9c9c9c;
    border-radius: 15px;
  }
  ${props => (props.extendDropDownList ? props.extendDropDownList : '')};
`;
export const ListItem = styled.div`
  box-shadow: inset 0px -1px 0px #f1f4f6;
  padding: 8px 12px 8px 16px;
  line-height: 24px;
  ${props =>
    props.isEnabled
      ? `
      cursor: ${props.isMultipleSelection ? 'unset' : 'pointer'};
    `
      : `
    cursor: unset;
    `};
  :hover {
    background-color: #f5f5f5;
  }
  ${props => (props.extendDropDownListItem ? props.extendDropDownListItem : '')};
`;
export const ItemLabel = styled.p`
  color: ${props => (props.isEnabled ? '#484848' : '#B9B9B9')};
  font-size: inherit;
`;
export const ItemDescription = styled.p`
  font-size: 13px;
  line-height: 20px;
  color: ${props => (props.isEnabled ? '#9c9c9c' : '#B9B9B9')};
  direction: ${props => (props.language === 'ar' ? 'ltr' : 'unset')};
  text-align: ${props => (props.language === 'ar' ? 'right' : 'unset')};
`;

export const ItemContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CheckBox = styled.input`
  width: 24px;
  height: 24px;
  margin: 2% 0%;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: unset;
  font-size: inherit;
  ::placeholder {
    font-size: inherit;
  }
  line-height: 24px;
  &:focus {
    outline: none;
  }
  ${props => (props.extendFieldText ? props.extendFieldText : '')};
`;

export const IsRequiredNote = styled.p`
  display: inline-flex;
  margin: 0px 3px;
  color: #db3226;
`;

export const DisableOverLay = styled.div`
  width: 100%;
  min-height: 100%;
  border: 1px solid #e3e6ea;
  border-radius: 8px;
  background-color: #f1f4f69c;
  position: absolute;
  display: ${props => (!props.isDisabled ? 'none' : 'block')};
`;

export const Container = styled.div`
  position: relative;
  &:hover > div {
    visibility: visible;
  }
`;

export const TooltipContainer = styled.div`
  position: absolute;
  display: inline-block;
  width: fit-content;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
  padding: 5px 8px;
  width: fit-content;
  bottom: 100%;
  left: ${props => (props.language === 'en' ? '60px' : 'unset')};
  margin-left: -60px;
  visibility: hidden;
  background: #e2e3e4;
`;
export const TooltipMessage = styled.p``;

export const CategoryLabelContainer = styled.div`
  background: #f1f4f6;
  height: 38px;
  width: 100%;
  padding: 8px 16px;
`;

export const CategoryLabel = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  color: #484848;
`;
