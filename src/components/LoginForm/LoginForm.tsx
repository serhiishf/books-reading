import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../Input";
import styles from "./LoginForm.module.scss";
import btnStyles from "../Button/Button.module.scss";
import Button from "../Button";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Must be a valid email")
        .min(5, "Min 5 symbols")
        .max(30, "Max 30 symbols")
        .required("Required"),
      password: yup
        .string()
        .min(8, "Min 8 symbols")
        .max(20, "Max 20 symbols")
        .matches(/[A-z0-9]/, "Password should be letters and numbers")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      console.log(email, password);
      // loginRequest(email. password)
      formik.resetForm();
    },
  });

  return (
    <form className={styles.form}>
      <Button
        handleClick={() => {}}
        btnClass={btnStyles.google}
        title={"Google"}
      />
      <div>
        <Input
          labelName={"Email *"}
          name={"email"}
          type={"text"}
          value={formik.values.email}
          handleChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className={styles.notification}>{formik.errors.email}</p>
        ) : null}
      </div>
      <div>
        <Input
          labelName={"Password *"}
          name={"password"}
          type={"password"}
          value={formik.values.password}
          handleChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className={styles.notification}>{formik.errors.password}</p>
        ) : null}
      </div>

      <Button
        handleClick={formik.handleSubmit}
        btnClass={btnStyles.login}
        title={"Login"}
      />
      <Link to="/register">Register</Link>
    </form>
  );
}
