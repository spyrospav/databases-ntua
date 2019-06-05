import React from "react";
import { SearchForm } from "./SearchForm";
import { ShowBookArray } from "./ManageBooks";
import { ShowAuthorArray } from "./ManageAuthors";
import { ShowPublisherArray } from './ManagePublishers';
import { SignUpEmployee } from './SignUpEmployee';
import { BorrowedBooks } from './BorrowedBooks';
import { Statistics } from './Stats';

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
      <SearchForm socket={socket} foundBooks={foundBooks}/>  
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
