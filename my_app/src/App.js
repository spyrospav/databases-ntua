import React from 'react';
import { Welcome } from './Welcome';
import { SignIn } from './SignIn';
import { Member } from './Member';
import { SignUp } from './SignUp';

//state = 'welcome', 'signIn', 'signUp', 'memberPage'

const initialState = {
  state: "welcome",
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
  }
  render () {
    return (
      <div className="App">
        <h1> Library </h1>
        <Member books={this.state.books} />
      </div>
    );
  }
};

export default App;
