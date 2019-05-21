import React from 'react';

const Welcome = ( { handleChangeState } ) => {
  return (
  <div>
    <button onClick={() => handleChangeState("memberPage")}> Login as Member</button>
    <br/>
    <button onClick={() => handleChangeState("employeePage")}> Login as Employee </button>
    <br/>
    <button onClick={() => handleChangeState("signUp")}> Sign up </button>
    <br/>
  </div>
);
};
export { Welcome };
