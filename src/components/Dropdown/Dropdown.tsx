import React, { MouseEventHandler } from 'react';
import Select, { StylesConfig } from 'react-select';
import { ReactComponent as Icon } from './assets/icon.svg';
import { Props } from './Dropdown.interface';
import makeAnimated from 'react-select/animated';
//import styles from './Dropdown.module.scss';

const animatedComponents = makeAnimated();

const Dropdown: React.FC<Props> = ({ placeHolder, options }) => {
  const customStyles: StylesConfig = {
    option: (provided, state: { isSelected: boolean }) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#ff6b08' : 'white',
      color: state.isSelected ? 'white' : 'black',
      padding: 10
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#f3f3f3',
      border: '1px solid green',
      borderRadius: 5
    })
  };
  return (
    <>
      <Select
        styles={customStyles}
        closeMenuOnSelect={false}
        components={animatedComponents}
        placeholder={placeHolder}
        noOptionsMessage={() => 'Більше нема книжок'}
        isMulti
        options={options}
      />
    </>
  );
};

export default Dropdown;
