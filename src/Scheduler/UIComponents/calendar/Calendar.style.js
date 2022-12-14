import styled, { css } from 'styled-components';

export const YearContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MonthsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const MonthNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const YearNameWrapper = styled(MonthNameWrapper)``;

export const MonthsWrapper = styled.div`
    display: flex;
    flex-flow: wrap;
`;

export const MonthNameContainer = styled.div`
    color: ${props => props.isSelected && '#ffff'};
    background-color: ${props => props.isSelected && '#0070cd'};
    cursor: pointer;
    margin: 15px 0px;
    display: flex;
    justify-content: center;
    font-weight: bold;
    width: 33%;
    text-align: center;
    border-radius: 8px;
    height: 45px;
    &:hover {
        ${props => !props.isSelected && `
            color: #58595b;
            background-color: #e0e0e0;
        `}
    }
`;

export const YearNameContainer = styled(MonthNameContainer)`
`;

export const Container = styled.div`
    width: 285px;
    height: 310px;
    padding: 20px 18px; 
    position: absolute;
    -webkit-filter: drop-shadow(0px 4px 16px rgba(0,0,0,0.16));
    filter: drop-shadow(0px 4px 16px rgba(0,0,0,0.16));
    background-color: #fff;
    z-index: 2;
    min-height: 270px;
    overflow: auto;
    box-shadow: 0px 4px 16px rgb(0 0 0 / 16%);
    border-radius: 8px;
    font-family: sans-serif;
`;
export const MonthRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const DayName = styled.p`
    margin: 0px;
    width: 22px;
    text-align: center;
    font-weight: bold;
`;

const disabledDay = css`
    color: #bcbcbc;
`;
const today = css`
    color: #ffff;
`;

export const DayNumber = styled(DayName)`
    cursor: ${props => !props.isDisabled && 'pointer'};
    font-size: 14px;
    font-weight: normal;
    margin: 3px 0px;
    width: 28px;
    height: 28px;
    vertical-align: middle;
    line-height: 30px;
    border-radius: 50%;
    font-weight: ${props => props.isToDay && '600'};
    background-color: ${props => props.isToDay && '#5a8ec2'};
    ${props => props.isDisabled && disabledDay};
    ${props => props.isToDay && today};
    &:hover {
        color: ${props => !props.isDisabled && '#fff'};
        background-color: ${props => !props.isDisabled && '#0A66C2'};
    }
`;

export const ShiftedDay = styled.p`
    margin: 3px 0px;
    width: 28px;
    height: 28px;
    vertical-align: middle;
    line-height: 30px;
    border-radius: 50%;
`;

export const DaysViewHeaderContainer = styled.div`
    display: flex;
    width: 170px;
    justify-content: center;
`;

export const MonthName = styled.p`
    font-family: sans-serif;
    margin: 0px 25px;
    text-align: center;
    font-weight: bold;
    margin: 0px 5px;
    line-height: 29px;
    cursor: pointer;
`;

export const DaysContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
`;

export const MonthRowItem = styled.div``;

export const YearName = styled.p`
    font-family: sans-serif;
    margin: 0px 25px;
    text-align: center;
    font-weight: bold;
    margin: 0px 5px;
    line-height: 29px;
    cursor: pointer;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 6px 0px;
`;
export const ButtonContainer = styled.div`
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    margin: 0px 3px;
    height: 30px;
    &>p {
        margin: 7px 0px;
        text-align: center;
    }
`;