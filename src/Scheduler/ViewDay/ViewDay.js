/* eslint-disable react/no-array-index-key */
import React, { /* useEffect,  */ useMemo, useState } from 'react';
import Icon from '../UIComponents/icon/Icon';
import IconsStore from '../UIComponents/icon/IconsStore';
import Icons from '../UIComponents/Icons';
import {
  ColumnsContainer,
  ColumnHeaderWrapper,
  DayGridColumnsContainer,
  DayColumnTitle,
  ColumnsGridWrapper,
  ColumnsWrapper,
  TableShift,
  HourSlotTimeValue,
  Slot,
  Column,
  DataColumnsContainer,
  ColumnHeaderContainer,
  DataSlot,
  DayColumnDescription,
  IconContainer,
  StyledSeparator,
  RedDot,
  ColumnsInnerContainer,
  HalfSlot,
} from '../Schedular.style';
import {
  getHoursSlots,
  getSlotPositionInColumnGrid,
  getSlotLengthInPixels,
  // roundUpNearest10,
  generateTimeSlots,
  renderDataSlot,
  renderDataSlotMini,
} from '../helper';

const ViewDay = ({ ...props }) => {
  const {
    onClickHeaderAction,
    data,
    language,
    // onHScrollEnds,
    isTodaySelected,
    onClickDataSlot,
    onClickSlot,
    extendDataSlot,
    extendSlot,
    extendDayColumnWrapper,
    extendSlotTitle,
    extendSlotDesc,
    firstTimeSlotInViewTime,
    LastTimeSlotInViewTime,
    isOffDay,
    localization,
    isRTL,
  } = props;

  const TimeSlots24Format = useMemo(() => generateTimeSlots(), []);
  const isDisabledSlotShift = time => {
    const current = Number(`${time.split(':')[0]}${time.split(':')[1]}`);
    const startTime = Number(`${firstTimeSlotInViewTime.split(':')[0]}${firstTimeSlotInViewTime.split(':')[1]}`);
    const endTime = Number(`${LastTimeSlotInViewTime.split(':')[0]}${LastTimeSlotInViewTime.split(':')[1]}`);
    return current < startTime || endTime <= current || isOffDay;
  };
  const [currentTimeRedLinePosition, setCurrentTimeRedLinePosition] = useState(
    getSlotPositionInColumnGrid(new Date()),
  );

  const renderColumnsHeaders = () => (
    <div style={{ display: 'flex', position: 'sticky', top: '0', zIndex: '2', background: '#fff' }}>
      {data.map(dayGrid => (
        <ColumnHeaderWrapper
          extendDayColumnWrapper={extendDayColumnWrapper}
          key={`column-${dayGrid.columnTitle}-${dayGrid.id}`}
        >
          <Column>
            <ColumnHeaderContainer>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <DayColumnTitle>{dayGrid.columnTitle}</DayColumnTitle>
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
                <DayColumnDescription>{dayGrid.columnDescription}</DayColumnDescription>
              )}
            </ColumnHeaderContainer>
          </Column>
        </ColumnHeaderWrapper>
      ))}
    </div>
  );

  const renderColumnsData = () => (
    <div style={{ display: 'flex', position: 'relative' }}>
      {isTodaySelected && (
        <StyledSeparator currentTimeRedLinePosition={currentTimeRedLinePosition} />
      )}
      {isTodaySelected && <RedDot currentTimeRedLinePosition={currentTimeRedLinePosition} />}
      {data.map(dayGrid => (
        <ColumnHeaderWrapper key={`column-${dayGrid.columnTitle}`}>
          <div style={{ width: '100%', height: '100%'}}>
            <div style={{ position: 'relative' }}>
              {/** Draw Empty Grid Column */}
              {TimeSlots24Format.slice(0, 24).map((slot, index) => (
                <Slot
                  extendSlot={extendSlot}
                  id={TimeSlots24Format[index + index]}
                  key={`cell-${TimeSlots24Format[index + index]}`}
                  isClickable={onClickSlot}
                  onClick={() => {
                    if (onClickSlot) {
                      onClickSlot(getHoursSlots()[index]);
                    }
                  }}
                >
                  <HalfSlot
                    key={TimeSlots24Format[index + index]}
                    isDisabled={isDisabledSlotShift(TimeSlots24Format[index + index])}
                  >
                    <p> </p>
                  </HalfSlot>
                  <HalfSlot
                    key={TimeSlots24Format[index + index + 1]}
                    isDisabled={isDisabledSlotShift(TimeSlots24Format[index + index + 1])}
                  >
                    <p> </p>
                  </HalfSlot>
                </Slot>
              ))}
              {/** Draw Day Slots in Column */}
              {dayGrid.columnSlots.map(columnSlot => {
                const durationInPixels = getSlotLengthInPixels(columnSlot.from, columnSlot.to);
                const slotPosition = getSlotPositionInColumnGrid(columnSlot.from);
                return (
                  <DataSlot
                    isDimmed={columnSlot.isDimmed}
                    extendDataSlot={extendDataSlot}
                    slotHeight={durationInPixels}
                    slotPosition={slotPosition}
                    key={`${dayGrid.columnTitle}-${columnSlot.id}`}
                    isClickable={onClickDataSlot}
                    onClick={() => {
                      if (onClickDataSlot) onClickDataSlot(columnSlot);
                    }}
                  >
                    {durationInPixels > 55
                      ? renderDataSlot(columnSlot, extendSlotTitle, extendSlotDesc)
                      : renderDataSlotMini(columnSlot, extendSlotTitle, extendSlotDesc)}
                  </DataSlot>
                );
              })}
            </div>
          </div>
        </ColumnHeaderWrapper>
      ))}
    </div>
  );

  setInterval(() => {
    setCurrentTimeRedLinePosition(getSlotPositionInColumnGrid(new Date()));
  }, 60000);

  const renderDayGridColumns = () => {
    const ColumnsView = (
      <ColumnsContainer>
        <ColumnsWrapper>
          {/** Time Line */}
          <ColumnsInnerContainer isRTL={isRTL}>
            <TableShift />
            {getHoursSlots(localization, language).map(slotValue => (
              <HourSlotTimeValue key={slotValue}>{slotValue}</HourSlotTimeValue>
            ))}
          </ColumnsInnerContainer>
          {/** Day Column */}
          <div style={{ width: '100%' }} id="view-week-columns">
            {renderColumnsHeaders()}
            <DataColumnsContainer id="view-week-columns-container">
              <div style={{ display: 'flex', flexDirection: 'column', width: 'inhirit' }}>
                <div>{renderColumnsData()}</div>
              </div>
            </DataColumnsContainer>
          </div>
        </ColumnsWrapper>
      </ColumnsContainer>
    );
    return ColumnsView;
  };

  return (
    <DayGridColumnsContainer>
      <ColumnsGridWrapper>{renderDayGridColumns()}</ColumnsGridWrapper>
    </DayGridColumnsContainer>
  );
};

export default ViewDay;
