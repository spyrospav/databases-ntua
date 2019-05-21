import React from 'react';
import { Welcome } from './Welcome';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Member } from './Member';
import { Employee } from './Employee';
//state = 'welcome', 'signIn', 'signUp', 'memberPage', 'employeePage'

const initialState = {
  status: "welcome",
  employee: false,
  books: [
    {
      title: "book1",
      author: "author1"
    },
    {
      title: "book2",
      author: "author2"
    }
  ]
};

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = initialState;

    this.handleChangeState = this.handleChangeState.bind(this);
  }
  handleChangeState (status) {
    this.setState({
      status: status
    });
  }
  render () {
    if (this.state.status === 'welcome') {
      return (
        <div className="App">
          <h1> Library </h1>
          <Welcome handleChangeState={this.handleChangeState}/>
        </div>
      );
    }
   else if (this.state.status === 'signIn') {
     return (
       <div className="App">
         <h1> Library </h1>
         <SignIn handleChangeState={this.handleChangeState}/>
         <button onClick={() => this.handleChangeState("welcome")}>  Back </button>
       </div>
     );
   }
   else if (this.state.status === 'signUp') {
     return (
       <div className="App">
         <h1> Library </h1>
         <SignUp handleChangeState={this.handleChangeState}/>
         <button onClick={() => this.handleChangeState("welcome")}>  Back </button>
       </div>
     );
   }
   else if (this.state.status === 'memberPage') {
     return (
       <div className="App">
         <h1> Library </h1>
         <Member handleChangeState={this.handleChangeState} books={this.state.books} />
         <button onClick={() => this.handleChangeState("welcome")}>  Back </button>
       </div>
     );
   }
   else if (this.state.status === 'employeePage') {
     return (
       <div className="App">
         <h1> Library </h1>
         <Employee handleChangeState={this.handleChangeState} books={this.state.books} />
         <button onClick={() => this.handleChangeState("welcome")}>  Back </button>
       </div>
     );
   }
 }
};

export default App;
