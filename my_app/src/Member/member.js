import React from 'react';
import { SearchForm } from './SearchForm';

const Member = ({
  socket,
  memberID,
  navBarStatus,
  foundBooks,
  borrowedBooks,
  reminders,
  handleChangeState,
  handleSearch
  }) => {
  return (
    <div>

    {(navBarStatus === 'borrowedBooks')
    ?
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
      :
      <div></div>
    }
    {navBarStatus === "search"
    ?
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
                {book.remaining > 0
                  ?
                <button
                className='btn'
                onClick={ () => {
                  socket.emit("BORROW_BOOK", {memberID, ISBN: book.ISBN})
                }} > Borrow </button>
                :
                <p></p>
                }
              </div>
            ))}
          </div>
        :
        <div> </div>
        }
    </div>
    :
    <div> </div>
    }

    {navBarStatus === "reminders"
    ?
    <div>
      <h2>reminders</h2>
      <div className="row6">
        <h3 className="col6">ISBN </h3>
        <h3 className="col6">Date of borrowing</h3>
        <h3 className="col6">Date of reminder</h3>
        {reminders.map(reminder => (
          <div className="row6" key={reminder.empID + reminder.memberID + reminder.ISBN + reminder.date_of_borrowing}>
            <p className="col6"> {reminder.ISBN}</p>
            <p className="col6"> {reminder.date_of_borrowing} </p>
            <p className="col6"> {reminder.date_of_reminder} </p>
          </div>
        ))}
      </div>
    </div>
    :
    <div></div>
    }
    </div>
  );
};

export { Member };
