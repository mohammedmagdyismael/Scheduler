/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const GrayOverLay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgb(185 185 185 / 27%);
  z-index: 5;
  text-align: center;
  padding: 19%;
`;

export const SchedularViewsContainer = styled.div`
  height: 100vh;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 1px;
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {
    background: #9c9c9c;
    border-radius: 15px;
  }
`;

export const DayColumnWrapper = styled.div`
  display: flex;
  background: #fff;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-width: 185px;
  ${props => props.extendDayColumnWrapper || ''};
`;

export const DayColumnsContainer = styled.div`
  // overflow-x: scroll;
  // width: min-content;
  display: grid;
  // overflow: auto;
  ::-webkit-scrollbar {
    width: 1px;
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {
    background: #9c9c9c;
    border-radius: 15px;
  }
`;

export const WeekColumn = styled.div`
  width: 100%;
`;

export const DayColumnHeaderContainer = styled.div`
  padding: 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 54px;
`;

export const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 65px 100%;
`;

export const DayGridColumnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ColumnsInnerContainer = styled.div`
  position: sticky;
  top: 0;
  right: ${props => (props.isRTL ? '0' : 'unset')};
  left: ${props => (props.isRTL ? 'unset' : '0')};
  z-index: 10;
  background: #fff;
`;

export const DayGridColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableShift = styled.div`
  width: 65px;
  height: 45px;
`;

export const ColumnsContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const SlotLoading = styled.div`
  height: 100vh;
  border: 1px solid #e7e7e76b;
  background-color: #ffff;
  ${props => props.extendSlot || ''};
`;
