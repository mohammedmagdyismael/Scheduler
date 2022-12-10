/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

export const extendTodayButton = css`
  background: #ffffff;
  border: 1px solid #e3e6ea;
  border-radius: 8px;
  height: 36px;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
`;

export const extendDateNavButton = css`
  background: #ffffff;
  border: 1px solid #e3e6ea;
  border-radius: 8px;
  height: 36px;
  font-weight: 400;
  font-size: 24px;
  line-height: 12px;
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PickerBtns = styled(DatePickerWrapper)`
  width: 98px;
  justify-content: space-between;
  margin: 0px 8px;
`;

export const DateContainer = styled(DatePickerWrapper)`
  padding: 0px 6px;
  cursor: pointer;
  width: 190px;
  display: flex;
  justify-content: center;
  ${props =>
    props.isCalendarShown
      ? `
    background: #f7f8fa;
  border-radius: 6px;
  `
      : ''};
`;

export const DateText = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 33px;
  color: #484848;
  margin: 0px 6px;
  min-width: 155px;
  text-align: center;
`;
