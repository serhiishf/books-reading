import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { ReactComponent as CalendarIcon } from './assets/calendar.svg';
import { ReactComponent as InputArrow } from './assets/arrow.svg';
import styles from './Calendar.module.scss';
import moment from 'moment';
import 'moment/locale/en-gb';


interface CalendarProps {
  placeHolder: string;
  sameOrBefore?: boolean;
  sameOrAfter?: boolean
}

function Calendar({ placeHolder, sameOrBefore }: CalendarProps) {
  const CustomInput = ({ value, onClick }: { value: string, onClick: () => void }) => (
    <div className={styles.regularInput} onClick={onClick}>
      <CalendarIcon style={{ minWidth: '17px', minHeight: '17px' }} />
      <input
        className={styles.hiddenInput}
        type="text"
        placeholder={placeHolder}
        value={value}
        readOnly />
      <InputArrow style={{ minWidth: '13px', minHeight: '10px' }} />
    </div>
  );

  const isBefore = (currentDate: moment.Moment): boolean => {
    return currentDate.isSameOrBefore(moment(), 'day');
  };

  /*   const isAfter = (currentDate: moment.Moment): boolean => {
    return currentDate.isSameOrAfter(moment(), 'day');
  }; */

  return (
    <div>
      <Datetime
        renderInput={CustomInput}
        closeOnSelect={true}
        locale="en-gb"
        timeFormat={false}
        isValidDate={sameOrBefore ? isBefore : undefined}
      />
    </div>
  );
}

export default Calendar;
