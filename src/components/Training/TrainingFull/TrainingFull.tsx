import React, { useEffect, useState } from 'react';
import booksApi from '../../../services/books/books-service';
import trainingApi, {
  ReadingTraining,
} from '../../../services/training/training-service';
import BookStatusI, { statusBook } from '../../../utils/bookStatus';
import countDays from '../../../utils/countDays';
import BoolListFull from '../BookListFull/BookListFull';
import Counter from '../Counter';

interface Props {
  training: ReadingTraining;
  setTraining: (training: ReadingTraining | null) => void;
  setBookStatus: (bookId: string, status: BookStatusI) => void;
}

const getNotFinishedBooks = (training: ReadingTraining) => {
  return training.books.filter(({ book }) => book.status === statusBook.ACTIVE);
};

const TrainingFull: React.FC<Props> = ({
  training,
  setTraining,
  setBookStatus,
}) => {
  const [notFinishedBooks, setNotFinishedBooks] = useState(
    getNotFinishedBooks(training),
  );

  useEffect(() => {
    setNotFinishedBooks(getNotFinishedBooks(training));
  }, [training]);

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
    //todo: set statistics ?
    setBookStatus(objBookId, body.status);
  };

  return (
    <div>
      <div>
        {/* timers */}
        <BoolListFull training={training} onCheckboxClick={onClickCheckbox} />
        <Counter
          books={training.books.length}
          days={countDays(training.start, training.finish)}
          booksLeft={notFinishedBooks.length}
        />
      </div>
      <div>
        {/* diagram */}
        {/* statistics */}
      </div>
      <button
        type="button"
        onClick={() => {
          trainingApi.deleteTraining(training._id);
          setTraining(null);
        }}
      >
        Remove Training
      </button>
    </div>
  );
};

export default TrainingFull;
