import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AuthorSlide from '../../components/AuthorSlide';
import Button from '../../components/Button';
import Slider from '../../components/Slider';

import styles from './IntroPage.module.scss';

import maryna from '../../assets/img/authors/maryna.jpg';
import serhii from '../../assets/img/authors/serhii.jpg';
import kateryna from '../../assets/img/authors/kateryna.jpg';
import school from '../../assets/img/authors/school-rs.jpg';

export default function IntroPage() {
  const { t } = useTranslation();
  const [aboutTxt, setAboutTxt] = useState(t('aboutApp'));
  const [authors, setAuthors] = useState([
    {
      name: t('authorSerhii'),
      role: t('leadRole'),
      srcPath: serhii,
      gitHubPath: 'https://github.com/serhiishf',
      cases: t<string, string[]>('authorSerhiiCases', { returnObjects: true }),
    },
    {
      name: t('authorKateryna'),
      role: t('devRole'),
      srcPath: kateryna,
      gitHubPath: 'https://github.com/Katerina-Zamiatina',
      cases: t<string, string[]>('authorKaterynaCases', {
        returnObjects: true,
      }),
    },
    {
      name: t('authorMaryna'),
      srcPath: maryna,
      role: t('devRole'),
      gitHubPath: 'https://github.com/MarinaTripetska',
      cases: t<string, string[]>('authorMarynaCases', { returnObjects: true }),
    },

    {
      name: 'RS School',
      srcPath: school,
      role: t('schoolRole'),
      gitHubPath: 'https://rs.school/',
      cases: t<string, string[]>('authorSchoolCases', { returnObjects: true }),
    },
  ]);

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
            {authors.map(({ name, role, srcPath, gitHubPath, cases }, i) => (
              <AuthorSlide
                key={i}
                name={name}
                role={role}
                srcPath={srcPath}
                gitHubPath={gitHubPath}
                cases={cases}
              />
            ))}
          </Slider>
        )}

        {aboutTxt === t('aboutUs') && (
          <Slider>
            <div>Example</div>
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
