import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ResultFormProps {
  onSubmitForm: (values: { date: string; pages: number }) => void;
  startTrainingDate: string;
  totalPages: number;
}

interface ResultFormValues {
  date: string;
  pages: number;
}

const ResultsForm: FC<ResultFormProps> = ({
  startTrainingDate,
  totalPages,
  onSubmitForm,
}) => {
  const ResultsFormSchema = Yup.object().shape({
    date: Yup.date().max(new Date()).required(),
    pages: Yup.number().max(totalPages).required(),
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
      onSubmitForm(result);
      formik.resetForm();
    },
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;

  const isFormValid =
    Object.keys(errors).length === 0 && Object.keys(touched).length !== 0;

  const handlePageLeave = (e: BeforeUnloadEvent) => {
    if (!isFormValid) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  window.addEventListener('beforeunload', handlePageLeave);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Дата:</label>
      <input
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

      <label htmlFor="pages">Кількість сторінок:</label>
      <input
        id="pages"
        name="pages"
        type="number"
        max={totalPages}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.pages}
      />
      {errors.pages && touched.pages ? <div>{errors.pages}</div> : null}

      <button type="submit" disabled={!isFormValid}>
        Додати результат
      </button>
    </form>
  );
};

export default ResultsForm;
