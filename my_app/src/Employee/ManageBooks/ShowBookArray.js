import React from "react";
import { InsertBookFields } from "./InsertBookFields";
import { EditBookFields } from "./EditBookFields";

class ShowBookArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "", //'insert', 'edit', 'delete'
      indexEdit: -1,
    };
  }
  handleInsert = () => {
      this.setState({status: ''})
  }

  handleEdit = () => {
    this.setState({status: "", indexEdit: -1});
  }

  render() {
    return (
      <div className="books">
        <h2> Books </h2>
        {this.state.status === "insert" ? (
          <div>
            <InsertBookFields handleInsert={this.handleInsert} socket={this.props.socket}/>
            <button className="btn" onClick={() => this.setState({ status: "" })}>Undo</button>
          </div>
        ) : (
          <div>
            <br/>
            <button className="btn-large" onClick={() => this.setState({ status: "insert", indexEdit:-1 })}>
              Insert book
            </button>
          </div>
        )}
        <div className="row8 bold">
            <p className="col8">ISBN</p>
            <p className="col8">Title</p>
            <p className="col8">Author</p>
            <p className="col8">Publisher</p>
            <p className="col8">Published</p>
            <p className="col8">Pages</p>
            <p className="col8">Avail. Copies</p>
            <p className="col8">Total Copies</p>
        </div>

        {this.props.booksArray.map((book, index) => {
          if (this.state.indexEdit === index) {
            return (
              <div key={book.ISBN}>
                <EditBookFields
                  key={book.ISBN}
                  ISBN={book.ISBN}
                  title={book.title}
                  author={book.author}
                  publisher={book.pubName}
                  publicationYear={book.pubYear}
                  numOfPages={book.numPages}
                  numOfCopies={book.remaining}
                  handleEdit={this.handleEdit}
                  socket={this.props.socket}
                />
                <button className='btn-small'
                onClick={() => this.setState({indexEdit: -1})}>
                Undo
                </button>
              </div>
            );
          } else {
            return (
              <div className="row8" key={book.ISBN}>
                <p className="col8">{book.ISBN}</p>
                <p className="col8">{book.title}</p>
                <p className="col8">{book.author}</p>
                <p className="col8">{book.pubName}</p>
                <p className="col8">{book.pubYear}</p>
                <p className="col8">{book.numPages}</p>
                <p className="col8">{book.remaining}</p>
                <p className="col8">{book.total}</p>
                <button
                  className="btn-small"
                  onClick={() =>
                    this.setState({ status: "edit", indexEdit: index })
                  }
                >
                  Edit
                </button>
                <button className="btn-small"
                onClick={() => this.props.socket.emit("DELETE_BOOK", book.ISBN)}>
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

export { ShowBookArray };
