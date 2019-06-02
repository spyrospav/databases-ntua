import React from 'react';
import { EditMyInfo } from './EditMyInfo';

class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
  }
  handleEdit = () => {
    this.setState({edit: false});
  }
  render() {

    return (
      (this.state.edit === false)
        ?
      <div>
        <h2> My info </h2>
        <p>First Name: {this.props.MFirst}</p>
        <p>Last Name: {this.props.MLast}</p>
        <p> Street: {this.props.Street}</p>
        <p> Street Number: {this.props.Street_num} </p>
        <p> Postal Code: {this.props.Postal_code}</p>
        <p> Birthdate: {this.props.MBirthdate} </p>
        <button className='btn' onClick={() => this.setState({edit: true})}> Edit </button>
      </div>
      :
      <div>
        <EditMyInfo
        memberID={this.props.memberID}
        MFirst={this.props.MFirst}
        MLast={this.props.MLast}
        Street={this.props.Street}
        Street_num={this.props.Street_num}
        Postal_code={this.props.Postal_code}
        MBirthdate={this.props.MBirthdate}
        handleEdit={this.handleEdit}
        socket={this.props.socket}/>
        <button className='btn'
        onClick={() => this.setState({edit: false})}> Undo </button>
      </div>
    )
  }
}

export { MyInfo };
