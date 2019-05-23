import React from 'react';
import { SearchForm } from './SearchForm';

const Member = ({ books, handleChangeState, handleSearch }) => {
  return (
    <div>
      <SearchForm />
      <h2> Borrowed books </h2>
      {books.map(book =>
        <p> {book.title}, {book.author} </p>
      )}
      <h2> Reminders </h2>
    </div>
  );
};

export { Member };
