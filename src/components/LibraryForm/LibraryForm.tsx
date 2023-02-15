import React from 'react';
import styles from './LibraryForm.module.scss';
import btnStyles from '../Button/Button.module.scss';
import Input from '../Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../Button';

export default function LibraryForm() {
  const initialValues = {
    title: '',
    author: '',
    date: 0,
    pages: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      title: yup
        .string()
        .min(5, 'Min 5 symbols')
        .max(50, 'Max 50 symbols')
        .required('Required'),
      author: yup
        .string()
        .min(8, 'Min 8 symbols')
        .max(40, 'Max 40 symbols')
        .required('Required'),
      date: yup.number(),
      pages: yup.number(),
    }),
    onSubmit: (values) => {
      const { title, author, date, pages } = values;
      // dispatch(authOperations.logIn({ email, password }));
      formik.resetForm();
    },
  });

  return (
    <form>
      <Input
        labelName={'Book title'}
        name={'title'}
        type={'text'}
        value={formik.values.title}
        handleChange={formik.handleChange}
      />
      <Input
        labelName={'Author'}
        name={'author'}
        type={'text'}
        value={formik.values.author}
        handleChange={formik.handleChange}
      />
      <Input
        labelName={'Publication date'}
        name={'date'}
        type={'number'}
        value={formik.values.date}
        handleChange={formik.handleChange}
      />
      <Input
        labelName={'Amount of pages'}
        name={'pages'}
        type={'number'}
        value={formik.values.pages}
        handleChange={formik.handleChange}
      />
      <Button
        handleClick={formik.handleSubmit}
        btnClass={btnStyles.addBook}
        title={'Add'}
      />
    </form>
  );
}
