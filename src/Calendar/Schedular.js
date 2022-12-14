/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import ShimmerEffect from './UIComponents/shimmerEffect/ShimmerEffect';
import Rect from './UIComponents/shimmerEffect/Rect';
import { NoAnimationBox } from './UIComponents/shimmerEffect/NoAnimationContainer';
import { getSlotPositionInColumnGrid } from './helper';
import {
  SchedularViewsContainer,
  DayColumnWrapper,
  DayColumnsContainer,
  WeekColumn,
  DayColumnHeaderContainer,
  ColumnsWrapper,
  DayGridColumnsWrapper,
  TableShift,
  ColumnsContainer,
  ColumnsInnerContainer,
  SlotLoading,
} from './Schedular.style';
import ViewDay from './ViewDay';
import ViewWeek from './ViewWeek';

const VIEWS = {
  DAY: 0,
  WEEK: 1,
};

const Schedular = ({ ...props }) => {
  const {
    data,
    isLoading,
    firstTimeSlotInViewTime,
    emptyStateView,
    selectedViewIndex,
    extendDayColumnWrapper,
    language,
    extendSlot,
  } = props;

  useEffect(() => {
    if (!isLoading) {
      const schedularViewsContainerElement = document.getElementById('Schedular--views__container');
      if (schedularViewsContainerElement) {
        if (selectedViewIndex === VIEWS.DAY) {
          if (firstTimeSlotInViewTime) {
            schedularViewsContainerElement.scrollTo({
              top: firstTimeSlotInViewTime
                ? getSlotPositionInColumnGrid(firstTimeSlotInViewTime)
                : 0,
              behavior: 'smooth',
            });
          }
        } else {
          schedularViewsContainerElement.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [isLoading, selectedViewIndex]);

  const renderColumnsHeadersLoading = () => (
    <div style={{ display: 'flex' }}>
      {[1, 2, 3, 4].map((dayGrid, colIndex) => (
        <DayColumnWrapper
          extendDayColumnWrapper={extendDayColumnWrapper}
          key={`column-${colIndex}-header`}
        >
          <WeekColumn>
            <DayColumnHeaderContainer>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ShimmerEffect width={0.9}>
                  <NoAnimationBox width={1}>
                    <Rect width={1} height={10} />
                  </NoAnimationBox>
                </ShimmerEffect>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3px' }}>
                <ShimmerEffect width={0.7}>
                  <NoAnimationBox width={1}>
                    <Rect width={1} height={10} />
                  </NoAnimationBox>
                </ShimmerEffect>
              </div>
            </DayColumnHeaderContainer>
          </WeekColumn>
        </DayColumnWrapper>
      ))}
    </div>
  );

  const renderColumnsDataLoading = () => (
    <div style={{ display: 'flex', position: 'relative' }}>
      {[1, 2, 3, 4].map((dayGrid, colIndex) => (
        <DayColumnWrapper key={`column-${colIndex}`}>
          <WeekColumn>
            <div style={{ position: 'relative' }}>
              {/** Draw Empty Grid Column */}
              <SlotLoading extendSlot={extendSlot}>
                <p> </p>
              </SlotLoading>
            </div>
          </WeekColumn>
        </DayColumnWrapper>
      ))}
    </div>
  );

  const renderDayGridColumnsLoading = () => {
    const ColumnsView = (
      <ColumnsContainer>
        <ColumnsWrapper>
          {/** Time Line */}
          <ColumnsInnerContainer isRTL={language !== 'en'}>
            <TableShift />
          </ColumnsInnerContainer>
          {/** Day Column */}
          <div style={{ width: '100%' }} id="view-columns">
            {renderColumnsHeadersLoading()}
            <DayColumnsContainer id="view-columns-container">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>{renderColumnsDataLoading()}</div>
              </div>
            </DayColumnsContainer>
          </div>
        </ColumnsWrapper>
      </ColumnsContainer>
    );
    return ColumnsView;
  };

  const renderView = () => {
    if (!isLoading) {
      if (!(data && data.length) && emptyStateView) {
        return emptyStateView;
      }
      return selectedViewIndex === VIEWS.DAY ? <ViewDay {...props} /> : <ViewWeek {...props} />;
    }
    return <DayGridColumnsWrapper>{renderDayGridColumnsLoading()}</DayGridColumnsWrapper>;
  };

  return (
    <div>
      <SchedularViewsContainer id="Schedular--views__container">
        {renderView()}
      </SchedularViewsContainer>
    </div>
  );
};

export default Schedular;
