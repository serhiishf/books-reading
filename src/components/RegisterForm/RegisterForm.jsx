import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from '../Input';
import styles from '../LoginForm/LoginForm.module.scss';
import btnStyles from '../Button/Button.module.scss';
import Button from '../Button';
import authOperations from '../../redux/features/auth/authOperations';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import authSelectors from '../../redux/features/auth/authSelectors';

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isRegistered, setRegistered] = useState();

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
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          'Password should be letters and numbers',
        )
        .required('Required'),
      confirmPassword: yup
        .string()
        .label('confirm password')
        .required('Please confirm your password.')
        .oneOf([yup.ref('password')], 'Your passwords do not match.'),
    }),
    onSubmit: async (values) => {
      const { name, email, password, confirmPassword } = values;
      dispatch(authOperations.register({ name, email, password })).then(
        (res, _) => {
          if (res) {
            navigate('/login', { replace: true });
          }
        },
      );
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
