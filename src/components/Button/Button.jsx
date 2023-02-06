import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export default function Button({ handleClick, btnClass, title }) {
  return (
    <>
      <button
        type="submit"
        onClick={handleClick}
        className={`${styles.btn} ${btnClass}`}
      >
        {title}
      </button>
    </>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
  btnClass: PropTypes.string,
  title: PropTypes.string,
};
