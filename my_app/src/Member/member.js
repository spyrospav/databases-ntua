import React from 'react';
import { SearchForm } from './SearchForm';
import { MyInfo } from './MyInfo';
import { Reminders } from './Reminders';
import { BorrowedBooks } from './BorrowedBooks';

const Member = ({
  socket,
  memberID,
  MFirst,
  MLast,
  Street,
  Street_num,
  Postal_code,
  MBirthdate,
  navBarStatus,
  foundBooks,
  borrowedBooks,
  reminders,
  handleChangeState,
  handleSearch
  }) => {
  if (navBarStatus ==='borrowedBooks') {
    return (
        <BorrowedBooks borrowedBooks={borrowedBooks} />
    );
  }
  else if (navBarStatus === 'search') {
    return (
      <SearchForm socket={socket} foundBooks={foundBooks} memberID={memberID}/>
    );
  }
  else if (navBarStatus === 'reminders') {
    return (
      <Reminders reminders={reminders}/>
    );
  }
  else if (navBarStatus === 'myInfo') {
    return (
      <MyInfo
        socket={socket}
        memberID={memberID}
        MFirst={MFirst}
        MLast={MLast}
        Street={Street}
        Street_num={Street_num}
        Postal_code={Postal_code}
        MBirthdate={MBirthdate}
      />
    );
  }
};

export { Member };
