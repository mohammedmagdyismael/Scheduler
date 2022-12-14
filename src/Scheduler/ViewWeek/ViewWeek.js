/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Icon from '../UIComponents/icon/Icon';
import IconsStore from '../UIComponents/icon/IconsStore';
import Icons from '../UIComponents/Icons';
import {
  ColumnsContainer,
  RoomColumnWrapper,
  WeekGridColumnsContainer,
  RoomColumnTitle,
  WeekGridColumnsWrapper,
  ColumnsWrapper,
  TableShiftWeek,
  DaySlotName,
  SlotWeek,
  RoomColumn,
  RoomsColumnsContainer,
  RoomColumnHeaderContainer,
  DataSlotWeek,
  RoomColumnDescription,
  IconContainer,
  ColumnsInnerContainer,
  MoreLabelContainer,
} from '../Schedular.style';
import { getLocalizedDaysSlots, renderDataSlotMiniWeek,NUM_SHIFTS_TO_SHOW, getDaysSlots } from '../helper';

const ViewWeek = ({ ...props }) => {
  const {
    onClickHeaderAction,
    data,
    isRTL,
    onClickDataSlot,
    onClickSlot,
    extendDataSlot,
    extendSlot,
    extendRoomColumnWrapper,
    extendSlotTitle,
    extendSlotDesc,
    weekStartDay,
    localization,
  } = props;

  const [expandingDayStatusList, setExpandingDayStatusList] = useState([
    {
      dayOfWeek: 'Saturday',
      isExpanded: false,
    },
    {
      dayOfWeek: 'Sunday',
      isExpanded: false,
    },
    {
      dayOfWeek: 'Monday',
      isExpanded: false,
    },
    {
      dayOfWeek: 'Tuesday',
      isExpanded: false,
    },
    {
      dayOfWeek: 'Wednesday',
      isExpanded: false,
    },
    {
      dayOfWeek: 'Thursday',
      isExpanded: false,
    },
    {
      dayOfWeek: 'Friday',
      isExpanded: false,
    },
  ]);

  const renderColumnsHeaders = () => (
    <div style={{ display: 'flex', position: 'sticky', top: '0', zIndex: '2', background: '#fff' }}>
      {data.map(dayGrid => (
        <RoomColumnWrapper
          extendRoomColumnWrapper={extendRoomColumnWrapper}
          key={`column-${dayGrid.columnTitle}-${dayGrid.id}`}
        >
          <RoomColumn>
            <RoomColumnHeaderContainer>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <RoomColumnTitle>{dayGrid.columnTitle}</RoomColumnTitle>
                {onClickHeaderAction && (
                  <IconContainer
                    style={{ margin: '0px 4px', cursor: 'pointer' }}
                    onClick={() => {
                      if (onClickHeaderAction) {
                        onClickHeaderAction(dayGrid);
                      }
                    }}
                  >
                    <Icon
                      className="icon"
                      icon={new IconsStore(Icons).getIcon('plus')}
                      width={12}
                      color="#7E7E7E"
                    />
                  </IconContainer>
                )}
              </div>
              {dayGrid.columnDescription && (
                <RoomColumnDescription>{dayGrid.columnDescription}</RoomColumnDescription>
              )}
            </RoomColumnHeaderContainer>
          </RoomColumn>
        </RoomColumnWrapper>
      ))}
    </div>
  );

  const expandDay = dayName => {
    const temp = [...expandingDayStatusList];
    temp.forEach((day, index) => {
      if (day.dayOfWeek === dayName) {
        temp[index].isExpanded = true;
      }
    });
    setExpandingDayStatusList(temp);
  };

  const showMoreLabel = (dayGrid, dayName) => {
    const dayExpandStatus = expandingDayStatusList.find(dayObj => dayObj.dayOfWeek === dayName);
    const dayDetails = dayGrid.columnSlots.find(day => day.dayOfWeek === dayName);
    if (
      dayDetails &&
      dayDetails.daySlots &&
      dayDetails.daySlots.length > NUM_SHIFTS_TO_SHOW &&
      !dayExpandStatus.isExpanded
    ) {
      return (
        <MoreLabelContainer onClick={e => { expandDay(dayName); e.stopPropagation(); }}>
          <p style={{ margin: '0px' }}>{`${dayDetails.daySlots.length - NUM_SHIFTS_TO_SHOW} ${localization.more}`}</p>
          <div style={{ margin: '2px 6px 0px' }}>
            <Icon
              className="icon"
              icon={new IconsStore(Icons).getIcon('downcarret')}
              width={12}
              color="#0070cd"
            />
          </div>
        </MoreLabelContainer>
      );
    }
    return false;
  };

  const getSlotHeight = (dataList, dayName) => {
    if (dataList && dataList.length) {
      const dayExpandStatus = expandingDayStatusList.find(dayObj => dayObj.dayOfWeek === dayName);
      let maxNumberOfShiftsInDay = 0;
      dataList.forEach(dayGrid => {
        const { columnSlots } = dayGrid;
        const selectedDayOfRoom = columnSlots.find(day => day.dayOfWeek === dayName);

        if (
          selectedDayOfRoom &&
          selectedDayOfRoom.daySlots &&
          selectedDayOfRoom.daySlots.length > maxNumberOfShiftsInDay
        ) {
          maxNumberOfShiftsInDay = selectedDayOfRoom.daySlots.length;
        }
      });

      const totalHeightOfSlot = 28 * maxNumberOfShiftsInDay;
      let expansionheight = 0;
      if (totalHeightOfSlot > 130) {
        expansionheight = totalHeightOfSlot + 20;
      } else {
        expansionheight = 130;
      }

      return dayExpandStatus.isExpanded ? expansionheight : 130;
    }
    return 130;
  };

  const renderColumnsData = () => (
    <div style={{ display: 'flex', position: 'relative' }}>
      {data.map(dayGrid => (
        <RoomColumnWrapper key={`column-${dayGrid.columnTitle}`}>
          <RoomColumn>
            <div style={{ position: 'relative' }}>
              {/** Draw Empty Grid Column */}
              {getDaysSlots(weekStartDay).map((slot, index) => (
                <SlotWeek
                  extendSlot={extendSlot}
                  id={`${slot}-${index}`}
                  key={`cell-${slot}-${index}`}
                  isClickable={onClickSlot}
                  onClick={() => {
                    if (onClickSlot) {
                      onClickSlot(getDaysSlots(weekStartDay)[index]);
                    }
                  }}
                  slotHeight={getSlotHeight(data, slot)}
                  isDisabled={
                    dayGrid &&
                    dayGrid.columnSlots &&
                    dayGrid.columnSlots[index] &&
                    dayGrid.columnSlots[index].isDisabled
                  }
                >
                  {dayGrid.columnSlots.map(columnSlot => {
                    if (slot === columnSlot.dayOfWeek) {
                      const slotsList = [];
                      const { daySlots } = columnSlot;
                      daySlots.forEach(slotObj => {
                        slotsList.push(
                          <DataSlotWeek
                            isDimmed={slotObj.isDimmed}
                            extendDataSlot={extendDataSlot}
                            key={`${dayGrid.columnTitle}-${slotObj.id}`}
                            isClickable={onClickDataSlot}
                            onClick={() => {
                              if (onClickDataSlot) onClickDataSlot(slotObj);
                            }}
                          >
                            {renderDataSlotMiniWeek(slotObj, extendSlotTitle, extendSlotDesc)}
                          </DataSlotWeek>,
                        );
                      });
                      const dayExpandStatus = expandingDayStatusList.find(
                        dayObj => dayObj.dayOfWeek === slot,
                      );
                      return dayExpandStatus.isExpanded
                        ? slotsList
                        : slotsList.slice(0, NUM_SHIFTS_TO_SHOW);
                    }
                  })}
                  {showMoreLabel(dayGrid, slot)}
                </SlotWeek>
              ))}
            </div>
          </RoomColumn>
        </RoomColumnWrapper>
      ))}
    </div>
  );

  const renderDayGridColumns = () => {
    const ColumnsView = (
      <ColumnsContainer>
        <ColumnsWrapper>
          {/** Time Line */}
          <ColumnsInnerContainer isRTL={isRTL}>
            <TableShiftWeek />
            {getLocalizedDaysSlots(localization, weekStartDay).map((slotValue, index) => (
              <DaySlotName
                slotHeight={getSlotHeight(data, getDaysSlots(weekStartDay)[index]) + 2}
                key={slotValue}
              >
                {slotValue}
              </DaySlotName>
            ))}
          </ColumnsInnerContainer>
          {/** Day Column */}
          <div style={{ width: '100%' }} id="schedular-Columns__loading">
            {renderColumnsHeaders()}
            <RoomsColumnsContainer id="schedular-Columns__data__loading">
              <div style={{ display: 'flex', flexDirection: 'column', width: 'inhirit' }}>
                <div>{renderColumnsData()}</div>
              </div>
            </RoomsColumnsContainer>
          </div>
        </ColumnsWrapper>
      </ColumnsContainer>
    );
    return ColumnsView;
  };

  return (
    <WeekGridColumnsContainer>
      <WeekGridColumnsWrapper>{renderDayGridColumns()}</WeekGridColumnsWrapper>
    </WeekGridColumnsContainer>
  );
};

export default ViewWeek;
