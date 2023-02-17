import React, { useState } from 'react';
import { BookLib } from './LibraryBook';
import { ReactComponent as Star } from '../../../assets/img/star.svg';
import styles from './DoneEl.module.scss';

const DoneEl = ({ raiting, resume }: Pick<BookLib, 'raiting' | 'resume'>) => {
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
