import React from 'react';

const Employee = ({ books, handleChangeState }) => {
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

      <h2> Expired: </h2>
    </div>
  );
};

export { Employee };
