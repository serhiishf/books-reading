import React, { FC } from 'react';
import { Formik, Field } from 'formik';

import { Book } from '../../../services/books/books-service';
import { useTranslation } from 'react-i18next';

type Props = {
  books: Book[];
  onAddActive: (newBook: Book) => void;
};

const BookSelectInput: FC<Props> = ({ books, onAddActive }) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ book: '' }}
      onSubmit={(values) => {
        const selectedBook = JSON.parse(values.book);
        onAddActive(selectedBook);
        console.log(selectedBook);
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="book" as="select">
            <option value="">{t('training.chooseBookFromLibrary')}</option>
            {books.map((book) => (
              <option key={book._id} value={JSON.stringify(book)}>
                {book.name}
              </option>
            ))}
          </Field>
          <button type="submit">{t('training.add')}</button>
        </form>
      )}
    </Formik>
  );
};

export default BookSelectInput;
