import React, { useState } from 'react';
import Slider from '../../components/Slider';
import { useTranslation } from 'react-i18next';
import authorsData from './authorsData';
import AuthorSlide from '../../components/AuthorSlide';
import Button from '../../components/Button';
import styles from './IntroPage.module.scss';

export default function IntroPage() {
  const { t } = useTranslation();
  const [aboutTxt, setAboutTxt] = useState(t('aboutApp'));

  const handleClick = () => {
    if (aboutTxt === t('aboutApp')) {
      setAboutTxt(t('aboutUs'));
    } else if (aboutTxt === t('aboutUs')) {
      setAboutTxt(t('aboutApp'));
    }
  };

  return (
    <div className={styles.mainSection}>
      <div className={styles.mainContainer}>
        {aboutTxt === t('aboutApp') && (
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

        {aboutTxt === t('aboutUs') && (
          <Slider>
            <div>About app</div>
          </Slider>
        )}

        <Button
          type="button"
          handleClick={handleClick}
          btnClass={styles.buttonAbout}
          title={aboutTxt}
        />
      </div>
    </div>
  );
}
