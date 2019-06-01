import React from "react";

const BorrowedBooks = ({
  socket,
  borrowedBooks,
  empID,
}) => (
  <div>
    <h2> Borrowed Books: </h2>
    <div className="row6">
      <h3 className="col6">Member ID </h3>
      <h3 className="col6">ISBN </h3>
      <h3 className="col6">Copy Number </h3>
      <h3 className="col6">Borrowed on</h3>
      <h3 className="col6">Due</h3>
      <h3 className="col6"> </h3>
    </div>
    {borrowedBooks.map(book => (
      <div className="row6" key={book.memberID + book.ISBN}>
        <p className="col6">{book.memberID}</p>
        <p className="col6"> {book.ISBN}</p>
        <p className="col6"> {book.copyNr}</p>
        <p className="col6"> {book.date_of_borrowing} </p>
        <p className="col6"> {book.due_date} </p>
        <button className="col6 btn" onClick={() => socket.emit("SENT_REMINDER", {...book, empID: empID})}>
          {" "}
          Send reminder{" "}
        </button>
        <button className='col6 btn'
        onClick={() => socket.emit("RETURN_BOOK", book)}>
          Return
        </button>
      </div>
    ))}
  </div>
)

export { BorrowedBooks };
