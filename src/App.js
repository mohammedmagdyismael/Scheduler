import React, { useState } from 'react';
import Schedular from './Calendar';
import Filter from './Calendar/UIComponents/Filter';
import './App.css'

const App = ({ ...props }) => {
    const [startDate, setStartDate] = useState('12/13/2022');
    const [endDate, setEndDate] = useState('12/28/2022');
    const [datePickerMode, setDatePickerMode] = useState(0);
    const [language, setLanguage] = useState('en');

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

      // git config --global credential.helper wincred if not deployed on github

    const randomIntFromInterval = (min, max) => { // min and max included 
        let num;
        num = Math.floor(Math.random() * (max - min + 1) + min);
        num = num.toString();
        while (num.length < 2) num = "0" + num;
        return num;
    }

    const dataForDayViewSample = [];
    for (let col = 0; col < 10; col++) {
        const slots = [];
        const from = randomIntFromInterval(0, 12);
        const to = randomIntFromInterval(Number(from), Number(from) + 3);
        const min = randomIntFromInterval(50, 59);

        slots.push(
            {
                id: 0,
                title: `Details title ${0}`,
                titleIcon: undefined,
                descA: 'Details Description A',
                descAIcon: 'calendar',
                descB: 'Details Description B',
                descBIcon: 'time',
                from: `2020-01-01T${from}:00:00`,
                to: `2020-01-01T${to}:00:00`,
                isDimmed: false,
              } 
        );

        dataForDayViewSample.push(
            {
                id: col,
                columnTitle: `Column Name ${col}`,
                columnDescription: 'Column Description',
                columnSlots: slots,
            }
        );
        
    }

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
                },
                {
                    isDisabled: false,
                    dayOfWeek: 'Monday',
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
        {
            id: 0,
            columnTitle: 'Column Name 2',
            columnDescription: 'Column Description',
            columnSlots: [
                {
                    isDisabled: true,
                    dayOfWeek: 'Tuesday',
                    daySlots: [],
                },
                {
                    isDisabled: false,
                    dayOfWeek: 'Tuesday',
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
                },
                {
                    isDisabled: false,
                    dayOfWeek: 'Friday',
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

    const isSameDay = (d1, d2) =>
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();
    const isToday = date => isSameDay(date, new Date());
    const isTodaySelected = isToday(new Date(startDate), new Date());

    return (
        <div style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}>
            <Filter 
                setLanguage={setLanguage}
                startDate={startDate}
                endDate={endDate}
                language={language}  
                datePickerMode={datePickerMode}
                setDatePickerMode={setDatePickerMode}
                onChangeDate={val => {
                    if (val) {
                        setStartDate(val.startDate);
                        setEndDate(val.endDate)
                    }
                }}
                weekStartDay="Saturday"
            />
            <Schedular    
                language={language}  
                emptyStateView={<p>This is empty state</p>}
                isLoading={false}
                isTodaySelected={isTodaySelected}
                data={datePickerMode === 0 ? dataForDayViewSample : dataForWeekViewSample}
                firstTimeSlotInViewTime="05:00:00"
                LastTimeSlotInViewTime="13:00:00"
                isOffDay={false}
                selectedViewIndex={datePickerMode}
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
                {...props} 
            />   
         </div>
                
    )
}

export default App;
