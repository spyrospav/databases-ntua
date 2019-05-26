import React from 'react';
import { Welcome } from './Welcome';
import { SignIn } from './SignIn';
import { SignUpMember } from './SignUpMember';
import { Member } from './Member';
import { Employee } from './Employee';
//state = 'welcome', 'signIn', 'signUp', 'memberPage', 'employeePage'

const initialState = {
  status: "welcome",
  employee: false,
  username: 'steph',
  password: 'curry',
  borrowedBooks: [
    {
      title: "book1",
      author: "author1"
    },
    {
      title: "book2",
      author: "author2"
    }
  ],
  foundBooks: [
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
      title: "book3",
      expirationDate: '1/7'
    },
    {
      title: 'book4',
      expirationDate: '2/7'
    }
  ]
  ,
  expiredBooks: [
    {
      memberID: "1",
      expirationDate: "1/7"
    }
  ]
};

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = initialState;

    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.goToWelcome = this.goToWelcome.bind(this);
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

  goToWelcome () {
    this.setState({
      status: 'welcome'
    })
  }

  render () {
    if (this.state.status === 'welcome') {
      return (
        <div className="App">
          <Welcome handleChangeStatus={this.handleChangeStatus}/>
        </div>
      );
    }
   else if (this.state.status === 'signIn') {
     return (
       <div className="App">
         <p> Sign in as: {this.state.employee ? <a>employee</a> : <a>member</a>} </p>
         <SignIn
            handleConnect={this.handleConnect}
            handleChangeStatus={this.handleChangeStatus}
          />
         <button onClick={() => this.goToWelcome()}>  Back </button>
       </div>
     );
   }
   else if (this.state.status === 'signUp') {
     return (
       <div className="App">
         <SignUpMember handleChangeStatus={this.handleChangeStatus}/>
         <button onClick={() => this.goToWelcome()}>  Back </button>
       </div>
     );
   }
   else if (this.state.status === 'memberPage') {
     return (
       <div className="App">
         <Member
          handleChangeStatus={this.handleChangeStatus}
          foundBooks={this.state.foundBooks}
          borrowedBooks={this.state.borrowedBooks}
          reminders={this.state.reminders}
          />
         <button onClick={() => this.goToWelcome()}>  Back </button>
       </div>
     );
   }
   else if (this.state.status === 'employeePage') {
     return (
       <div className="App">
         <Employee
         handleChangeStatus={this.handleChangeStatus}
         foundBooks={this.state.foundBooks}
         expiredBooks={this.state.expiredBooks}
         />
         <button onClick={() => this.goToWelcome()}>  Back </button>
       </div>
     );
   }
 }
};

export default App;
