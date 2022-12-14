/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import ShimmerEffect from './UIComponents/shimmerEffect/ShimmerEffect';
import Rect from './UIComponents/shimmerEffect/Rect';
import { NoAnimationBox } from './UIComponents/shimmerEffect/NoAnimationContainer';
import { getSlotPositionInColumnGrid, SCHEDULAR_VIEWS } from './helper';
import {
  SchedularViewsContainer,
  ColumnHeaderWrapper,
  DataColumnsContainer,
  Column,
  ColumnHeaderContainer,
  ColumnsWrapper,
  ColumnsGridWrapper,
  TableShift,
  ColumnsContainer,
  ColumnsInnerContainer,
  SlotLoading,
} from './Schedular.style';
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
    extendDayColumnWrapper,
    language,
    extendSlot,
  } = props;

  useEffect(() => {
    if (!isLoading) {
      const schedularViewsContainerElement = document.getElementById('Schedular--views__container');
      if (schedularViewsContainerElement) {
        if (selectedViewIndex === SCHEDULAR_VIEWS.DAY) {
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

  const renderView = () => {
    if (!isLoading) {
      if (!(data && data.length) && emptyStateView) {
        return emptyStateView;
      }
      return selectedViewIndex === SCHEDULAR_VIEWS.DAY ? <ViewDay {...props} /> : <ViewWeek {...props} />;
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
