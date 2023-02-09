import React from 'react';
import Dropdown from './components/Dropdown';
import { DropdownOption } from './components/Dropdown/Dropdown.interface';


const options: DropdownOption[] = [{ value: 'book1', label: 'book1' }, { value: 'kobzar', label: 'Kobzar' }];
const ShfTestComponent = () => {
  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Dropdown placeHolder="Обрати книги з бібліотеки" options={options} />
    </div>
  );
};

export default ShfTestComponent;