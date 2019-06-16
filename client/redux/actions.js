import {
  GET_BOOKS_IN_PROGRESS,
  GET_BOOKS_COMPLETED,
  ADD_BOOK_IN_PROGRESS,
  ADD_BOOK_COMPLETED,
  DELETE_BOOK_IN_PROGRESS,
  DELETE_BOOK_COMPLETED,
  SET_TO_UPDATE_MODE,
  SET_TO_ADD_MODE,
  UPDATE_BOOK_IN_PROGRESS,
  UPDATE_BOOK_COMPLETED,
  ERROR
} from "./constants/actions";

import { getAllBooksApi, addBookApi, deleteBookApi, updateBookApi } from "../api";

export const getBookDetails = () => {
  return (dispatch) => {
    dispatch({
      type: GET_BOOKS_IN_PROGRESS
    });
    return getAllBooksApi().then((books) => {
      dispatch({
        type: GET_BOOKS_COMPLETED,
        payload: books
      });
    }).catch(() => {
      dispatch({
        type: ERROR,
      });
    });
  };
};

export const addBook = (book) => {
  return (dispatch) => {
    dispatch({
      type: ADD_BOOK_IN_PROGRESS
    });
    return addBookApi(book).then((book) => {
      dispatch({
        type: ADD_BOOK_COMPLETED,
        payload: book
      });
    }).catch(() => {
      dispatch({
        type: ERROR,
      });
    });
  };
};

export const deleteBook = (bookId) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_BOOK_IN_PROGRESS
    });
    return deleteBookApi(bookId).then(() => {
      dispatch({
        type: DELETE_BOOK_COMPLETED,
        payload: bookId
      });
    }).catch(() => {
      dispatch({
        type: ERROR,
      });
    });
  };
};

export const updateBook = (bookId, book) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BOOK_IN_PROGRESS
    });
    return updateBookApi(bookId, book).then((resp) => {
      dispatch({
        type: UPDATE_BOOK_COMPLETED,
        payload: resp
      });
    }).catch(() => {
      dispatch({
        type: ERROR,
      });
    });
  };
};

export const setEditMode = (bookId) => {
  return (dispatch) => {
    dispatch({
      type: SET_TO_UPDATE_MODE,
      payload: bookId
    });
  };
};

export const setAddMode = () => {
  return (dispatch) => {
    dispatch({
      type: SET_TO_ADD_MODE
    });
  };
};
