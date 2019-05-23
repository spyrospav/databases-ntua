import React from 'react';
import { SearchForm } from './SearchForm';

const Member = ({ books, reminders, handleChangeState, handleSearch }) => {
  return (
    <div>
      <SearchForm />
      <h2> Borrowed books </h2>
      {books.map(book =>
        <div key={book.title+book.author}>
          <p> {book.title}, {book.author} </p>
          <button> Borrow </button>
        </div>
      )}
      <h2> Reminders </h2>
      {reminders.map(reminder =>
        <div>
          <p>reminder</p>
        </div>
      )}
    </div>
  );
};

export { Member };
