import React from 'react';

const Employee = ({ expiredBooks, handleChangeState }) => {
  return (
    <div>
      <h2> Search: </h2>
      <form>
        <input type="text" name="name" /> <br/>
        <p> Title </p>
        <input type="radio" />
        <p> Author </p>
        <input type="radio" />
        <p> Category </p>
        <input type="radio" />
      </form>

      <h2> Expired: </h2>
      {expiredBooks.map(book =>
        <div key={book.memberID+book.ISBN}>
          <p> Member ID: {book.memberID}</p>
          <p> ISBN: {book.ISBN}</p>
          <p> Copy Number: {book.copyNumber}</p>
          <p> Date of Borrowing: {book.dateOfBorrowing} </p>
          <p> Due to: {book.dueDate} </p>
          <button> Send reminder </button>
        </div>
      )}

      <h2> Add new employee: </h2>
      <button> Add </button>

    </div>
  );
};

export { Employee };
