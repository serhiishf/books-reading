import React from 'react';
import styles from './AuthorSlide.module.scss';

interface Props {
  name: string;
  srcPath: string;
  gitHubPath: string;
  cases: string[];
}

const AuthorSlide: React.FC<Props> = ({ name, srcPath, gitHubPath, cases }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <img src={srcPath} alt="" className={styles.image} />
      </div>

      <div className={styles.contentBox}>
        <p>{name}</p>
        <a href={gitHubPath}>GitHub</a>
        <ul>
          {cases.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuthorSlide;
