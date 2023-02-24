import React, { useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '../../../hooks/StrictModeDroppable';
import LibraryBook from '../LibraryBook/LibraryBook';
import { BooksI } from '../library.interfaces';

const BookListEl = ({ books }: BooksI) => {
  const onDragEnd = useCallback((result: DropResult) => {
    console.log('onDragEnd', result);
  }, []);
  const status = Array.from(new Set(books?.map((book) => book.status))).join();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId={status === 'done' ? 'done' : status === 'pending' ? 'pending' : 'active'} >
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {books?.map((book, i) => (
              <LibraryBook book={book} key={book._id} index={i} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default BookListEl;
