import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './ResultsForm.module.scss';

interface ResultFormProps {
  onSubmitForm: (
    values: { date: string; pages: number },
    dateToSend: string,
  ) => void;
  startTrainingDate: string;
  leftPages: number;
}

interface ResultFormValues {
  date: string;
  pages: number;
}

const ResultsForm: FC<ResultFormProps> = ({
  startTrainingDate,
  leftPages,
  onSubmitForm,
}) => {
  const ResultsFormSchema = Yup.object().shape({
    date: Yup.date().max(new Date()).required(),
    pages: Yup.number().max(leftPages).min(0).required(),
  });

  const formik = useFormik<ResultFormValues>({
    initialValues: {
      date: '',
      pages: 0,
    },
    validationSchema: ResultsFormSchema,
    onSubmit: (values) => {
      const now = new Date();
      const result = {
        date: values.date,
        time: now.toLocaleTimeString(),
        pages: values.pages,
      };
      const dateToSend = now.toISOString().replace('T', ' ');
      onSubmitForm(result, dateToSend);
      formik.resetForm();
    },
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;

  const isFormValid =
    Object.keys(errors).length === 0 && Object.keys(touched).length !== 0;

  // const handlePageLeave = (e: BeforeUnloadEvent) => {
  //   if (!isFormValid) {
  //     e.preventDefault();
  //     e.returnValue = '';
  //   }
  // };

  // window.addEventListener('beforeunload', handlePageLeave);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <div>
          <label htmlFor="date" className={styles.label}>
            Date
          </label>
          <input
            className={styles.input}
            id="date"
            name="date"
            type="date"
            max={new Date().toISOString().slice(0, 10)}
            min={startTrainingDate.slice(0, 10)}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.date}
          />
          {errors.date && touched.date ? <div>{errors.date}</div> : null}
        </div>

        <div>
          <label htmlFor="pages" className={styles.label}>
            Amount of pages
          </label>
          <input
            className={styles.input}
            id="pages"
            name="pages"
            type="number"
            max={leftPages}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pages}
          />
          {errors.pages && touched.pages ? <div>{errors.pages}</div> : null}
        </div>
      </div>

      <button type="submit" disabled={!isFormValid} className={styles.button}>
        Додати результат
      </button>
    </form>
  );
};

export default ResultsForm;
