import React from 'react';
import { ReadingTraining } from '../../../services/training/training-service';
import BookItem from '../BookItem';
import BookListHeader from '../BookListHeader';

interface Props {
  training: ReadingTraining;
}

const TrainingFull: React.FC<Props> = ({ training }) => {
  return (
    <div>
      <div>
        <BookListHeader />
        <ul>
          {training.books.map((book) => (
            <>
              {/* checkbox with prop bookStatus={book.book.status} */}
              <BookItem key={book._id} book={book.book} />
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrainingFull;
