/* import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';


interface CalendarProps {
  placeHolder: string;
}

function Calendar({ placeHolder }: CalendarProps) {
  const inputProps = {
    placeholder: placeHolder,
    style: {
      border: '1px solid #A6ABB9',
      fontSize: '14px',
      fontFamily: 'Montserrat',
      fontWeight: '500',
      minHeight: '42px',
      padding: '0 13px',
    }
  };
  return (
    <div>
      <Datetime inputProps={inputProps} />
    </div>
  );
}

export default Calendar; */
import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { ReactComponent as CalendarIcon } from './assets/calendar.svg';
import { ReactComponent as InputArrow } from './assets/arrow.svg';
import styles from './Calendar.module.scss';


interface CalendarProps {
  placeHolder: string;
}

function Calendar({ placeHolder }: CalendarProps) {
  const CustomInput = ({ value, onClick }: { value: string, onClick: () => void }) => (
    <div className={styles.regularInput} onClick={onClick}>
      <CalendarIcon />
      <input className={styles.hiddenInput} type="text" placeholder={placeHolder} value={value} readOnly />
      <InputArrow />
    </div>
  );

  return (
    <div>
      <Datetime renderInput={CustomInput} />
    </div>
  );
}

export default Calendar;
