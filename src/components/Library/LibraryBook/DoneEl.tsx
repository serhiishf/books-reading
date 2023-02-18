import React, { useState } from 'react';
import { ReactComponent as Star } from '../../../assets/img/star.svg';
import { DoneT } from '../library.interfaces';
import styles from './DoneEl.module.scss';

const DoneEl = ({ raiting, resume }: DoneT) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div className={styles.starWrapper}>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
      <div>
        <button onClick={handleClick}>{'Resume'}</button>
      </div>
    </>
  );
};

export default DoneEl;
