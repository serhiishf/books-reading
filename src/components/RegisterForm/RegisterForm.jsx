import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from '../Input';
import styles from '../LoginForm/LoginForm.module.scss';
import btnStyles from '../Button/Button.module.scss';
import Button from '../Button';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      name: yup.string().min(3, 'Min 3 symbols').required(),
      email: yup
        .string()
        .email('Must be a valid email')
        .min(5, 'Min 5 symbols')
        .max(50, 'Max 50 symbols')
        .required('Required'),
      password: yup
        .string()
        .min(8, 'Min 8 symbols')
        .max(40, 'Max 40 symbols')
        .matches(/[A-z0-9]/, 'Password should be letters and numbers')
        .required('Required'),
      confirmPassword: yup
        .string()
        .label('confirm password')
        .required('Please confirm your password.')
        .oneOf([yup.ref('password')], 'Your passwords do not match.'),
    }),
    onSubmit: (values) => {
      const { name, email, password, confirmPassword } = values;
      console.log(name, email, password, confirmPassword);
      // loginRequest(email. password)
      formik.resetForm();
    },
  });
  const handleGoogleBtnClick = () => {
    console.log('GoggleBtn');
  };

  return (
    <form className={styles.form}>
      <Button
        handleClick={handleGoogleBtnClick}
        btnClass={btnStyles.google}
        title={'Google'}
      />
      <div className={styles.inputWrapper}>
        <Input
          labelName={'Name *'}
          name={'name'}
          type={'text'}
          value={formik.values.name}
          handleChange={formik.handleChange}
        />
      </div>

      <div className={styles.inputWrapper}>
        <Input
          labelName={'Email *'}
          name={'email'}
          type={'text'}
          value={formik.values.email}
          handleChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className={styles.notification}>{formik.errors.email}</p>
        ) : null}
      </div>
      <div className={styles.inputWrapper}>
        <Input
          labelName={'Password *'}
          name={'password'}
          type={'password'}
          value={formik.values.password}
          handleChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className={styles.notification}>{formik.errors.password}</p>
        ) : null}
      </div>

      <div className={styles.inputWrapper}>
        <Input
          labelName={'Confirm password *'}
          name={'confirmPassword'}
          type={'password'}
          value={formik.values.confirmPassword}
          handleChange={formik.handleChange}
        />
        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
          <p className={styles.notification}>{formik.errors.confirmPassword}</p>
        ) : null}
      </div>

      <Button
        handleClick={formik.handleSubmit}
        btnClass={btnStyles.login}
        title={'Register'}
      />
      <span>Already have an account?</span>
      <Link to="/login" className={styles.link}>
        Log in
      </Link>
    </form>
  );
}
