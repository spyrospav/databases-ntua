import React from 'react';
import { SearchForm } from './SearchForm';
import { ShowBookArray } from './ShowBookArray';

const Employee = ({
  foundBooks,
  expiredBooks,
  booksArray,
  handleChangeState,
  handleAddEmployee,
  handleSendReminder
  }) => {
  return (
    <div>
      <div className="middle-div content-box">
        <SearchForm />
      <div className="results">
        <h2>Results</h2>
        {foundBooks.map(book =>
        <div key={book.title+book.author} className="book">
            <div>
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

      <form>
        <div className="radiotext">
            <p> Title </p>
            <input type="radio" name="searchOption"/>
        </div>
        <div className="radiotext">
            <p> Author </p>
            <input type="radio" name="searchOption"/>
        </div>
        <div className="radiotext">
            <p> Category </p>
            <input type="radio" name="searchOption"/> <br/>
        </div>
      </form>

      <ShowBookArray booksArray={booksArray}/>

    </div>
  );
};

export { Employee };
