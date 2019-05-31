import React from "react";
import { InsertAuthorFields } from "./InsertAuthorFields";
import { EditAuthorFields } from "./EditAuthorFields";

class ShowAuthorArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "", //'insert', 'edit', 'delete'
      indexEdit: -1,
      indexDelete: -1
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
        <h2> Authors </h2>
        {this.state.status === "insert" ? (
          <div>
            <InsertAuthorFields handleInsert={this.handleInsert} socket={this.props.socket}/>
            <button className="btn" onClick={() => this.setState({ status: "" })}>Undo</button>
          </div>
        ) : (
          <button className="btn" onClick={() => this.setState({ status: "insert" })}>
            Insert author
          </button>
        )}
        <div className="row6 bold">
            <p className="col7">First Name</p>
            <p className='col7'>Last Name</p>
            <p className='col7'>Date of Birth</p>
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

              <div className="row7" key={author.authID}>
                <p className="col7">{author.AFirst}</p>
                <p className="col7">{author.ALast}</p>
                <p className="col7">{author.ABirthdate}</p>
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
