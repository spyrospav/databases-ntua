import React from 'react';

const Member = ({ books }) => {
  return (
    <div>
      <h2> Search: </h2>
      <form>
        <input type="text" name="name" /> <br/>
        <p> Title </p>
        <input type="radio" />
        <p> Author </p>
        <input type="radio" />
        <p> Category </p>
        <input type="radio" />
      </form>

      <h2> Borrowed books </h2>
      {books.map(book =>
        <p> test </p>
      )}
      <h2> Reminders </h2>
    </div>
  );
};

export { Member };
