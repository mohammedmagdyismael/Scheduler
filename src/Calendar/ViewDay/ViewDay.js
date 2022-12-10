/* eslint-disable react/no-array-index-key */
import React, { /* useEffect,  */ useState } from 'react';
import Icon from '../UIComponents/icon/Icon';
import IconsStore from '../UIComponents/icon/IconsStore';
import Icons from '../UIComponents/Icons';
import {
  ColumnsContainer,
  DayColumnWrapper,
  DayGridColumnsContainer,
  DayColumnTitle,
  DayGridColumnsWrapper,
  ColumnsWrapper,
  TableShift,
  HourSlotTimeValue,
  Slot,
  WeekColumn,
  DayColumnsContainer,
  DayColumnHeaderContainer,
  DataSlot,
  DayColumnDescription,
  IconContainer,
  StyledSeparator,
  RedDot,
  ColumnsInnerContainer,
  HalfSlot,
} from './ViewDay.style';
import {
  getLocalizedHoursSlots,
  getSlotPositionInColumnGrid,
  getSlotLengthInPixels,
  // roundUpNearest10,
  generateTimeSlots,
  renderDataSlot,
  renderDataSlotMini,
} from './helper';

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
  } = props;

  const isDisabledSlotShift = time => {
    const startingInterval = firstTimeSlotInViewTime.split('T')[1];
    const endingInterval = LastTimeSlotInViewTime.split('T')[1];
    const current = Number(`${time.split(':')[0]}${time.split(':')[1]}`);
    const startTime = Number(`${startingInterval.split(':')[0]}${startingInterval.split(':')[1]}`);
    const endTime = Number(`${endingInterval.split(':')[0]}${endingInterval.split(':')[1]}`);
    return current < startTime || endTime <= current || isOffDay;
  };

  const [currentTimeRedLinePosition, setCurrentTimeRedLinePosition] = useState(
    getSlotPositionInColumnGrid(new Date()),
  );
  /* const onScrollHorizontallyHandler = () => {
    const myElementToCheckIfClicksAreInsideOf = document.querySelector(
      '#view-week-columns-container',
    );
    const parentContainer = document.getElementById('view-week-columns');
    if (
      roundUpNearest10(
        Number(
          myElementToCheckIfClicksAreInsideOf.scrollWidth -
            parentContainer.getBoundingClientRect().width,
        ).toFixed(0),
      ) === roundUpNearest10(Number(myElementToCheckIfClicksAreInsideOf.scrollLeft).toFixed(0))
    ) {
      if (onHScrollEnds) onHScrollEnds();
    }
  };

  const addListener = () => {
    const myElementToCheckIfClicksAreInsideOf = document.querySelector(
      '#view-week-columns-container',
    );
    myElementToCheckIfClicksAreInsideOf.addEventListener(
      'scroll',
      onScrollHorizontallyHandler,
      true,
    );
  };

  const removeListener = () => {
    const myElementToCheckIfClicksAreInsideOf = document.querySelector(
      '#view-week-columns-container',
    );
    myElementToCheckIfClicksAreInsideOf.removeEventListener(
      'scroll',
      onScrollHorizontallyHandler,
      true,
    );
  };

  useEffect(() => {
    addListener();
    return () => {
      removeListener();
    };
  }, []); */

  console.log(data)
  const renderColumnsHeaders = () => (
    <div style={{ display: 'flex', position: 'sticky', top: '0', zIndex: '2', background: '#fff' }}>
      {data.map(dayGrid => (
        <DayColumnWrapper
          extendDayColumnWrapper={extendDayColumnWrapper}
          key={`column-${dayGrid.columnTitle}-${dayGrid.id}`}
        >
          <WeekColumn>
            <DayColumnHeaderContainer>
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
            </DayColumnHeaderContainer>
          </WeekColumn>
        </DayColumnWrapper>
      ))}
    </div>
  );

  const TimeSlots24Format = generateTimeSlots();

  const renderColumnsData = () => (
    <div style={{ display: 'flex', position: 'relative' }}>
      {isTodaySelected && (
        <StyledSeparator currentTimeRedLinePosition={currentTimeRedLinePosition} />
      )}
      {isTodaySelected && <RedDot currentTimeRedLinePosition={currentTimeRedLinePosition} />}
      {data.map(dayGrid => (
        <DayColumnWrapper key={`column-${dayGrid.columnTitle}`}>
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
                      onClickSlot(getLocalizedHoursSlots('en')[index]);
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
        </DayColumnWrapper>
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
          <ColumnsInnerContainer isRTL={language !== 'en'}>
            <TableShift />
            {getLocalizedHoursSlots(language).map(slotValue => (
              <HourSlotTimeValue key={slotValue}>{slotValue}</HourSlotTimeValue>
            ))}
          </ColumnsInnerContainer>
          {/** Day Column */}
          <div style={{ width: '100%' }} id="view-week-columns">
            {renderColumnsHeaders()}
            <DayColumnsContainer id="view-week-columns-container">
              <div style={{ display: 'flex', flexDirection: 'column', width: 'inhirit' }}>
                <div>{renderColumnsData()}</div>
              </div>
            </DayColumnsContainer>
          </div>
        </ColumnsWrapper>
      </ColumnsContainer>
    );
    return ColumnsView;
  };

  return (
    <DayGridColumnsContainer>
      <DayGridColumnsWrapper>{renderDayGridColumns()}</DayGridColumnsWrapper>
    </DayGridColumnsContainer>
  );
};

export default ViewDay;
