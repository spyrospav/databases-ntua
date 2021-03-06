import React from "react";
import { InsertPublisherFields } from "./InsertPublisherFields";
import { EditPublisherFields } from "./EditPublisherFields";

class ShowPublisherArray extends React.Component {
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
    this.setState({status: "", indexEdit: -1})
  }
  render() {
    return (
      <div className="books">
        <h2> Publishers </h2>
        {this.state.status === "insert" ? (
          <div>
            <InsertPublisherFields socket={this.props.socket} handleInsert={this.handleInsert}/>
            <button className="btn" onClick={() => this.setState({ status: ""})}>Undo</button>
          </div>
        ) : (
          <button className="btn-large" onClick={() => this.setState({ status: "insert", indexEdit:-1})}>
            Insert Publisher
          </button>
        )}
        <div className="row5 bold">
            <p className="col5">Publisher Name</p>
            <p className='col5'>Year</p>
            <p className='col5'>Street</p>
            <p className='col5'>Street Number</p>
            <p className='col5'>Postal code</p>

        </div>

        {this.props.publishersArray.map((publisher, index) => {
          if (this.state.indexEdit === index) {
            return (
              <div key={publisher.pubName}>
                <EditPublisherFields
                  socket={this.props.socket}
                  handleEdit={this.handleEdit}
                  pubName={publisher.pubName}
                  estYear={publisher.estYear}
                  Street={publisher.Street}
                  Street_num={publisher.Street_num}
                  Postal_code={publisher.Postal_code}
                />
                <button className='btn-small'
                onClick={() => this.setState({indexEdit: -1})}>
                Undo
                </button>
              </div>
            );
          } else {
            return (

              <div className="row5" key={publisher.pubName}>
                <p className="col5">{publisher.pubName}</p>
                <p className="col5">{publisher.estYear}</p>
                <p className="col5">{publisher.Street}</p>
                <p className="col5">{publisher.Street_num}</p>
                <p className="col5">{publisher.Postal_code}</p>
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
                    this.props.socket.emit("DELETE_PUBLISHER", publisher.pubName)
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

export { ShowPublisherArray };
