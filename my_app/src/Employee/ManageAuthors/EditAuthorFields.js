import React from 'react';
import TextField from '@material-ui/core/TextField';


class EditAuthorFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorID: this.props.authorID,
      AFirst: this.props.AFirst,
      ALast: this.props.ALast,
      ABirthdate: this.props.ABirthdate,
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
          value={this.state.AFirst}
          onChange={this.handleChange('AFirst')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Last Name"
          value={this.state.ALast}
          onChange={this.handleChange('ALast')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Birth Date"
          value={this.state.ABirthdate}
          onChange={this.handleChange('ABirthdate')}
          margin="normal"
          variant="outlined"
        />
      </div>
      );
    }
}

export { EditAuthorFields };
