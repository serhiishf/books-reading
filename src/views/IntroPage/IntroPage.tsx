import React, { useState } from 'react';

export default function IntroPage() {
  const [aboutUsTxt, setAboutUsTxt] = useState('About us');
  const [aboutAppTxt, setAboutAppTxt] = useState('About app');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button: HTMLButtonElement = e.currentTarget;

    if (button.textContent === aboutUsTxt) {
      console.log('show Carousel about us');
    } else if (button.textContent === aboutAppTxt) {
      console.log('show Carousel about app');
    }
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        {aboutUsTxt}
      </button>
      <button type="button" onClick={handleClick}>
        {aboutAppTxt}
      </button>
    </div>
  );
}
