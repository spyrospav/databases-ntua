import React from 'react';

const BorrowedBooks = ({
  borrowedBooks
}) => (
  <div>
    <h2> Borrowed Books: </h2>
    <div className="row6">
      <h3 className="col6">ISBN </h3>
      <h3 className="col6">Borrowed on</h3>
      <h3 className="col6">Due</h3>
    </div>
    {borrowedBooks.map(book => (
      <div className="row6" key={book.memberID + book.ISBN}>
        <p className="col6"> {book.ISBN}</p>
        <p className="col6"> {book.date_of_borrowing} </p>
        <p className="col6"> {book.due_date} </p>
      </div>
    ))}
    </div>
);

export { BorrowedBooks };
