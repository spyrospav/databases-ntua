import React from 'react';
import { InsertFields } from './InsertFields';
import { EditFields } from './EditFields';

class ShowBookArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '', //'insert', 'edit', 'delete'
      indexEdit: -1
    };

  }
  render() {
    return (
      <div className="books">
        <h2> Books </h2>
        {this.state.status === 'insert'
          ?
          <div>
            <InsertFields />
            <button onClick={() => this.setState({status:''})}>
            Undo
            </button>
            <button> Insert </button>
          </div>
          :
        <button onClick={() => this.setState({status:'insert'})}>
          Insert book
        </button>
        }

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
          }
          else {
            return (
            <div className="book" key={book.ISBN}>
              <p className="col6">{ book.ISBN }</p>
              <p className="col6">{ book.title }</p>
              <p className="col6">{ book.author }</p>
              <p className="col6">{ book.publisher }</p>
              <p className="col6">{ book.publicationYear }</p>
              <p className="col6">{ book.numOfPages }</p>
              <p className="col6">{ book.numOfCopies }</p>
              <button className="btn-small"
              onClick={() => this.setState({status:'edit', indexEdit: index})}>
                Edit
              </button>
              <button className="btn-small"> Delete </button>
            </div>
          );
          }}
        )}
        </div>
      )}
}


export { ShowBookArray };
