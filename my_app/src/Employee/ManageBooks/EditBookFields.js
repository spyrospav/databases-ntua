import React from 'react';
import TextField from '@material-ui/core/TextField';


class EditBookFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ISBN: this.props.ISBN,
      title: this.props.title,
      pubName: this.props.publisher,
      pubYear: this.props.publicationYear,
      numPages: this.props.numOfPages,
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
          label="Title"
          value={this.state.title}
          onChange={this.handleChange('title')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('pubName')}
          value={this.state.pubName}
          label="Publisher"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Publication Year"
          value={this.state.pubYear}
          onChange={this.handleChange('pubYear')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          onChange={this.handleChange('numPages')}
          label="Pages"
          value={this.state.numPages}
          margin="normal"
          variant="outlined"
        />
        <button className='btn-small' onClick={ () => {
          this.props.socket.emit("UPDATE_BOOK", this.state);
          this.props.handleEdit();
        }}>
        Update </button>
      </div>
      );
    }
}

export { EditBookFields };
