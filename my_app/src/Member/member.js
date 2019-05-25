import React from 'react';
import { SearchForm } from './SearchForm';

const Member = ({
  foundBooks,
  borrowedBooks,
  reminders,
  handleChangeState,
  handleSearch
  }) => {
  return (
    <div>
        <div class="left-div content-box">
            <h2> Borrowed books </h2>
          {borrowedBooks.map(book =>
            <div key={book.title+book.author}>
              <p> {book.title}, {book.author} </p>
            </div>
          )}
        </div>

        <div class="middle-div content-box">
          <SearchForm />
        <div class="results">
          <h2>Results</h2>
                {foundBooks.map(book =>
                <div class="book">
                    <div key={book.title+book.author}>
                        <p> {book.title}, {book.author} </p>
                        <button class="btn"> borrow </button>
                    </div>
                </div>
                )}
            </div>
        </div>

        <div class="right-div content-box">
          <h2> Reminders </h2>
          {reminders.map(reminder =>
            <div>
              <p>return book: {reminder.title}</p>
              <p>exiration date: {reminder.expirationDate}</p>
            </div>
          )}
        </div>
    </div>
  );
};

export { Member };
