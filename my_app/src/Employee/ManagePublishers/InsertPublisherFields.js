import React from 'react';
import TextField from '@material-ui/core/TextField';


class InsertPublisherFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pubName: '',
      estYear: '',
      Street: '',
      Street_num: '',
      Postal_code: '',
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
          label="Publisher's Name"
          onChange={this.handleChange('pubName')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Year"
          onChange={this.handleChange('estYear')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Street"
          onChange={this.handleChange('Street')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Street number"
          onChange={this.handleChange('Street_num')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Postal code"
          onChange={this.handleChange('Postal_code')}
          margin="normal"
          variant="outlined"
        />
        <br />
        <button className="btn" onClick={ () => {
          this.props.socket.emit("INSERT_PUBLISHER", this.state)
          this.props.handleInsert();
        }}> Insert </button>
      </div>
      );
    }
}

export { InsertPublisherFields };
