import React from 'react';
import Button from '@material-ui/core/Button';

const Welcome = ( { handleChangeState } ) => {
  return (
  <div>
    <Button variant="outlined" onClick={() => handleChangeState("signIn")}> Login as Member</Button>
    <br/>
    <Button variant="outlined" onClick={() => handleChangeState("signIn")}> Login as Employee </Button>
    <br/>
    <Button variant="outlined" onClick={() => handleChangeState("signUp")}> Sign up </Button>
    <br/>
  </div>
);
};
export { Welcome };
