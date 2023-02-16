import React from 'react';
import Dropdown from '../Dropdown';
import styles from './CreateTraining.module.scss';
import { useTranslation } from 'react-i18next';


const options = [{ value: 'book1', label: 'book1' }, { value: 'kobzar', label: 'Kobzar' }];

function CreateTraining() {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.containerWrap}>
          <Dropdown placeHolder={t('chooseBookFromLibrary')} options={options} noOptionsMessage={t('noBookMore')}/>
        </div>
      </div>
    </>
  );
};

export default CreateTraining;