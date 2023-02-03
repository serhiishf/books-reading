import { ReactComponent as SvgLibrary } from "../../assets/img/book.svg";
import { ReactComponent as SvgHome } from "../../assets/img/home.svg";
import { useMemo } from "react";
import routes, { IRoute } from "../../routes";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import styles from "./NavAuth.module.scss";

export default function NavAuth() {
  return (
    <div className={styles.navWrapper}>
      <div>User Name</div>
      <NavLink key={uuidv4()} to={"/library"}>
        <SvgLibrary />
      </NavLink>
      <NavLink key={uuidv4()} to={"/training"}>
        <SvgHome />
      </NavLink>
    </div>
  );
}
