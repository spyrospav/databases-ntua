import React from 'react';
import Button from '@material-ui/core/Button';

const Welcome = ( { handleChangeStatus } ) => {
  return (
  <div>
    <h4> Welcome to our Library, if you don't have an account please Sign Up</h4>
    <Button
     class="btn"
     variant="outlined"
     onClick={() => handleChangeStatus('signIn', 'member')}>
      Login as Member
    </Button>
    <br/>
    <Button class="btn"
    variant="outlined"
    onClick={() => handleChangeStatus('signIn', 'employee')}>
    Login as Employee
    </Button>
    <br/>
    <Button
    class="btn"
    variant="outlined"
    onClick={() => handleChangeStatus('signUp')}>
     Sign up
     </Button>
    <br/>
  </div>
);
};
export { Welcome };
