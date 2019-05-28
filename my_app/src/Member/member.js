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
        <div className="left-div content-box">
            <h2> Borrowed books </h2>
          {borrowedBooks.map(book =>
            <div key={book.title+book.author}>
              <p> {book.title}, {book.author} </p>
            </div>
          )}
        </div>

        <div className="middle-div content-box">
          <SearchForm />
        <div className="results">
          <h2>Results</h2>
                {foundBooks.map(book =>
                <div key={book.title+book.author} className="book">
                    <div>
                        <p> {book.title}, {book.author} </p>
                        <button className="btn"> borrow </button>
                    </div>
                </div>
                )}
            </div>
        </div>

        <div className="right-div content-box">
          <h2> Reminders </h2>
          {reminders.map(reminder =>
            <div key={reminder.title}>
              <p>return book: {reminder.title}</p>
              <p>exiration date: {reminder.expirationDate}</p>
            </div>
          )}
        </div>
    </div>
  );
};

export { Member };
