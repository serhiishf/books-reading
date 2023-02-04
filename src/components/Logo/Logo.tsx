import React from "react";
import { ReactComponent as LogoImage } from "../../assets/img/logo.svg";
import styles from "./Logo.module.scss";
import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to={'/'}>
      <LogoImage width={28} height={27} className={styles.logoImg} />
    </NavLink>
  );
}
