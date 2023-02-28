import React from 'react';
import booksApi from '../../../services/books/books-service';
import { ReadingTraining } from '../../../services/training/training-service';
import BookStatusI, { statusBook } from '../../../utils/bookStatus';
import BoolListFull from '../BookListFull/BookListFull';
import Counter from '../Counter';

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
    await booksApi.updateBookStatus(body);

    // setBookStatus(objBookId, body.status);
  };

  return (
    <div>
      <div>
        {/* timers */}
        <BoolListFull training={training} onCheckboxClick={onClickCheckbox} />
        <Counter books={3} days={7} booksLeft={2} />
      </div>
      <div>
        {/* diagram */}
        {/* statistics */}
      </div>
    </div>
  );
};

export default TrainingFull;
