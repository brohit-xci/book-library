export const getAllBooksApi = () => {
  return fetch("http://localhost:3001/books", {
      method: "GET",
      headers: { accept: "application/json" }
    }).then((resp) => (resp.json()));
};

export const addBookApi = (book) => {
  return fetch("http://localhost:3001/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    }).then((resp) => (resp.json()));
};

export const updateBookApi = (bookId, book) => {
  return fetch(`http://localhost:3001/books/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    }).then((resp) => (resp.json()));
};

export const deleteBookApi = (id) => {
  return fetch(`http://localhost:3001/books/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
};
