import React, { useState, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setLanguage } from 'app/store/actions/app';
import Filter from 'app/components/Filter';
import { withTranslation } from 'app/withTranslation/withTranslation';
import Schedular from './Scheduler';
import { WEEK_START_DAY, SCHEDULAR_VIEWS, isRTLLanguage } from './App.helper';
import './App.css';

const App = ({ ...props }) => {
    const { localization, language } = props;
    const [startDate, setStartDate] = useState('12/13/2022');
    const [endDate, setEndDate] = useState('12/28/2022');
    const [datePickerMode, setDatePickerMode] = useState(SCHEDULAR_VIEWS.DAY);
    const weekStartDay = WEEK_START_DAY.SATURDAY;
    const isRTL = isRTLLanguage(language);

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
    ];

    return (
        <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <Filter 
                localization={localization}
                setLanguage={props.setLanguage}
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
                weekStartDay={weekStartDay}
            />
            <Schedular
                localization={localization}
                startDate={startDate}
                endDate={endDate}
                language={language}  
                emptyStateView={<p>This is empty state</p>}
                isLoading={false}
                data={datePickerMode === SCHEDULAR_VIEWS.DAY ? dataForDayViewSample : dataForWeekViewSample}
                firstTimeSlotInViewTime="05:00:00"
                LastTimeSlotInViewTime="13:00:00"
                isOffDay={false}
                selectedViewIndex={datePickerMode}
                weekStartDay={weekStartDay}
                onClickDataSlot={val => {
                    alert(`Data Slot is Clicked!`);
                }}
                onClickSlot={val => {
                    alert(`Empty Slot is Clicked!`);
                }}
                onClickHeaderAction={() => {
                    alert(`Column Header is Clicked!`);
                }}
                // extendDataSlot={}
                // extendSlot={}
                // extendDayColumnWrapper={}
                // extendSlotTitle={}
                // extendSlotDesc={}
            />
         </div>
                
    )
}

const mapStateToProps = state => ({
    language: state.app.language,
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        setLanguage,
    },
    dispatch,
  );

  export default withTranslation(connect(mapStateToProps, mapDispatchToProps)(App));