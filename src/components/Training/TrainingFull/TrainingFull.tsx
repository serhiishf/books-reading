import React from 'react';
import booksApi from '../../../services/books/books-service';
import { ReadingTraining } from '../../../services/training/training-service';
import BookStatusI, { statusBook } from '../../../utils/bookStatus';
import BookItem from '../BookItem';
import BookListHeader from '../BookListHeader';
import Checkbox from '../Checkbox';

interface Props {
  training: ReadingTraining;
  setBookStatus: (bookId: string, status: BookStatusI) => void;
}

const TrainingFull: React.FC<Props> = ({ training, setBookStatus }) => {
  const onClickCheckbox = async (
    bookId: string,
    status: BookStatusI,
    objBookId: string,
  ) => {
    const body = {
      bookId,
      status:
        status === statusBook.ACTIVE ? statusBook.DONE : statusBook.ACTIVE,
    };
    const res = await booksApi.updateBookStatus(body);

    // setBookStatus(objBookId, body.status);
  };

  return (
    <div>
      <div>
        <BookListHeader />
        <ul>
          {training.books.map((bookObj) => {
            const { book, _id } = bookObj;
            return (
              <>
                <Checkbox
                  status={book.status}
                  clb={() => onClickCheckbox(book._id, book.status, _id)}
                />
                <BookItem key={_id} book={book} />
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TrainingFull;
