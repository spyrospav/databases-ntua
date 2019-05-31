import React from 'react';
import TextField from '@material-ui/core/TextField';


class InsertBookFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ISBN: '',
      title: '',
      author: '',
      publisher: '',
      publicationYear: '',
      copies: '',
      pages: ''
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
          label="Author"
          onChange={this.handleChange('author')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('publisher')}
          label="Publisher"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Publication Year"
          onChange={this.handleChange('publicationYear')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('pages')}
          label="Pages"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('copies')}
          label="Copies"
          margin="normal"
          variant="outlined"
        />
        <button className="btn" onClick={() => {
          this.props.socket.emit("INSERT_BOOK", this.state)
        }}> Insert </button>
      </div>
      );
    }
}

export { InsertBookFields };
