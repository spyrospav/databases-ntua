import React from 'react';
import { SearchForm } from './SearchForm';

const Member = ({ foundBooks, borrowedBooks, reminders, handleChangeState, handleSearch }) => {
  return (
    <div>
      <SearchForm />
      <h2> Books </h2>
      {foundBooks.map(book =>
        <div key={book.title+book.author}>
          <p> {book.title}, {book.author} </p>
          <button> borrow </button>
        </div>
      )}
      <h2> Borrowed books </h2>
      {borrowedBooks.map(book =>
        <div key={book.title+book.author}>
          <p> {book.title}, {book.author} </p>
        </div>
      )}
      <h2> Reminders </h2>
      {reminders.map(reminder =>
        <div>
          <p>return book: {reminder.title}</p>
          <p>exiration date: {reminder.expirationDate}</p>
        </div>
      )}
    </div>
  );
};

export { Member };
