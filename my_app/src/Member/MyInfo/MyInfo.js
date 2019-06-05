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
        <div className="row2">
            <h5 className="col2">First Name:</h5>
            <p className="col2">{this.props.MFirst}</p>
        </div>
        <div className="row2">
            <h5 className="col2">Last Name:</h5>
            <p className="col2">{this.props.MLast}</p>
        </div>
        <div className="row2">
            <h5 className="col2"> Street:</h5>
            <p className="col2"> {this.props.Street}</p>
        </div>
        <div className="row2">
            <h5 className="col2"> Street Number:</h5>
            <p className="col2">{this.props.Street_num} </p>
        </div>
        <div className="row2">
          <h5 className="col2"> Postal Code: </h5>
          <p className='col2'>{this.props.Postal_code}</p>
        </div>
        <div className="row2">
          <h5 className="col2"> Birthdate: </h5>
          <p className="col2">{this.props.MBirthdate} </p>
        </div>
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
