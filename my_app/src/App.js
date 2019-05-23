import React from 'react';
import { Welcome } from './Welcome';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Member } from './Member';
import { Employee } from './Employee';
//state = 'welcome', 'signIn', 'signUp', 'memberPage', 'employeePage'

const initialState = {
  status: "memberPage",
  employee: false,
  username: 'steph',
  password: 'curry',
  books: [
    {
      title: "book1",
      author: "author1"
    },
    {
      title: "book2",
      author: "author2"
    }
  ],
  reminders: [
    {
      title: "book3"
    },
    {
      title: 'book4'
    }
  ]
};

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = initialState;

    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
  }
  handleChangeStatus (status, user) {
    let employee;
    if (user === "member") {
        employee = false;
    }
    else {
      employee = true;
    }
    this.setState({
      employee: employee,
      status: status
    });
  }
  handleConnect (username, password) {
    this.setState({
      username: username,
      password: password
    })
  }

  render () {
    if (this.state.status === 'welcome') {
      return (
        <div className="App">
          <h1> Library </h1>
          <Welcome handleChangeStatus={this.handleChangeStatus}/>
        </div>
      );
    }
   else if (this.state.status === 'signIn') {
     return (
       <div className="App">
         <h1> Library </h1>
         <p> Sign in as: {this.state.employee ? <a>employee</a> : <a>member</a>} </p>
         <SignIn
            handleConnect={this.handleConnect}
            handleChangeStatus={this.handleChangeStatus}
          />
         <button onClick={() => this.handleChangeStatus("welcome")}>  Back </button>
       </div>
     );
   }
   else if (this.state.status === 'signUp') {
     return (
       <div className="App">
         <h1> Library </h1>
         <SignUp handleChangeStatus={this.handleChangeStatus}/>
         <button onClick={() => this.handleChangeStatus("welcome")}>  Back </button>
       </div>
     );
   }
   else if (this.state.status === 'memberPage') {
     return (
       <div className="App">
         <h1> Library </h1>
         <Member
          handleChangeStatus={this.handleChangeStatus}
          books={this.state.books}
          reminders={this.state.reminders}
          />
         <button onClick={() => this.handleChangeStatus("welcome")}>  Back </button>
       </div>
     );
   }
   else if (this.state.status === 'employeePage') {
     return (
       <div className="App">
         <h1> Library </h1>
         <Employee handleChangeStatus={this.handleChangeStatus} books={this.state.books} />
         <button onClick={() => this.handleChangeStatus("welcome")}>  Back </button>
       </div>
     );
   }
 }
};

export default App;
