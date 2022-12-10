import styled, { css } from 'styled-components';
import Tooltip from '../tooltip/Tooltip';

export const FiltersContainer = styled.div`
  background: #ffffff;
  box-shadow: inset 0px -1px 0px #e3e6ea;
  height: 64px;
`;

export const FiltersContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 64px;
  padding: 0px 55px;
  justify-content: space-between;
`;

export const FilterSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  // width: 25%;
`;

export const ExtendedToolTip = styled(Tooltip)`
  .tooltip--message {
    background-color: #1e1e1e !important;
    min-width: unset !important;
    top: unset !important;
    bottom: 110% !important;
    padding: 6px 12px !important;
  }
  .arrow--bottom {
    &::after {
      border-style: solid;
      border-width: 5px;
      content: '';
      position: absolute;

      border-color: #1e1e1e transparent transparent transparent !important;
      left: 50%;
      margin-left: -5px;
      top: 100%;
    }
  }
`;

export const IconContainer = styled.div`
  height: 36px;
  background: #fff;
  width: 36px;
  transition: width 0.5s ease-in-out;
  border-radius: 8px;
  border: ${props => (props.borderColor ? `1px solid ${props.borderColor}` : 'unset')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: ${props => (props.isClickable ? 'pointer' : 'unset')};
  & > svg {
    display: unset;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SwitchViewBtnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  direction: ${props => (props.isRtl ? 'ltr' : 'unset')};
`;

export const SwitchViewBtn = styled.div`
  width: 40px;
  height: 36px;
  display: flex;
  justify-content: center;
  ${props =>
    props.isRtl
      ? `
      :first-child {
        border: ${props.isSelected ? '1px solid #0070cd' : '1px solid #E3E6EA'};
        background-color: ${props.isSelected ? '1px solid #E6F1FF' : 'unset'};
        cursor: ${!props.isSelected ? 'pointer' : 'unset'};
        border-radius: 0px 8px 8px 0px;
      }
      :last-child {
        border: ${props.isSelected ? '1px solid #0070cd' : '1px solid #E3E6EA'};
        background-color: ${props.isSelected ? '1px solid #E6F1FF' : 'unset'};
        cursor: ${!props.isSelected ? 'pointer' : 'unset'};
        border-radius: 8px 0px 0px 8px;
      }
  `
      : `
      :first-child {
        border: ${props.isSelected ? '1px solid #0070cd' : '1px solid #E3E6EA'};
        background-color: ${props.isSelected ? '1px solid #E6F1FF' : 'unset'};
        cursor: ${!props.isSelected ? 'pointer' : 'unset'};
        border-radius: 8px 0px 0px 8px;
      }
      :last-child {
        border: ${props.isSelected ? '1px solid #0070cd' : '1px solid #E3E6EA'};
        background-color: ${props.isSelected ? '1px solid #E6F1FF' : 'unset'};
        cursor: ${!props.isSelected ? 'pointer' : 'unset'};
        border-radius: 0px 8px 8px 0px;
      }
  `};
`;

export const extendSearchContainerStyle = css`
  width: 100%;
  margin: 0px 5px;
  border-radius: 8px;
  & > div {
    background-color: unset;
    & > input {
      background-color: unset;
    }
  }

  ${props => props.theme.media.phone`
    margin: 0px 0px; 
  `};
  ${props => props.theme.media.tablet`
    margin: 0px 0px;
  `};
`;

export const SearchPatientContainer = styled.div`
  display: ${props => (props.expandSearchField ? 'block' : 'none')};
  transition: display 0.52s ease-in-out;

  position: absolute;
  top: 0;
  width: 100%;
  margin: 0px 0px;
`;

export const ExtendDropDownList = css`
  z-index: 10;
`;

export const ExtendDropDownListDatePicker = css`
  min-width: 125px;
  z-index: 10;
`;

export const ExtendDropDownListItem = css`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  color: #484848;
  padding: 6px 16px 6px 16px;
  box-shadow: unset;
`;

export const ExtendDropDownStyle = css`
  height: 36px;
  background-color: unset;
  font-size: 13px;
  padding: 2px 12px;
  border: unset;
`;

export const ExtendFieldText = css`
  font-size: 13px;
`;

export const SeparatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 12px;
`;

export const SeparatorLine = styled.div`
  height: 35px;
  border-right: 2px solid #e3e6ea;
`;
