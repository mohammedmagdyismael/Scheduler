import React from 'react';
import Schedular from './Calendar';
import './App.css'

const App = ({ ...props }) => {


    /**
     * selectedViewIndex: => Day view: 0 , Week view: 1  
     * isOffDay: will make all the dy dimmed
     * weekStartDay: Saturday, Sunday, Monday
     */

    /* {
        id: 0,
        title: 'Details title',
        titleIcon: undefined,
        descA: 'Details Description A',
        descAIcon: 'specialty',
        descB: 'Details Description B',
        descBIcon: 'time',
        from: "2020-01-01T01:00:00",
        to: "2020-01-01T02:30:00",
        isDimmed: false,
      } */

    const dataForDayViewSample = [
        {
            id: 0,
            columnTitle: 'Column Name 1',
            columnDescription: 'Column Description',
            columnSlots: [
                {
                    id: 0,
                    title: 'Details title',
                    titleIcon: undefined,
                    descA: 'Details Description A',
                    descAIcon: 'specialty',
                    descB: 'Details Description B',
                    descBIcon: 'time',
                    from: "2020-01-01T08:00:00",
                    to: "2020-01-01T09:30:00",
                    isDimmed: true,
                  } 
            ]
        },
        {
            id: 1,
            columnTitle: 'Column Name 2',
            columnDescription: 'Column Description',
            columnSlots: [
                {
                    id: 0,
                    title: 'Details title',
                    titleIcon: undefined,
                    descA: 'Details Description A',
                    descAIcon: 'specialty',
                    descB: 'Details Description B',
                    descBIcon: 'time',
                    from: "2020-01-01T08:00:00",
                    to: "2020-01-01T09:30:00",
                    isDimmed: false,
                  } 
            ]
        },
    ];

    const dataForWeekViewSample = [
        {
            id: 0,
            columnTitle: 'Column Name 1',
            columnDescription: 'Column Description',
            columnSlots: [
                {
                    isDisabled: false,
                    dayOfWeek: 'Saturday',
                    daySlots: [
                        {
                            id: 0,
                            title: 'Details title',
                            titleIcon: undefined,
                            descA: 'Details Description A',
                            descAIcon: 'specialty',
                            descB: 'Details Description B',
                            descBIcon: 'time',
                            from: "2020-01-01T08:00:00",
                            to: "2020-01-01T09:30:00",
                            isDimmed: false,
                        },
                        {
                            id: 0,
                            title: 'Details title',
                            titleIcon: undefined,
                            descA: 'Details Description A',
                            descAIcon: 'specialty',
                            descB: 'Details Description B',
                            descBIcon: 'time',
                            from: "2020-01-01T08:00:00",
                            to: "2020-01-01T09:30:00",
                            isDimmed: false,
                        },
                        {
                            id: 0,
                            title: 'Details title',
                            titleIcon: undefined,
                            descA: 'Details Description A',
                            descAIcon: 'specialty',
                            descB: 'Details Description B',
                            descBIcon: 'time',
                            from: "2020-01-01T08:00:00",
                            to: "2020-01-01T09:30:00",
                            isDimmed: false,
                        },
                        {
                            id: 0,
                            title: 'Details title',
                            titleIcon: undefined,
                            descA: 'Details Description A',
                            descAIcon: 'specialty',
                            descB: 'Details Description B',
                            descBIcon: 'time',
                            from: "2020-01-01T08:00:00",
                            to: "2020-01-01T09:30:00",
                            isDimmed: false,
                        },
                        {
                            id: 0,
                            title: 'Details title',
                            titleIcon: undefined,
                            descA: 'Details Description A',
                            descAIcon: 'specialty',
                            descB: 'Details Description B',
                            descBIcon: 'time',
                            from: "2020-01-01T08:00:00",
                            to: "2020-01-01T09:30:00",
                            isDimmed: false,
                        },
                        {
                            id: 0,
                            title: 'Details title',
                            titleIcon: undefined,
                            descA: 'Details Description A',
                            descAIcon: 'specialty',
                            descB: 'Details Description B',
                            descBIcon: 'time',
                            from: "2020-01-01T08:00:00",
                            to: "2020-01-01T09:30:00",
                            isDimmed: false,
                        },
                    ],
                } 
            ]
        },
    ];

    return (
        <Schedular    
        language='en'   
        emptyStateView={<p>Test</p>}
        isLoading={false}
        isTodaySelected
        data={dataForWeekViewSample}
        firstTimeSlotInViewTime="2020-01-01T05:00:00"
        LastTimeSlotInViewTime="2020-01-01T13:00:00"
        isOffDay={false}
        selectedViewIndex={1}
        weekStartDay="Saturday"
        // extendDataSlot={}
        // extendSlot={}
        // extendDayColumnWrapper={}
        // extendSlotTitle={}
        // extendSlotDesc={}
        onClickDataSlot={val => {
        if (val) console.log({ accountKey: val.id });
        }}
        /* onClickSlot={() => {
        // fire action here
        console.log('Slot Clicked!');
        }} */
            /* onClickHeaderAction={() => {
            // fire action here
        }} */
            /* onHScrollEnds={() => {
            // fire action here
        }} */
         {...props} />   
                
    )
}

export default App;
