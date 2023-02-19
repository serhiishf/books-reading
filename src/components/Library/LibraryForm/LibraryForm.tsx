import React from 'react';
import styles from './LibraryForm.module.scss';
import Input from '../../Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import booksApi from '../../../services/books/books-service';

export default function LibraryForm() {
  const initialValues = {
    name: '',
    author: '',
    year: '',
    pages: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, 'Min 3 symbols')
        .max(50, 'Max 50 symbols')
        .required('Required'),
      author: yup
        .string()
        .min(3, 'Min 3 symbols')
        .max(40, 'Max 40 symbols')
        .required('Required'),
      year: yup
        .string()
        .matches(/^[0-9]*$/, 'Year should be number')
        .min(4, 'Min 4 symbols')
        .max(4, 'Max 4 symbols'),
      pages: yup
        .string()
        .matches(/^[0-9]*$/, 'Pages should be number')
        .min(2, 'Min 2 symbols')
        .max(4, 'Max 4 symbols')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const { name, author, year, pages } = values;
      booksApi.createBook({ name, author, year, pages });
      formik.resetForm();
    },
  });

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            formik.handleSubmit();
          }
        }}
      >
        <div className={styles.inputWrapper}>
          <Input
            labelName={'Book title'}
            name={'name'}
            type={'text'}
            value={formik.values.name}
            handleChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name ? (
            <p className={styles.notification}>{formik.errors.name}</p>
          ) : null}
        </div>
        <div className={styles.inputsTablet}>
          <div className={`${styles.inputWrapper} ${styles.wrapperAuthor}`}>
            <Input
              labelName={'Author'}
              name={'author'}
              type={'text'}
              value={formik.values.author}
              handleChange={formik.handleChange}
            />
            {formik.errors.author && formik.touched.author ? (
              <p className={styles.notification}>{formik.errors.author}</p>
            ) : null}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              labelName={'Publication date'}
              name={'year'}
              type={'text'}
              value={formik.values.year}
              handleChange={formik.handleChange}
            />
            {formik.errors.year && formik.touched.year ? (
              <p className={styles.notification}>{formik.errors.year}</p>
            ) : null}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              labelName={'Amount of pages'}
              name={'pages'}
              type={'text'}
              value={formik.values.pages}
              handleChange={formik.handleChange}
            />
            {formik.errors.pages && formik.touched.pages ? (
              <p className={styles.notification}>{formik.errors.pages}</p>
            ) : null}
          </div>
        </div>
        <div className={styles.btn}>
          <button type="submit" className={styles.addBtn}>
            {'Add'}
          </button>
        </div>
      </form>
    </div>
  );
}
