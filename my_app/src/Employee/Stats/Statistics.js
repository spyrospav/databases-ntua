import React from 'react';

const Statistics = ({
  topPublishers,
  topBorrowers
}) => (
  <div>
    <h2> Statistics</h2>
    <div className="halfview">
        <div className="row2 bold">
          <p className="col2"> Publisher{"'"}s Name </p>
          <p className="col2"> Books Published</p>
        </div>
        {topPublishers.map(val => (
            <div className="row2" key={val.pubName}>
              <p className="col2">{val.pubName}</p>
              <p className="col2">{val.bookNum} </p>
            </div>
          ))}
    </div>

    <div className="halfview">
        <div className="row2 bold">
            <p className="col2"> Member ID </p>
            <p className="col2"> Books Borrowed</p>
        </div>
        {topBorrowers.map(val => (
          <div className="row2" key={val.memberID}>
            <p className="col2">{val.memberID}</p>
            <p className="col2">{val.borrowNum} </p>
          </div>
        ))}
    </div>

  </div>
);


export { Statistics };
