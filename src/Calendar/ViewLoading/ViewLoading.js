/* eslint-disable react/no-array-index-key */
import React from 'react';
import ShimmerEffect from '../UIComponents/shimmerEffect/ShimmerEffect';
import Rect from '../UIComponents/shimmerEffect/Rect';
import { NoAnimationBox } from '../UIComponents/shimmerEffect/NoAnimationContainer';
import {
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
} from '../Schedular.style';

const ViewLoading = ({ ...props }) => {
  const {
    extendDayColumnWrapper,
    language,
    extendSlot,
  } = props;

  const renderColumnsHeadersLoading = () => (
    <div style={{ display: 'flex' }} id="schedular-Columns__headers__loading">
      {[1, 2, 3, 4].map((dayGrid, colIndex) => (
        <ColumnHeaderWrapper
          extendDayColumnWrapper={extendDayColumnWrapper}
          key={`column-${colIndex}-header`}
        >
          <Column>
            <ColumnHeaderContainer>
              <div style={{ display: 'flex', justifyContent: 'center' }} id="schedular-Columns__header-title__loading">
                <ShimmerEffect width={0.9}>
                  <NoAnimationBox width={1}>
                    <Rect width={1} height={10} />
                  </NoAnimationBox>
                </ShimmerEffect>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3px' }} id="schedular-Columns__header-description__loading">
                <ShimmerEffect width={0.7}>
                  <NoAnimationBox width={1}>
                    <Rect width={1} height={10} />
                  </NoAnimationBox>
                </ShimmerEffect>
              </div>
            </ColumnHeaderContainer>
          </Column>
        </ColumnHeaderWrapper>
      ))}
    </div>
  );

  const renderColumnsDataLoading = () => (
    <div style={{ display: 'flex', position: 'relative' }}>
      {[1, 2, 3, 4].map((dayGrid, colIndex) => (
        <ColumnHeaderWrapper key={`column-${colIndex}`}>
          <Column>
            <div style={{ position: 'relative' }}>
              {/** Draw Empty Grid Column */}
              <SlotLoading extendSlot={extendSlot}>
                <p> </p>
              </SlotLoading>
            </div>
          </Column>
        </ColumnHeaderWrapper>
      ))}
    </div>
  );

  const renderColumnsGridLoading = () => {
    const ColumnsView = (
      <ColumnsContainer>
        <ColumnsWrapper>
          {/** Empty Time Line for loading */}
          <ColumnsInnerContainer isRTL={language !== 'en'}>
            <TableShift />
          </ColumnsInnerContainer>
          {/** Empty Data Column */}
          <div style={{ width: '100%' }} id="schedular-Columns__loading">
            {renderColumnsHeadersLoading()}
            <DataColumnsContainer id="schedular-Columns__data__loading">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>{renderColumnsDataLoading()}</div>
              </div>
            </DataColumnsContainer>
          </div>
        </ColumnsWrapper>
      </ColumnsContainer>
    );
    return ColumnsView;
  };

  return (
    <ColumnsGridWrapper>{renderColumnsGridLoading()}</ColumnsGridWrapper>
  );
};

export default ViewLoading;
