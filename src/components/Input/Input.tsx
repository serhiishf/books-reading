import React from "react";
import styles from "./Input.module.scss";

interface InputI {
  labelName: string;
  name: string;
  type: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  labelName,
  name,
  type,
  value,
  handleChange,
}: InputI) {
  return (
    <label className={styles.labelAuth}>
      {" "}
      {labelName}
      <input
        className={styles.inputAuth}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}
