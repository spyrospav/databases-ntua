import React from 'react';
import TextField from '@material-ui/core/TextField';


class EditBookFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ISBN: this.props.ISBN,
      title: this.props.title,
      author: this.props.author,
      publisher: this.props.publisher,
      publicationYear: this.props.publicationYear,
      numOfCopies: this.props.numOfCopies,
      numOfPages: this.props.numOfPages,
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
          value={this.state.ISBN}
          onChange={this.handleChange('ISBN')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Title"
          value={this.state.title}
          onChange={this.handleChange('title')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Author"
          value={this.state.author}
          onChange={this.handleChange('author')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('publisher')}
          value={this.state.publisher}
          label="Publisher"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Publication Year"
          value={this.state.publicationYear}
          onChange={this.handleChange('publicationYear')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('numOfPages')}
          label="Pages"
          value={this.state.numOfPages}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('numOfCopies')}
          label="Copies"
          value={this.state.numOfCopies}
          margin="normal"
          variant="outlined"
        />
      </div>
      );
    }
}

export { EditBookFields };
