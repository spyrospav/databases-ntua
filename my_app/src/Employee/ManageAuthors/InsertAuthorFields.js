import React from 'react';
import TextField from '@material-ui/core/TextField';


class InsertAuthorFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorID: '',
      AFirst: '',
      ALast: '',
      ABirthdate: '',
    }

  }

  handleChange = field => event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      [field]: event.target.value
    })
  };

  render() {
    return (
      <div>
        <TextField
          id="outlined-name"
          label="First Name"
          onChange={this.handleChange('AFirst')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Last Name"
          onChange={this.handleChange('ALast')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Birth Date"
          onChange={this.handleChange('ABirthdate')}
          margin="normal"
          variant="outlined"
        />
        <button className="btn" onClick={ () => {
          this.props.socket.emit("INSERT_AUTHOR", this.state)
          this.props.handleInsert();
        }}> Insert </button>
      </div>
      );
    }
}

export { InsertAuthorFields };
