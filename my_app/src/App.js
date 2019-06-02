import React from 'react';
import { Welcome } from './Welcome';
import { SignIn } from './SignIn';
import { SignUpMember } from './SignUpMember';
import { Member } from './Member';
import { Employee } from './Employee';
//state = 'welcome', 'signIn', 'signUp', 'memberPage', 'employeePage'

import io from 'socket.io-client';
const url = "http://localhost:8000";
let socket = io(url);

const initialState = {
  status: "welcome",
  employee: false,
  empID: '',
  memberID: '',
  navBarStatus: 'search', //'search','manageBooks','borrowedBooks','addEmployee'
  borrowedBooks: [],
  foundBooks: [],
  reminders: [],
  booksArray: [],
  authorsArray: [],
  publishersArray: [],
};

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = initialState;

    socket.on("SUCCESSFUL_LOGIN", () => {
      if (this.state.employee) {
        this.setState({status: 'employeePage'})
      }
      else {
        this.setState({status: 'memberPage'});
        socket.emit("FETCH_BOOKS");
      }
    })

    socket.on("SUCCESSFUL_SIGNUP", (memberID) => {
      alert(`Your member id is: ${memberID}`);
      this.setState({status: 'memberPage'});
    })
    socket.on("UNSUCCESSFUL_LOGIN", () => alert("Invalid credentials."))
    //employee page:
    socket.on("FETCH_EXPIRED_BOOKS", (expiredBooks) =>
      this.setState({expiredBooks: expiredBooks}))

    socket.on("FETCH_BOOKS", books => this.setState({booksArray: books, foundBooks: books}))
    socket.on("FETCH_AUTHORS", authors => this.setState({authorsArray: authors}))
    socket.on("FETCH_PUBLISHERS", publishers => this.setState({publishersArray: publishers}))
    socket.on("FETCH_REMINDERS", reminders => this.setState({reminders: reminders}))
    socket.on("FETCH_ACTIVE_BORROWS_EMPLOYEE", borrowedBooks => this.setState({borrowedBooks: borrowedBooks}))
    socket.on("FETCH_ACTIVE_BORROWS_MEMBERS", borrowedBooks => this.setState({borrowedBooks: borrowedBooks}))

    socket.on('SUCCESSFUL_RETURN_BOOK', () => socket.emit("FETCH_ACTIVE_BORROWS_EMPLOYEE"));
    socket.on('SUCCESSFUL_ADD_EMPLOYEE', id => alert(`Id of employee inserted: ${id}`));
    socket.on('SUCCESSFUL_INSERT_BOOK', () => socket.emit("FETCH_BOOKS"));
    socket.on('SUCCESSFUL_DELETE_BOOK', () => socket.emit("FETCH_BOOKS"));
    socket.on("SUCCESSFUL_BORROW", () => {alert("Successful borrow"); socket.emit("FETCH_BOOKS")})
    socket.on("UNSUCCESSFUL_BORROW", () => alert("Cannot borrow more than 5 books..."))
    //socket.on('SUCCESSFUL_SENT_REMINDER', () => socket.emit("FETCH_ACTIVE_BORROWS_EMPLOYEE"));

    socket.on("SUCCESSFUL_INSERT_AUTHOR", () => socket.emit("FETCH_AUTHORS"));
    socket.on("SUCCESSFUL_DELETE_AUTHOR", () => socket.emit("FETCH_AUTHORS"));
    socket.on("SUCCESSFUL_UPDATE_AUTHOR", () => socket.emit("FETCH_AUTHORS"));

    socket.on("SUCCESSFUL_INSERT_PUBLISHER", () => socket.emit("FETCH_PUBLISHERS"));
    socket.on("SUCCESSFUL_DELETE_PUBLISHER", () => socket.emit("FETCH_PUBLISHERS"));
    socket.on("SUCCESSFUL_UPDATE_PUBLISHER", () => socket.emit("FETCH_PUBLISHERS"));

    socket.on("SEARCH_BOOKS", foundBooks => this.setState({foundBooks: foundBooks}))
    //======================


    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleAddEmployee = this.handleAddEmployee.bind(this);
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
  handleAddEmployee () {
    this.setState({
      employee: true,
      status: 'signUp'
    })
  }

  handleEmployeeLogin = (empID) => {
    this.setState({empID: empID});
  }
  handleMemberLogin = (memberID) => {
    this.setState({memberID: memberID})
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
        <div className="navbar">
            <img src="images/icons8-book-shelf-100.png" alt="Our Logo"/>
            <a href="#home">CODeS Public Library</a>
        </div>
          <Welcome handleChangeStatus={this.handleChangeStatus}/>
        </div>
      );
    }
   else if (this.state.status === 'signIn') {
     return (
       <div className="App">
       <div className="navbar">
           <img src="images/icons8-book-shelf-100.png" alt="Our Logo"/>
           <a href="#home">CODeS Public Library</a>
       </div>
         <p> Sign in as:<strong> {this.state.employee ? <a>employee</a> : <a>member</a>} </strong></p>
         <SignIn
            socket={socket}
            handleMemberLogin={this.handleMemberLogin}
            handleEmployeeLogin={this.handleEmployeeLogin}
            handleMemberLogin={this.handleMemberLogin}
            employee={this.state.employee}
            handleConnect={this.handleConnect}
            handleChangeStatus={this.handleChangeStatus}
          />
         <button
         className='btn'
         onClick={() => this.goToWelcome()}>
          Back
          </button>
       </div>
     );
   }
   else if (this.state.status === 'signUp') {
     return (
       <div className="App">
       <div className="navbar">
           <img src="images/icons8-book-shelf-100.png" alt="Our Logo"/>
           <a href="#home">CODeS Public Library</a>
       </div>
         <SignUpMember socket={socket} handleChangeStatus={this.handleChangeStatus}/>
         <button
         className="btn"
         onClick={() => this.goToWelcome()}
         >
         Back
         </button>
       </div>
     );
   }
   else if (this.state.status === 'memberPage') {
     return (
       <div className="App">
       <div className="navbar">
           <img src="images/icons8-book-shelf-100.png" alt="Our Logo"/>
           <a href="#">CODeS Public Library</a>
           <a onClick={() => {
             this.setState({navBarStatus: 'search'})
           }} href="#">Search</a>
         <a onClick={ () => {
             socket.emit("FETCH_ACTIVE_BORROWS_MEMBERS", this.state.memberID);
             this.setState({navBarStatus: 'borrowedBooks'})
           }} href="#">Borrowed Books </a>
          <a onClick={() => {
            socket.emit("FETCH_REMINDERS", this.state.memberID);
            this.setState({navBarStatus: 'reminders'})
          }} href="#">Reminders</a>
       </div>
         <Member
          socket={socket}
          memberID={this.state.memberID}
          navBarStatus={this.state.navBarStatus}
          handleChangeStatus={this.handleChangeStatus}
          foundBooks={this.state.foundBooks}
          borrowedBooks={this.state.borrowedBooks}
          reminders={this.state.reminders}
          />
         <button
         className="btn"
         onClick={() => {
           this.setState({...initialState})
           this.goToWelcome()
         }}>
          Logout
          </button>
       </div>
     );
   }
   else if (this.state.status === 'employeePage') {
     return (
       <div className="App">
         <div className="navbar">
             <img src="images/icons8-book-shelf-100.png" alt="Our Logo"/>
             <a href="#">CODeS Public Library</a>
             <a onClick={() => this.setState({navBarStatus: 'search'})} href="#">Search</a>
             <a onClick={() => {
               this.setState({navBarStatus: 'manageBooks'})
               socket.emit("FETCH_BOOKS")
             }}
             href="#">
             Manage Books
             </a>
             <a href="#" onClick={() => {
               socket.emit("FETCH_AUTHORS")
               this.setState({navBarStatus: "manageAuthors"})
             }}>
             Manage Authors
             </a>
             <a href="#" onClick={() => {
               socket.emit("FETCH_PUBLISHERS")
               this.setState({navBarStatus: "managePublishers"})
             }}>
              Manage Publishers
             </a>
             <a onClick={() => {
               socket.emit("FETCH_ACTIVE_BORROWS_EMPLOYEE");
               this.setState({navBarStatus: 'borrowedBooks'})
             }} href="#">Borrowed Books </a>
             <a onClick={() => this.setState({navBarStatus: 'addEmployee'})} href="#">Add Employee</a>
         </div>
         <Employee
         socket={socket}
         empID={this.state.empID}
         navBarStatus={this.state.navBarStatus}
         handleChangeStatus={this.handleChangeStatus}
         handleAddEmployee={this.handleAddEmployee}
         foundBooks={this.state.foundBooks}
         borrowedBooks={this.state.borrowedBooks}
         booksArray={this.state.booksArray}
         authorsArray={this.state.authorsArray}
         publishersArray={this.state.publishersArray}
         />
         <button
         className = "btn"
         onClick={() => {
           this.setState({...initialState})
           this.goToWelcome()}}
         >
          Logout
         </button>
       </div>

     );
   }
 }
};

export default App;
