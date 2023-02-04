import React from 'react';
import { ReactComponent as LogoImage } from '../../assets/img/logo.svg';
import styles from './Logo.module.scss';

export default function Logo() {
  return <LogoImage width={28} height={27} className={styles.logoImg} />;
}
