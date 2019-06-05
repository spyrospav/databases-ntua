import React from 'react';

const Reminders = ({
  reminders
}) => (
  <div>
    <h2>reminders</h2>
    <div className="row3">
      <h3 className="col3">ISBN </h3>
      <h3 className="col3">Date of borrowing</h3>
      <h3 className="col3">Date of reminder</h3>
    </div>
    {reminders.map(reminder => (
      <div className="row3" key={reminder.empID + reminder.memberID + reminder.ISBN + reminder.date_of_borrowing}>
        <p className="col3"> {reminder.ISBN}</p>
        <p className="col3"> {reminder.date_of_borrowing} </p>
        <p className="col3"> {reminder.date_of_reminder} </p>
      </div>
    ))}
  </div>
);

export { Reminders }
