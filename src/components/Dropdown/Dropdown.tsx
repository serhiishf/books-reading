import React, { MouseEventHandler } from 'react';
import Select, { StylesConfig, } from 'react-select';
import { ReactComponent as Icon } from './assets/icon.svg';
import { PropsDropdown } from './Dropdown.interface';

const Dropdown: React.FC<PropsDropdown> = ({ placeHolder, options }) => {
  const customStyles: StylesConfig = {
    menu: (styles) => ({
      ...styles,
      borderRadius: '0',
    }),
    option: (provided, { isDisabled, isFocused, isSelected }) => ({
      ...provided,
      backgroundColor: isSelected ? undefined : isFocused ? '#F5F7FA' : 'white',
      color: isSelected ? 'white' : 'black',
      padding: 13,
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      boxShadow: 'inset 0px 1px 2px rgba(29, 29, 27, 0.15)',
      borderRadius: 0,
      minHeight: '42px',
      fontSize: '14px',
    })
  };
  return (
    <>
      <Select
        styles={customStyles}
        closeMenuOnSelect={false}
        placeholder={placeHolder}
        noOptionsMessage={() => 'Більше нема книжок'}
        isMulti
        options={options}
      />
    </>
  );
};

export default Dropdown;
