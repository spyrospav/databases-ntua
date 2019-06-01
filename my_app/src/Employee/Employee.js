import React from "react";
import { SearchForm } from "./SearchForm";
import { ShowBookArray } from "./ManageBooks/ShowBookArray";
import { ShowAuthorArray } from "./ManageAuthors/ShowAuthorArray";
import { ShowPublisherArray } from './ManagePublishers/ShowPublisherArray';

const Employee = ({
  socket,
  navBarStatus,
  foundBooks,
  borrowedBooks,
  booksArray,
  authorsArray,
  publishersArray,
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
  else if (navBarStatus === 'borrowedBooks') {
    return (
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
            <button className="col6 btn" onClick={() => handleSendReminder()}>
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
         <ShowBookArray booksArray={booksArray} socket={socket}/>
       </div>
    );
  }
  else if (navBarStatus === 'manageAuthors') {
    return (
      <div>
        <ShowAuthorArray authorsArray={authorsArray} socket={socket}/>
      </div>
    );
  }
  else if (navBarStatus === 'managePublishers') {
    return <ShowPublisherArray socket={socket} publishersArray={publishersArray}/>
  }
};

export { Employee };
