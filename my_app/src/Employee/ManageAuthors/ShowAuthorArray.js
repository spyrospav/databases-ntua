import React from "react";
import { InsertAuthorFields } from "./InsertAuthorFields";
import { EditAuthorFields } from "./EditAuthorFields";

class ShowAuthorArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "", //'insert', 'edit', 'delete'
      indexEdit: -1,
    };
  }
  handleInsert = () => {
    this.setState({status: ""});
  }

  handleEdit = () => {
    this.setState({status: "", indexEdit: -1});
  }

  render() {
    return (
      <div className="books">
        <h2> Authors </h2> <br/>
        {this.state.status === "insert" ? (
          <div>
            <InsertAuthorFields handleInsert={this.handleInsert} socket={this.props.socket}/>
            <button className="btn" onClick={() => this.setState({ status: "" })}>Undo</button>
          </div>
        ) : (
          <div>
            <button className="btn-large" onClick={() => this.setState({ status: "insert", indexEdit:-1 })}>
              Insert author
            </button>
            <br/>
          </div>
        )}
        <div className="row3 bold">
            <p className="col3">First Name</p>
            <p className='col3'>Last Name</p>
            <p className='col3'>Date of Birth</p>
        </div>

        {this.props.authorsArray.map((author, index) => {
          if (this.state.indexEdit === index) {
            return (
              <div key={author.authID}>
                <EditAuthorFields
                  socket={this.props.socket}
                  handleEdit={this.handleEdit}
                  authID={author.authID}
                  AFirst={author.AFirst}
                  ALast={author.ALast}
                  ABirthdate={author.ABirthdate}
                />

                <button className='btn-small'
                onClick={() => this.setState({indexEdit: -1})}>
                Undo
                </button>
              </div>
            );
          } else {
            return (

              <div className="row3" key={author.authID}>
                <p className="col3">{author.AFirst}</p>
                <p className="col3">{author.ALast}</p>
                <p className="col3">{author.ABirthdate}</p>
                <button
                  className="btn-small"
                  onClick={() =>
                    this.setState({ status: "edit", indexEdit: index })
                  }
                >
                  Edit
                </button>
                <button className="btn-small"
                onClick={() => {
                  this.props.socket.emit("DELETE_AUTHOR", author.authID)
                  this.setState({status: ""})
                }}>
                Delete
                </button>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export { ShowAuthorArray };
