import React from "react";
import { SearchForm } from "./SearchForm";
import { ShowBookArray } from "./ManageBooks/ShowBookArray";
import { ShowAuthorArray } from "./ManageAuthors/ShowAuthorArray";
import { ShowPublisherArray } from './ManagePublishers/ShowPublisherArray';
import { SignUpEmployee } from './SignUpEmployee';
import { BorrowedBooks } from './BorrowedBooks/BorrowedBooks';
import { Statistics } from './Statistics';

const Employee = ({
  socket,
  empID,
  navBarStatus,
  foundBooks,
  borrowedBooks,
  booksArray,
  authorsArray,
  publishersArray,
  topPublishers,
  topBorrowers,
  handleChangeState,
}) => {
  if (navBarStatus === 'search') {
    return (
    <div>
      <SearchForm socket={socket}/>
      {foundBooks.length !== 0
        ?
        <div className="books">
          <div className="row6 bold">
              <p className="col7">ISBN</p>
              <p className="col7">Title</p>
              <p className="col7">Author</p>
              <p className="col7">Publisher</p>
              <p className="col7">Published</p>
              <p className="col7">Pages</p>
              <p className="col7">Avail. Copies</p>
              <p className='col7'>Total Copies </p>
          </div>
          {foundBooks.map(book => (
            <div className="row7" key={book.ISBN}>
              <p className="col7">{book.ISBN}</p>
              <p className="col7">{book.title}</p>
              <p className="col7">{book.author}</p>
              <p className="col7">{book.pubName}</p>
              <p className="col7">{book.pubYear}</p>
              <p className="col7">{book.numPages}</p>
              <p className="col7">{book.remaining}</p>
              <p className="col7">{book.total} </p>
            </div>
          ))}
        </div>
      :
      <div> </div>
      }
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
  else if (navBarStatus === "statistics") {
    return (
      <Statistics topPublishers={topPublishers} topBorrowers={topBorrowers}/>
    );
  }
};

export { Employee };
