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


const INITIAL_STATE = {
  books: [],
  loading: false,
  isUpdate: false,
  updateBookDetails: {},
  error: null
}


export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BOOKS_IN_PROGRESS:
      return {
        ...state,
        error: null,
        loading: true
      };
    case GET_BOOKS_COMPLETED:
      return {
        ...state,
        error: null,
        loading: false,
        books: action.payload
      };
    case ADD_BOOK_IN_PROGRESS:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ADD_BOOK_COMPLETED:
      let newBookListOnAdd = Array.prototype.slice.call(state.books);
      newBookListOnAdd.push(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
        books: newBookListOnAdd
      };
    case SET_TO_UPDATE_MODE:
      return {
        ...state,
        error: null,
        isUpdate: true,
        updateBookDetails: state.books.find((book) => book.id === action.payload) || {}
      };
    case SET_TO_ADD_MODE:
      return {
        ...state,
        error: null,
        isUpdate: false,
        updateBookDetails: {}
      };
    case UPDATE_BOOK_IN_PROGRESS:
      return {
        ...state,
        error: null,
        loading: true
      };
    case UPDATE_BOOK_COMPLETED:
      let updatedBookList = Array.prototype.slice.call(state.books);
      let updatedBook = updatedBookList.find((book) => (book.id == action.payload.id));
      updatedBook.name = action.payload.name;
      updatedBook.author = action.payload.author
      updatedBook.description = action.payload.description;
      updatedBook.bookCount = action.payload.bookCount;
      return {
        ...state,
        loading: false,
        error: null,
        books: updatedBookList
      };
    case DELETE_BOOK_IN_PROGRESS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_BOOK_COMPLETED:
      let newBookListOnDelete = Array.prototype.slice.call(state.books);
      newBookListOnDelete = newBookListOnDelete.filter((book) => (book.id !== action.payload));
      return {
        ...state,
        loading: false,
        error: null,
        books: newBookListOnDelete
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: "Something went wrong please try again."
      }
    default:
      return state;
  }
}
