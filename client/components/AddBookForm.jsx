import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import {
  addBook,
  updateBook
} from "../redux/actions";

import Spinner from "./Spinner";

class AddBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      author: null,
      description: null,
      bookCount: null,
      error: null
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { name , author, description, bookCount, id } = props.updateBookDetails || {};
    return {
      name: state.name === null ? name : state.name,
      author: state.author === null ? author : state.author,
      description: state.description === null ? description : state.description,
      bookCount: state.bookCount === null ? bookCount : state.bookCount,
      error: state.error
    };
  }
  updateName(ev) {
    this.setState({
      name: ev.target.value
    });
  }
  updateAuthor(ev) {
    this.setState({
      author: ev.target.value
    });
  }
  updateDescription(ev) {
    this.setState({
      description: ev.target.value
    });
  }

  updateCount(ev) {
    this.setState({
      bookCount: ev.target.value
    });
  }
  validate() {
    this.setState({
      error: null
    });
    let { name, author, description, bookCount } = this.state;
    if ((name && name.length > 0)
      && (author && author.length > 0)
      && (description && description.length > 0)
      && (bookCount && bookCount > 0 )) {
      return true;
    }
    this.setState({
      ...this.state,
      error: "Please enter valid details"
    });
    return false;

  }
  onSubmit() {
    if (this.validate()) {
      if (this.props.isUpdate) {
        this.props.updateBook(this.props.updateBookId, this.state).then(() => {
          this.props.closeForm();
        })
      } else {
        this.props.addBook(this.state).then(() => {
          this.props.closeForm();
        });
      }
    }
  }

  render() {
    return (
      <div className="add-form-container">
        <div className="add-form">
          {this.state.error && <div className="error">{this.state.error}</div>}
          {this.props.loading && <Spinner />}
          <input
            placeholder="Enter name of the book"
            onChange={this.updateName.bind(this)}
            value={this.state.name}
          />
          <input
            placeholder="author"
            onChange={this.updateAuthor.bind(this)}
            value={this.state.author}
          />
          <textarea
            placeholder="description"
            onChange={this.updateDescription.bind(this)}
            value={this.state.description}
          />
          <input
            placeholder="No of copies"
            onChange={this.updateCount.bind(this)}
            value={this.state.bookCount}
            type="number"
            min={1}
          />
          <button onClick={this.onSubmit.bind(this)}>
            {this.props.isUpdate ? "Update Book" : "Add Book"}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    isUpdate: state.isUpdate,
    updateBookDetails: state.updateBookDetails,
    updateBookId: state.updateBookDetails.id
  };
};
const mapDispatchToProps = {
  addBook,
  updateBook
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookForm);
