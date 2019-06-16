import React, {Component} from 'react';
import { connect } from "react-redux";

import {
  getBookDetails
} from "../redux/actions";

import Book from "./Book";
import Spinner from "./Spinner";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seachText: ""
    }
  }
  componentWillMount() {
    this.props.getBookDetails();
  }

  clearSearchText() {
    this.setState({
      seachText: ""
    });
  }
  updateSearchText(ev) {
    this.setState({
      seachText: ev.target.value
    });
  }
  renderSearch() {
    return (
      <div className="search">
        <input
          value={this.state.seachText}
          placeholder="Search book by name"
          onChange={this.updateSearchText.bind(this)}
        />
      {this.state.seachText && <div onClick={this.clearSearchText.bind(this)}>Clear</div>}
      </div>
    );
  }


  render() {
    const books = this.props.books.filter(
      (book) => (book.name.toLowerCase().indexOf(this.state.seachText.toLowerCase()) > -1));
    return (
      <div>
        {this.renderSearch()}
        <div className="book-list-container">

          {this.props.loading
            ? <Spinner />
            : books.map((book, i) => (
            <Book
              key={i}
              {...book}
            />))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
    loading: state.loading
  };
};
const mapDispatchToProps = {
  getBookDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
