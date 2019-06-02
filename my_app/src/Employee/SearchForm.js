import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      option: 'title', //title, author, category
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
    event.preventDefault();
  }

  render() {
    return (
    <div className="searchform">
      <form onSubmit={this.handleSubmit}>
        <div className="search-by">
            <h3>Search</h3>
            <div className="radiotext">
                <p> by Title </p>
                <input type="radio" name="searchOption" onClick={() => this.handleClick("title")}/>
            </div>
            <div className="radiotext">
                <p> by Author </p>
                <input type="radio" name="searchOption" onClick={() => this.handleClick("author")}/>
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
    );
  }
}

export { SearchForm };
