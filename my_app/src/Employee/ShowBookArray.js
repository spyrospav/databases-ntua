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
      <div>
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
            <div key={book.ISBN}>
              <p>{ book.ISBN }</p>
              <p>{ book.title }</p>
              <p>{ book.author }</p>
              <p>{ book.publisher }</p>
              <p>{ book.publicationYear }</p>
              <p>{ book.numOfPages }</p>
              <p>{ book.numOfCopies }</p>
              <button
              onClick={() => this.setState({status:'edit', indexEdit: index})}>
                Edit
              </button>
              <button> Delete </button>
            </div>
          );
          }}
        )}
        </div>
      )}
}


export { ShowBookArray };
