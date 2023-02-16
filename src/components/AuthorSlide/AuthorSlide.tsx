import React from 'react';

interface Props {
  name: string;
  srcPath: string;
  gitHubPath: string;
  cases: string[];
}

const AuthorSlide: React.FC<Props> = ({ name, srcPath, gitHubPath, cases }) => {
  return (
    <div>
      <img src={srcPath} alt="" />
      <p>{name}</p>
      <a href={gitHubPath}>GitHub</a>
      <ul>
        {cases.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorSlide;
