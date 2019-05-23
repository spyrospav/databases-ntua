import React from 'react';
import Button from '@material-ui/core/Button';

const Welcome = ( { handleChangeStatus } ) => {
  return (
  <div>
    <Button variant="outlined" onClick={() => handleChangeStatus('signIn', 'member')}> Login as Member</Button>
    <br/>
    <Button variant="outlined" onClick={() => handleChangeStatus('signIn', 'employee')}> Login as Employee </Button>
    <br/>
    <Button variant="outlined" onClick={() => handleChangeStatus('signUp')}> Sign up </Button>
    <br/>
  </div>
);
};
export { Welcome };
