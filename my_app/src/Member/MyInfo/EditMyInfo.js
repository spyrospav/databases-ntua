import React from 'react';
import TextField from '@material-ui/core/TextField';


class EditMyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberID: this.props.memberID,
      MFirst: this.props.MFirst,
      MLast: this.props.MLast,
      Street: this.props.Street,
      Street_num: this.props.Street_num,
      Postal_code: this.props.Postal_code,
      MBirthdate: this.props.MBirthdate,
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
          value={this.state.MFirst}
          onChange={this.handleChange('MFirst')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Last Name"
          value={this.state.MLast}
          onChange={this.handleChange('MLast')}
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
        <TextField
          id="outlined-name"
          label="Birth Date"
          value={this.state.MBirthdate}
          onChange={this.handleChange('MBirthdate')}
          margin="normal"
          variant="outlined"
        />
        <br/>
        <button className='btn-large' onClick={() => {
          this.props.socket.emit("UPDATE_MEMBER", this.state);
          this.props.handleEdit();
        }}>
        Update Info </button>
      </div>
      );
    }
}

export { EditMyInfo };
