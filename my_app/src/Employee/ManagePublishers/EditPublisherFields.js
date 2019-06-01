import React from 'react';
import TextField from '@material-ui/core/TextField';


class EditPublisherFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pubName: this.props.pubName,
      estYear: this.props.estYear,
      Street: this.props.Street,
      Street_num: this.props.Street_num,
      Postal_code: this.props.Postal_code,
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
          value={this.state.pubName}
          onChange={this.handleChange('pubName')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Year"
          value={this.state.estYear}
          onChange={this.handleChange('estYear')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Street"
          value={this.state.Street}
          onChange={this.handleChange('Street')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Street number"
          value={this.state.Street_num}
          onChange={this.handleChange('Street_num')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Postal code"
          value={this.state.Postal_code}
          onChange={this.handleChange('Postal_code')}
          margin="normal"
          variant="outlined"
        />
        <button className='btn-small'
        onClick={() => {
          this.props.socket.emit("UPDATE_PUBLISHER", this.state)
          this.props.handleEdit()
        }}> Update </button>
      </div>
      );
    }
}

export { EditPublisherFields };
