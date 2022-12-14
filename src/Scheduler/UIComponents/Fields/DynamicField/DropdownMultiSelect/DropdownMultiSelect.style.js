import styled, { css } from 'styled-components';

export const FieldContainer = styled.div`
  background-color: ${props => (props.isDimmed ? '#f5f5f5 !important' : '#f1f4f6')};
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 7px 16px;
  // margin: 4px 0px;
  border-radius: 8px;
  border: ${props => (props.isValid ? '1px solid #e3e6ea' : '1px solid #db3226')};
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
  font-size: 16px;
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
  width: 100%;
  min-width: 300px;
  z-index: 1;
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
  font-size: 16px;
  line-height: 24px;
  cursor: ${props => (props.isMultipleSelection ? 'unset' : 'pointer')};
  :hover {
    background-color: #f5f5f5;
  }
  ${props => (props.extendDropDownListItem ? props.extendDropDownListItem : '')};
`;
export const ItemLabel = styled.p`
  color: ${props => (props.isChecked ? '#484848' : '#7E7E7E')};
`;
export const ItemDescription = styled.p`
  font-size: 13px;
  line-height: 20px;
  color: #9c9c9c;
`;

export const ItemContentContainer = styled.div``;

export const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin: 2% 0%;
  border-radius: 8px;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: unset;
  font-size: inherit;
  line-height: 24px;
  &:focus {
    outline: none;
  }
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

export const OptionItemContent = styled.div`
  margin: 0px 10px;
  display: inline-flex;
  flex-direction: column;
  align-self: ${props => (props.withOutDesciption ? 'center' : 'unset')};
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const extendTagContainer = css`
  border: 1px solid #e3e6ea;
  background: #ffffff;
`;

export const TagContainer = styled.div`
  padding: 3px 6px;
  margin: 2px 2px;
  background: #f1f4f6;
  border-radius: 8px;
  ${props => props.extendTagContainer || ''};
`;

export const TagWrapper = styled.div`
  display: flex;
`;

export const TagLabel = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #484848;
`;

export const IconContainer = styled.div`
  margin: 0px 6px;
  transform: ${props => (props.isAllTagsShown ? 'rotate(180deg)' : 'rotate(0deg)')};
  display: flex;
`;

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
