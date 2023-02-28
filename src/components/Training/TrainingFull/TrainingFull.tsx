import React from 'react';
import { ReadingTraining } from '../../../services/training/training-service';
import BookItem from '../BookItem';
import BookListHeader from '../BookListHeader';
import Checkbox from '../Checkbox';

interface Props {
  training: ReadingTraining;
}

const TrainingFull: React.FC<Props> = ({ training }) => {
  const onClickCheckbox = (bookId: string) => {
    //send status to book
    console.log(bookId);
  };

  return (
    <div>
      <div>
        <BookListHeader />
        <ul>
          {training.books.map(({ book }) => (
            <>
              <Checkbox
                status={book.status}
                clb={() => onClickCheckbox(book._id)}
              />
              <BookItem key={book._id} book={book} />
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrainingFull;
