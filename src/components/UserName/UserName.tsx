import React from 'react';
import styles from './UserName.module.scss';
import useViewportSizes from '../../hooks/useViewportSizes';

interface Props {
  userNameStr: string;
}

const UserName: React.FC<Props> = ({ userNameStr }) => {
  const sizes = useViewportSizes();
  console.log(sizes);

  return (
    <div className={styles.box}>
      <div className={styles.circle}>
        {userNameStr.slice(0, 1).toUpperCase()}
      </div>
      <p className={styles.name}>{userNameStr}</p>
    </div>
  );
};

export default UserName;
