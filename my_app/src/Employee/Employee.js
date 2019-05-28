import React from "react";
import { SearchForm } from "./SearchForm";
import { ShowBookArray } from "./ShowBookArray";

const Employee = ({
  navBarStatus,
  foundBooks,
  expiredBooks,
  booksArray,
  handleChangeState,
  handleAddEmployee,
  handleSendReminder
}) => {
  if (navBarStatus === 'search') {
    return (
    <div>
      <SearchForm />
      <div className="results">
        <h2>Results</h2>
        {foundBooks.map(book => (
          <div key={book.title + book.author} className="book">
            <div>
              <p>
                {" "}
                {book.title}, {book.author}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
  }
  else if (navBarStatus === 'reminders') {
    return (
      <div>
        <h2> Expired: </h2>
        <div className="row6">
          <h3 className="col6">Member ID </h3>
          <h3 className="col6">ISBN </h3>
          <h3 className="col6">Copy Number </h3>
          <h3 className="col6">Borrowed on</h3>
          <h3 className="col6">Due</h3>
          <h3 className="col6"> </h3>
        </div>
        {expiredBooks.map(book => (
          <div className="row6" key={book.memberID + book.ISBN}>
            <p className="col6">{book.memberID}</p>
            <p className="col6"> {book.ISBN}</p>
            <p className="col6"> {book.copyNumber}</p>
            <p className="col6"> {book.dateOfBorrowing} </p>
            <p className="col6"> {book.dueDate} </p>
            <button className="col6 btn" onClick={() => handleSendReminder()}>
              {" "}
              Send reminder{" "}
            </button>
          </div>
        ))}
      </div>

    );
  }
  else if (navBarStatus === 'addEmployee') {
    return (
      <div>
        <h2> Add new employee </h2>
        <button className="btn" onClick={() => handleAddEmployee()}> Add </button>
      </div>
    )
  }

  else if (navBarStatus === 'manageBooks') {
    return (
      <div>
         <ShowBookArray booksArray={booksArray} />
       </div>
    );
  }
};

export { Employee };
