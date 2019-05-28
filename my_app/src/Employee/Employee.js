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
        <div>
        {expiredBooks.map(book => (
          <div key={book.memberID + book.ISBN}>
            <p> Member ID: {book.memberID}</p>
            <p> ISBN: {book.ISBN}</p>
            <p> Copy Number: {book.copyNumber}</p>
            <p> Date of Borrowing: {book.dateOfBorrowing} </p>
            <p> Due to: {book.dueDate} </p>
            <button className="btn" onClick={() => handleSendReminder()}>
              {" "}
              Send reminder{" "}
            </button>
          </div>
        ))}
      </div>
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
