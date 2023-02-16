import React from 'react';
import styles from './AuthorSlide.module.scss';

interface Props {
  name: string;
  role: string;
  srcPath: string;
  gitHubPath: string;
  cases: string[];
}

const AuthorSlide: React.FC<Props> = ({
  name,
  role,
  srcPath,
  gitHubPath,
  cases,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <img src={srcPath} alt="" className={styles.image} />
      </div>

      <div className={styles.contentBox}>
        <h3>{name}</h3>
        <p>{role}</p>
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
