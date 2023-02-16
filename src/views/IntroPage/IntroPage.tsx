import React, { useState } from 'react';
import Slider from '../../components/Slider';

import authorsData from './authorsData';
import AuthorSlide from '../../components/AuthorSlide';

export default function IntroPage() {
  const [aboutTxt, setAboutTxt] = useState('About us');

  const handleClick = () => {
    if (aboutTxt === 'About us') {
      setAboutTxt('About app');
    } else if (aboutTxt === 'About app') {
      setAboutTxt('About us');
    }
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        {aboutTxt}
      </button>

      {aboutTxt === 'About us' && (
        <Slider>
          {authorsData.map((author, i) => (
            <AuthorSlide
              key={i}
              name={author.name}
              srcPath={author.srcPath}
              gitHubPath={author.gitHubPath}
              cases={author.cases}
            />
          ))}
        </Slider>
      )}

      {aboutTxt === 'About app' && (
        <Slider>
          <div>About app</div>
        </Slider>
      )}
    </div>
  );
}
//
