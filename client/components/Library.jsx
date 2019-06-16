import React from 'react';
import { connect } from "react-redux";

import BookList from "./BookList";
import AddBookForm from "./AddBookForm";

import {
  setAddMode
} from "../redux/actions";


class Library extends React.Component {
  constructor() {
    super();
    this.state = {
      isFormActive: false
    }
  }
  switchBackToAddMode() {
    this.props.setAddMode().then(() => {
      this.setState({
        isFormActive: false
      });
    })
  }
  toggleFormDisplay() {
    if (this.props.isUpdate) {
      this.switchBackToAddMode();
    } else {
      this.setState({
        isFormActive: !this.state.isFormActive
      });
    }
  }
  renderError() {
    return (
      <div className="error">
        {this.props.error}
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.props.error && this.renderError()}
        <BookList />
        <button className="toggle-form-btn" onClick={this.toggleFormDisplay.bind(this)}>
          {this.state.isFormActive || this.props.isUpdate ? "Close form" : "Add Book"}
        </button>
        {(this.state.isFormActive || this.props.isUpdate)
          && <AddBookForm
            closeForm={this.toggleFormDisplay.bind(this)}
          />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUpdate: state.isUpdate,
    updateBookDetails: state.updateBookDetails,
    error: state.error
  };
};
const mapDispatchToProps = {
  setAddMode
}

export default connect(mapStateToProps, mapDispatchToProps)(Library);
