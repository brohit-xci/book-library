import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  deleteBook,
  setEditMode
} from "../redux/actions";

class Book extends Component {
  onDelete() {
    this.props.deleteBook(this.props.id);
  }
  onUpdateClick() {
    this.props.setEditMode(this.props.id);
    window.scrollTo(0,document.body.scrollHeight)
  }
  render() {
    const isUpdateActive = this.props.isUpdate;
    const isUpdateActiveOnItself =  this.props.updateBookDetails.id === this.props.id;

    const blurClassName = !isUpdateActive || (isUpdateActive && isUpdateActiveOnItself) ? "blur" : "";

    return (
      <div className="book-tile" data-active-update={isUpdateActive}>
        <div className={`book-name ${blurClassName}`}>
          {this.props.name}
        </div>
        <div className={`book-author ${blurClassName}`}>
          <span>by {this.props.author}</span>
        </div>
        <div className={`book-description ${blurClassName}`}>
          {this.props.description}
        </div>
        <div className={`book-count ${blurClassName}`}>
          {this.props.bookCount || 0} books available
        </div>

        <div className="book-delete" onClick={this.onDelete.bind(this)}>
          X
        </div>
        <div className="book-update" data-active-update-book={isUpdateActiveOnItself} onClick={this.onUpdateClick.bind(this)}>
          UPDATE
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  thumbnail: PropTypes.string,
  genre: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    isUpdate: state.isUpdate,
    updateBookDetails: state.updateBookDetails
  };
};
const mapDispatchToProps = {
  deleteBook,
  setEditMode
}
export default connect(mapStateToProps, mapDispatchToProps)(Book);
