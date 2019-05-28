import React from "react";
import { InsertFields } from "./InsertFields";
import { EditFields } from "./EditFields";

class ShowBookArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "", //'insert', 'edit', 'delete'
      indexEdit: -1
    };
  }
  render() {
    return (
      <div className="books">
        <h2> Books </h2>
        {this.state.status === "insert" ? (
          <div>
            <InsertFields />
            <button className="btn" onClick={() => this.setState({ status: "" })}>Undo</button>
            <button className="btn"> Insert </button>
          </div>
        ) : (
          <button className="btn" onClick={() => this.setState({ status: "insert" })}>
            Insert book
          </button>
        )}
        <div className="row6 bold">
            <p className="col7">ISBN</p>
            <p className="col7">Title</p>
            <p className="col7">Author</p>
            <p className="col7">Publisher</p>
            <p className="col7">Published</p>
            <p className="col7">Pages</p>
            <p className="col7">Avail. Copies</p>
        </div>

        {this.props.booksArray.map((book, index) => {
          if (this.state.indexEdit === index) {
            return (
              <div key={book.ISBN}>
                <EditFields
                  key={book.ISBN}
                  ISBN={book.ISBN}
                  title={book.title}
                  author={book.author}
                  publisher={book.publisher}
                  publicationYear={book.publicationYear}
                  numOfPages={book.numOfPages}
                  numOfCopies={book.numOfCopies}
                />
                <button> Update </button>
              </div>
            );
          } else {
            return (
              <div className="row7" key={book.ISBN}>
                <p className="col7">{book.ISBN}</p>
                <p className="col7">{book.title}</p>
                <p className="col7">{book.author}</p>
                <p className="col7">{book.publisher}</p>
                <p className="col7">{book.publicationYear}</p>
                <p className="col7">{book.numOfPages}</p>
                <p className="col7">{book.numOfCopies}</p>
                <button
                  className="btn-small"
                  onClick={() =>
                    this.setState({ status: "edit", indexEdit: index })
                  }
                >
                  Edit
                </button>
                <button className="btn-small">Delete</button>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export { ShowBookArray };
