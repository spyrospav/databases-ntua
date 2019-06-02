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
<<<<<<< HEAD
          label="Author's Name"
=======
          label="Author's First Name"
>>>>>>> d382a374d770383ccb912922d8487c3799b2ebe0
          onChange={this.handleChange('AFirst')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
<<<<<<< HEAD
          label="Author's Last Name"
          onChange={this.handleChange('ALast')}
=======
          onChange={this.handleChange('ALast')}
          label="Author's Last Name"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('pubName')}
          label="Publisher"
>>>>>>> d382a374d770383ccb912922d8487c3799b2ebe0
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
