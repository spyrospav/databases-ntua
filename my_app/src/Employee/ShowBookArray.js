import React from 'react';
import { InsertFields } from './InsertFields';

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

        {this.props.booksArray.map((book, index) => (
          <div key={book.ISBN}>
            <p>{ book.ISBN }</p>
            <p>{ book.title }</p>
            <p>{ book.author }</p>
            <p>{ book.publisher }</p>
            <p>{ book.publicationYear }</p>
            <p>{ book.numOfPages }</p>
            <p>{ book.numOfCopies }</p>
            <button
            onClick={() => this.setState({status:'edit', editIndex: index})}>
              Edit
            </button>
            <button> Delete </button>
          </div>
        ))}
      </div>
    );
  }
}

export { ShowBookArray };
