/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import Tooltip from 'app/components/tooltip/Tooltip';

export const RoomColumnTitle = styled.p`
  margin: 0px;
  text-align: center;

  color: #484848;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
`;

export const RoomColumnDescription = styled.p`
  margin: 0px;
  text-align: center;

  color: #7e7e7e;
  font-weight: 400;
  font-size: 11px;
  line-height: 18px;
`;

export const RoomColumnHeaderContainer = styled.div`
  // padding: 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 54px;
`;

export const MoreLabelContainer = styled.div`
  color: #0070cd;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  width: fit-content;
  margin: 8px;
  display: flex;
`;

export const WeekGridColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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

export const ColumnHeaderWrapper = styled.div`
  display: flex;
  background: #fff;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-width: 185px;
  ${props => props.extendDayColumnWrapper || ''};
`;

export const DataColumnsContainer = styled.div`
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

export const Column = styled.div`
  width: 100%;
  height: 54px;
`;

export const ColumnHeaderContainer = styled.div`
  // padding: 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 54px;
`;

export const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 65px 100%;
`;

export const ColumnsGridWrapper = styled.div`
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
  height: 44px;
`;

export const TableShiftWeek = styled.div`
  width: 65px;
  height: 54px;
`;

export const DaySlotName = styled.p`
  text-align: center;
  margin: 0px;
  height: ${props => (props.slotHeight ? `${props.slotHeight}px !important` : '132px !important')};

  font-weight: 400;
  font-size: 10px;
  line-height: 18px;
  color: #7e7e7e;
`;


export const ColumnsContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const RoomColumnWrapper = styled.div`
  display: flex;
  background: #fff;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-width: 185px;
  ${props => props.extendRoomColumnWrapper || ''};
`;

export const RoomsColumnsContainer = styled.div`
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

export const SlotContentContainer = styled.div`
  display: flex;
`;

export const SlotDescContainer = styled.div`
  display: inline-grid;
  margin: 0px 4px;
`;

export const SlotTitleContainer = styled.div`
  display: flex;
`;

export const RoomColumn = styled.div`
  width: 100%;
`;

export const SlotLoading = styled.div`
  height: 100vh;
  border: 1px solid #e7e7e76b;
  background-color: #ffff;
  ${props => props.extendSlot || ''};
`;

export const ExtendedToolTip = styled(Tooltip)`
  .tooltip--message {
    background-color: #1e1e1e !important;
    min-width: unset !important;
    top: unset !important;
    bottom: 110% !important;
    padding: 2px 12px !important;
    max-width: unset !important;
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

export const WeekGridColumnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledSeparator = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  border-top: 1px solid #db3226;
  z-index: 1;
  top: ${props => `${props.currentTimeRedLinePosition}px`};
`;

export const RedDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #db3226;
  z-index: 1;
  top: ${props => `${props.currentTimeRedLinePosition - 4}px`};
`;

export const SlotDesc = styled.p`
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #484848;
  margin: 0px 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${props => props.extendSlotDesc || ''};
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px 2px;
`;

export const SlotTitle = styled.p`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #484848;
  margin: 0px 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${props => props.extendSlotTitle || ''};
`;

export const DayColumnTitle = styled.p`
  margin: 0px;
  text-align: center;

  color: #484848;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
`;

export const DayColumnDescription = styled.p`
  margin: 0px;
  text-align: center;

  color: #7e7e7e;
  font-weight: 400;
  font-size: 11px;
  line-height: 18px;
`;

export const HalfSlot = styled.div`
  height: 28px;
  width: 100%;
  background: ${props => (props.isDisabled ? '#F7F8FA' : '#ffff')};
`;


export const HourSlotTimeValue = styled.p`
  text-align: center;
  margin: 0px;
  height: 58px !important;

  font-weight: 400;
  font-size: 10px;
  line-height: 18px;
  color: #7e7e7e;
`;

export const Slot = styled.div`
  display: flex;
  flex-direction: column;
  height: 56px !important;
  border: 1px solid #e7e7e76b;
  background-color: #ffff;
  ${props =>
    props.isClickable &&
    `
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #e7e7e76b;
    }
  `}
  ${props => props.extendSlot || ''};
`;

export const SlotWeek = styled.div`
  height: ${props => (props.slotHeight ? `${props.slotHeight}px !important` : '130px !important')};
  border: 1px solid #e7e7e76b;
  background: ${props => (props.isDisabled ? '#F7F8FA' : '#ffff')};
  ${props =>
    props.isClickable &&
    `
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #e7e7e76b;
    }
  `}
  ${props => props.extendSlot || ''};
`;


export const DataSlotWeek = styled.div`
  padding: 5px 8px 3px;
  gap: 12px;
  width: 89%;
  margin-bottom: 2px;
  
  border-radius: 4px;
  color: #fff;
  line-height: 22px;
  height: 20px;
  & > p {
    margin: 0px;
  }

  .tooltip {
    width: 100%;
  }

  .tooltip > div {
    overflow: hidden;
  }

  background: #e6f1ff;
  ${props =>
    props.isDimmed
      && `
      opacity: 0.4;
    `}

  ${props =>
    props.isClickable &&
    `
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #bbd9ff;
    }
  `}
  ${props => props.extendDataSlot || ''};
`;

export const DataSlot = styled.div`
  padding: 4px 8px;
  gap: 12px;
  position: absolute;
  width: 89%;
  
  border-radius: 4px;
  color: #fff;
  line-height: 22px;
  top: ${props => `${props.slotPosition}px`};
  height: ${props => (props.slotHeight ? `${props.slotHeight}px` : '')};
  & > p {
    margin: 0px;
  }

  .tooltip {
    width: 100%;
  }

  .tooltip > div {
    overflow: hidden;
  }

  background: #e6f1ff;
  ${props =>
    props.isDimmed
      && `
      opacity: 0.4;
    `}

  ${props =>
    props.isClickable &&
    `
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #bbd9ff;
    }
  `}
  ${props => props.extendDataSlot || ''};
`;
