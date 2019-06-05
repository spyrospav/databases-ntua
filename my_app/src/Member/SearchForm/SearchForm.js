import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      option: 'title', //title, category
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      value: event.target.value
    })
  };

  handleClick(option) {
    this.setState({
      option: option
    })
  }
  handleSubmit(event) {
    if (this.state.option === 'title') {
      this.props.socket.emit("SEARCH_BOOKS", this.state.value)
    }
    else if (this.state.option === "category") {
      this.props.socket.emit("SEARCH_CATEGORY", this.state.value)
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="searchform">
            <form onSubmit={this.handleSubmit}>
              <div className="search-by">
                  <h3>Search</h3>
                  <div className="radiotext">
                      <p> by Title </p>
                      <input type="radio" name="searchOption" onClick={() => this.handleClick("title")}/>
                  </div>
                  <div className="radiotext">
                      <p> by Category </p>
                      <input type="radio" name="searchOption" onClick={() => this.handleClick("category")}/> <br/>
                  </div>
              </div>

                  <input type="text" value={this.state.value} onChange={this.handleChange} />
                  <input type="submit" value="Search" />
            </form>
          </div>
          {this.props.foundBooks.length !== 0
            ?
            <div className="books">
              <div className="row6 bold">
                  <p className="col7">ISBN</p>
                  <p className="col7">Title</p>
                  <p className="col7">Author</p>
                  <p className="col7">Publisher</p>
                  <p className="col7">Published</p>
                  <p className="col7">Pages</p>
                  <p className="col7">Avail. Copies</p>
              </div>
              {this.props.foundBooks.map(book => (
                  <div className="row7" key={book.ISBN}>
                    <p className="col7">{book.ISBN}</p>
                    <p className="col7">{book.title}</p>
                    <p className="col7">{book.author}</p>
                    <p className="col7">{book.pubName}</p>
                    <p className="col7">{book.pubYear}</p>
                    <p className="col7">{book.numPages}</p>
                    <p className="col7">{book.remaining}</p>
                    {book.remaining > 0
                      ?
                      <button
                      className='btn'
                      onClick={ () => {
                        this.props.socket.emit("BORROW_BOOK", {memberID: this.props.memberID, ISBN: book.ISBN})
                      }} > Borrow </button>
                      :
                      <p></p>
                    }
                    </div>
              ))}
            </div>
            :
            <div> </div>
            }

        </div>
    );
  }
}

export { SearchForm };
