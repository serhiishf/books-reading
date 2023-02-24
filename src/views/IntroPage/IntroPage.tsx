import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SlideAuthor from '../../components/SlideAuthor';
import Button from '../../components/Button';
import Slider from '../../components/Slider';

import styles from './IntroPage.module.scss';

import maryna from '../../assets/img/authors/maryna.jpg';
import serhii from '../../assets/img/authors/serhii.jpg';
import kateryna from '../../assets/img/authors/kateryna.jpg';
import school from '../../assets/img/authors/school-rs.jpg';
import SlideApp from '../../components/SlideApp';
const photos = [serhii, kateryna, maryna, school];

import registrationSlide from '../../assets/img/aboutApp/registration-slide.jpg';
import mainSlide from '../../assets/img/aboutApp/main-slide.jpg';
import libSlide from '../../assets/img/aboutApp/lib-slide.jpg';
import marathonSlide from '../../assets/img/aboutApp/marathon-slide.jpg';
import processSlide from '../../assets/img/aboutApp/process-slide.jpg';
const aboutAppSrc = [
  mainSlide,
  registrationSlide,
  libSlide,
  marathonSlide,
  processSlide,
];

interface AuthorI {
  name: string;
  role: string;
  gitHubPath: string;
  cases: string[];
}

interface AboutAppI {
  title: string;
  casesList1: string[];
  casesList2: string[];
}
// type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

export default function IntroPage() {
  const { t } = useTranslation();
  const [isAboutUs, setIsAboutUs] = useState(true);
  const [btnTitle, setBtnTitle] = useState(t('introPage.aboutApp'));
  const authors = t('authors', { returnObjects: true }) as AuthorI[];
  const aboutApp = t('aboutApp', { returnObjects: true }) as AboutAppI[];

  const handleClick = () => {
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
              <SlideAuthor
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
            {aboutApp.map(({ title, casesList1, casesList2 }, i) => (
              <SlideApp
                key={i}
                srcPath={aboutAppSrc[i]}
                title={title}
                cases1={casesList1}
                cases2={casesList2}
              />
            ))}
          </Slider>
        )}

        <Button
          type="button"
          handleClick={handleClick}
          btnClass={styles.buttonAbout}
          title={btnTitle ? btnTitle : ''}
        />
      </div>
    </div>
  );
}
