import React from 'react';
//import Button from '@material-ui/core/Button';

const Welcome = ( { handleChangeStatus } ) => {
  return (
  <div>
    <h4> Welcome to our Library! if you do not have an account please Sign Up.</h4>
    <button
     className="btn-large"
     variant="outlined"
     onClick={() => handleChangeStatus('signIn', 'member')}>
      Login as Member
    </button>
    <br/>
    <button className="btn-large"
    variant="outlined"
    onClick={() => handleChangeStatus('signIn', 'employee')}>
    Login as Employee
    </button>
    <br/>
    <button className="btn-large"
    variant="outlined"
    onClick={() => handleChangeStatus('signUp')}>
     Sign up
     </button>
    <br/>
  </div>
);
};
export { Welcome };
