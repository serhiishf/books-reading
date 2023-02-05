import React from 'react';
import Dropdown from './components/Dropdown';
import { DropdownOption } from './components/Dropdown/Dropdown.interface';


const options: DropdownOption[] = [{ value: 'book1', label: 'book1' }, { value: 'kobzar', label: 'Kobzar' }];
const ShfTestComponent = () => {
  return (
    <>
      <Dropdown placeHolder="Обрати книги з бібліотеки" options={options} />
    </>
  );
};

export default ShfTestComponent;