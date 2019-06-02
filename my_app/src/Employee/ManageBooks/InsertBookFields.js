import React from 'react';
import TextField from '@material-ui/core/TextField';


class InsertBookFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ISBN: '',
      title: '',
      AFirst: '',
      ALast: '',
      pubName: '',
      pubYear: '',
      numOfCopies: '',
      numPages: '',
      shelf: ''
    }

  }

  handleChange = field => event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      [field]: event.target.value
    })
    //this.props.handleChange();
  };

  render() {
    return (
      <div>
        <TextField
          id="outlined-name"
          label="ISBN"
          onChange={this.handleChange('ISBN')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Title"
          onChange={this.handleChange('title')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Author's First Name"
          onChange={this.handleChange('AFirst')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Author's Last Name"
          onChange={this.handleChange('ALast')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('pubName')}
          label="Publisher"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-name"
          label="Publication Year"
          onChange={this.handleChange('pubYear')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('numPages')}
          label="Pages"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('numOfCopies')}
          label="Copies"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('shelf')}
          label="Shelf number"
          margin="normal"
          variant="outlined"
        />
        <button className="btn" onClick={() => {
          this.props.handleInsert();
          this.props.socket.emit("INSERT_BOOK", this.state)
        }}> Insert </button>
      </div>
      );
    }
}

export { InsertBookFields };
