import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AuthorSlide from '../../components/AuthorSlide';
import Button from '../../components/Button';
import Slider from '../../components/Slider';

import styles from './IntroPage.module.scss';

import maryna from '../../assets/img/authors/maryna.jpg';
import serhii from '../../assets/img/authors/serhii.jpg';
import kateryna from '../../assets/img/authors/kateryna.jpg';
import school from '../../assets/img/authors/school-rs.jpg';
const photos = [serhii, kateryna, maryna, school];

interface AuthorI {
  name: string;
  role: string;
  gitHubPath: string;
  cases: string[];
}
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

export default function IntroPage() {
  const { t } = useTranslation();
  const [isAboutUs, setIsAboutUs] = useState(true);
  const [btnTitle, setBtnTitle] = useState(t('introPage.aboutApp'));
  const authors = t('authors', { returnObjects: true }) as AuthorI[];

  const handleClick = (e: ButtonEvent) => {
    setIsAboutUs(!isAboutUs);
    isAboutUs
      ? setBtnTitle(t('introPage.aboutUs'))
      : setBtnTitle(t('introPage.aboutApp'));
  };

  return (
    <div className={styles.mainSection}>
      <div className={styles.mainContainer}>
        {isAboutUs && (
          <Slider>
            {authors.map(({ name, role, gitHubPath, cases }, i) => (
              <AuthorSlide
                key={i}
                name={name}
                role={role}
                srcPath={photos[i]}
                gitHubPath={gitHubPath}
                cases={cases}
              />
            ))}
          </Slider>
        )}

        {!isAboutUs && (
          <Slider>
            <div>Example</div>
          </Slider>
        )}

        <Button
          type="button"
          handleClick={handleClick}
          btnClass={styles.buttonAbout}
          title={btnTitle}
        />
      </div>
    </div>
  );
}
