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
          <div className="row8 bold">
              <p className="col8">ISBN</p>
              <p className="col8">Title</p>
              <p className="col8">Author</p>
              <p className="col8">Publisher</p>
              <p className="col8">Published</p>
              <p className="col8">Pages</p>
              <p className="col8">Avail. Copies</p>
              <p className='col8'>Total Copies </p>
          </div>
          {this.props.foundBooks.map(book => (
            <div className="row8" key={book.ISBN}>
              <p className="col8">{book.ISBN}</p>
              <p className="col8">{book.title}</p>
              <p className="col8">{book.author}</p>
              <p className="col8">{book.pubName}</p>
              <p className="col8">{book.pubYear}</p>
              <p className="col8">{book.numPages}</p>
              <p className="col8">{book.remaining}</p>
              <p className="col8">{book.total} </p>
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
