import React from "react";
import { SearchForm } from "./SearchForm";
import { ShowBookArray } from "./ManageBooks/ShowBookArray";
import { ShowAuthorArray } from "./ManageAuthors/ShowAuthorArray";
import { ShowPublisherArray } from './ManagePublishers/ShowPublisherArray';
import { SignUpEmployee } from './SignUpEmployee';
import { BorrowedBooks } from './BorrowedBooks/BorrowedBooks';

const Employee = ({
  socket,
  empID,
  navBarStatus,
  foundBooks,
  borrowedBooks,
  booksArray,
  authorsArray,
  publishersArray,
  handleChangeState,
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
        <BorrowedBooks socket={socket} empID={empID} borrowedBooks={borrowedBooks}/>
    );
  }
  else if (navBarStatus === 'addEmployee') {
    return (
      <SignUpEmployee socket={socket}/>
    );
  }
  else if (navBarStatus === 'manageBooks') {
    return (
      <ShowBookArray booksArray={booksArray} socket={socket}/>
    );
  }
  else if (navBarStatus === 'manageAuthors') {
    return (
      <ShowAuthorArray authorsArray={authorsArray} socket={socket}/>
    );
  }
  else if (navBarStatus === 'managePublishers') {
    return (
      <ShowPublisherArray socket={socket} publishersArray={publishersArray}/>
    );
  }
};

export { Employee };
