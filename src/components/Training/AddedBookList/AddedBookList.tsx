import React, { FC } from 'react';
import BookListHeader from '../BookListHeader';
import { Book } from '../../../services/books/books-service';

type Props = {
  activeBooks: Book[];
};

const AddedBooksList: FC<Props> = ({ activeBooks }) => {
  return (
    <div>
      <BookListHeader />
    </div>
  );
};

export default AddedBooksList;
