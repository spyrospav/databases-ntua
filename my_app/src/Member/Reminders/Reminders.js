import React from 'react';

const Reminders = ({
  reminders
}) => (
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
);

export { Reminders }
