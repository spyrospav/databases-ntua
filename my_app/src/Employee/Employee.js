import React from 'react';
import { SearchForm } from './SearchForm';

const Employee = ({
  foundBooks,
  expiredBooks,
  handleChangeState,
  handleAddEmployee,
  handleSendReminder
  }) => {
  return (
    <div>
      <div class="middle-div content-box">
        <SearchForm />
      <div class="results">
        <h2>Results</h2>
              {foundBooks.map(book =>
              <div class="book">
                  <div key={book.title+book.author}>
                      <p> {book.title}, {book.author} </p>
                  </div>
              </div>
              )}
          </div>
      </div>


      <h2> Expired: </h2>
      {expiredBooks.map(book =>
        <div key={book.memberID+book.ISBN}>
          <p> Member ID: {book.memberID}</p>
          <p> ISBN: {book.ISBN}</p>
          <p> Copy Number: {book.copyNumber}</p>
          <p> Date of Borrowing: {book.dateOfBorrowing} </p>
          <p> Due to: {book.dueDate} </p>
          <button onClick={() => handleSendReminder()}> Send reminder </button>
        </div>
      )}

      <h2> Add new employee: </h2>
      <button onClick={() => handleAddEmployee() }> Add </button>

    </div>
  );
};

export { Employee };
