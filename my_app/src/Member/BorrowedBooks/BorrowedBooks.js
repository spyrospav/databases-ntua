import React from 'react';

const BorrowedBooks = ({
  borrowedBooks
}) => (
  <div>
    <h2> Borrowed Books: </h2>
    <div className="row3">
      <h3 className="col3">ISBN </h3>
      <h3 className="col3">Borrowed on</h3>
      <h3 className="col3">Due</h3>
    </div>
    {borrowedBooks.map(book => (
      <div className="row3" key={book.memberID + book.ISBN}>
        <p className="col3"> {book.ISBN}</p>
        <p className="col3"> {book.date_of_borrowing} </p>
        <p className="col3"> {book.due_date} </p>
      </div>
    ))}
    </div>
);

export { BorrowedBooks };
