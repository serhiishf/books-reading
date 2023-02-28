import React, { useState } from 'react';
import svgEmptyCheckbox from '../../../assets/img/checkbox-empty.svg';
import svgCheckedCheckbox from '../../../assets/img/checkbox-checked.svg';

interface CheckboxProps {
  status: 'pending' | 'active' | 'done';
  clb: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ status, clb }) => {
  const [isChecked, setIsChecked] = useState(status === 'done');

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    clb();
  };

  return (
    <div onClick={toggleCheckbox}>
      {isChecked ? (
        <img src={svgCheckedCheckbox} alt="Checked" />
      ) : (
        <img src={svgEmptyCheckbox} alt="Unchecked" />
      )}
    </div>
  );
};

export default Checkbox;
