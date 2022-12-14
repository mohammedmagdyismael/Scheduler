/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { SCHEDULAR_VIEWS, getScrollPositionForDayStartTime } from './helper';
import { SchedularViewsContainer } from './Schedular.style';
import ViewDay from './ViewDay';
import ViewWeek from './ViewWeek';
import ViewLoading from './ViewLoading';

const Schedular = ({ ...props }) => {
  const {
    data,
    isLoading,
    firstTimeSlotInViewTime,
    emptyStateView,
    selectedViewIndex,
    startDate,
  } = props;

  const isSameDay = (d1, d2) =>
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();
    const isToday = date => isSameDay(date, new Date());
    const isTodaySelected = isToday(new Date(startDate), new Date());

  useEffect(() => {
    if (!isLoading) {
      const schedularViewsContainerElement = document.getElementById('Schedular--views__container');
      if (schedularViewsContainerElement) {
        if (selectedViewIndex === SCHEDULAR_VIEWS.DAY) {
          if (firstTimeSlotInViewTime) {
            schedularViewsContainerElement.scrollTo({
              top: firstTimeSlotInViewTime
                ? getScrollPositionForDayStartTime(firstTimeSlotInViewTime)
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

  const renderView = () => {
    if (!isLoading) {
      if (!(data && data.length) && emptyStateView) {
        return emptyStateView;
      }
      switch (selectedViewIndex) {
        case SCHEDULAR_VIEWS.DAY:
          return <ViewDay {...props} isTodaySelected={isTodaySelected} />;
        case SCHEDULAR_VIEWS.WEEK:
          return <ViewWeek {...props} />;
        default:
          break;
      }
    }
    return <ViewLoading />;
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
