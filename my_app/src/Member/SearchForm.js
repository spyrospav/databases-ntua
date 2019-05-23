import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      option: '', //title, author, category
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleClick(option) {
    this.setState({
      option: option
    })
  }
  handleSubmit(event) {
    //socket.emit(...)
    console.log(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p> Title </p>
        <input type="radio" name="searchOption" onClick={() => this.handleClick("title")}/>
        <p> Author </p>
        <input type="radio" name="searchOption" onClick={() => this.handleClick("author")}/>
        <p> Category </p>
        <input type="radio" name="searchOption" onClick={() => this.handleClick("category")}/> <br/>
        Search:
        <input type="text" value={this.state.value} onChange={this.handleChange} />

        <input type="submit" value="Search" />
      </form>
    );
  }
}

export { SearchForm };
