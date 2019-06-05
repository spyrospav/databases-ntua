import React from 'react';

const Statistics = ({
  topPublishers,
  topBorrowers
}) => (
  <div>
    <h2> Statistics</h2>
    <div>
      <div>
        <p> Publisher{"'"}s Name </p>
        <p> Books Published</p>
        {topPublishers.map(val => (
            <div key={val.pubName}>
              <p>{val.pubName}</p>
              <p>{val.bookNum} </p>
            </div>
          ))}
        <p> Member ID </p>
        <p> Books Borrowed</p>
        {topBorrowers.map(val => (
          <div key={val.memberID}>
            <p>{val.memberID}</p>
            <p>{val.borrowNum} </p>
          </div>
      ))}


      </div>
    </div>
  </div>
);


export { Statistics };
