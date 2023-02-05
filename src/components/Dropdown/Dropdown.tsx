import React from 'react';
import { ReactComponent as Icon } from './assets/icon.svg';
import style from './Dropdown.module.scss';
import { Props } from './Dropdown.interface';

const Dropdown: React.FC<Props> = ({ placeHolder, options }) => {
  const getDisplay = () => {
    return placeHolder;
  };

  return (
    <div className={style['dropdown-container']}>
      <div className={style['dropdown-input']}>
        <div className={style['dropdown-selected-value']}>{getDisplay()}</div>
        <div className={style['dropdown-tools']}>
          <div className={style['dropdown-tool']}>
            <Icon />
          </div>
        </div>
      </div>
      <div className={style['dropdown-menu']}>
        {options.map((option) => (<div key={option.value} className={style['dropdown-item']}>
          {option.label}
        </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
