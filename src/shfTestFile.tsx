import React, { useState, useEffect } from 'react';
import Dropdown from './components/Dropdown';
import { DropdownOption } from './components/Dropdown/Dropdown.interface';
import TrainingPage from './views/TrainingPage';

const options: DropdownOption[] = [{ value: 'book1', label: 'book1' }, { value: 'kobzar', label: 'Kobzar' }];

const ShfTestComponent = () => {
  return (
    <div /* style={{ maxWidth: '600px', margin: '0 auto' }} */>
      <TrainingPage />
      {/* <Dropdown placeHolder="Обрати книги з бібліотеки" options={options} /> */}
    </div>
  );
};

export default ShfTestComponent;