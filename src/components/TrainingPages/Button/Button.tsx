import React from 'react';

interface ButtonProp {
  type: ButtonType;
  handleClick: () => void;
  title?: string | null;
}

export enum ButtonType {
  plus = 'plus',
  add = 'add',
  done = 'done'
}

function Button({ type, handleClick, title }: ButtonProp) {
  const handleClickWrapper = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleClick();
  };
  return (
    <button
      onClick={handleClickWrapper}
    >
      {title}
    </button>
  );
}

export default Button;