import React from 'react';

class ShowBookArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '', //'insert', 'edit', 'delete'
    };

  }
  render() {
    return (
      <div>
        <h2> Books </h2>
        <button> Insert book </button>
        {this.props.booksArray.map(book => (
          <div>
            <p>{ book.ISBN }</p>
            <p>{ book.title }</p>
            <p>{ book.author }</p>
            <p>{ book.publisher }</p>
            <p>{ book.publicationYear }</p>
            <p>{ book.numOfPages }</p>
            <p>{ book.numOfCopies }</p>
            <button> Edit </button>
            <button> Delete </button>
          </div>
        ))}
      </div>
    );
  }
}

export { ShowBookArray };
