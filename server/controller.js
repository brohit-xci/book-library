var fs = require('fs');

// internal db replica
var FILE_PATH_TO_BOOKS = "./books.json";

var books =  require(FILE_PATH_TO_BOOKS);

let updateBookToFile = (books) => {
  fs.writeFile("server/" + FILE_PATH_TO_BOOKS, JSON.stringify(books), function(err) {
    if (err) {
        console.log(err);
    }
  });
}

exports.findAll = function(req, res){
  res.status(200).send(books);
};
exports.findById = function(req, res) {
  let book = books.find((book) => (book.id == req.params.id));
  if (book) {
    res.status(200).send(book);
  } else {
    res.status(404).send("No such boook here");
  }
};

exports.add = function(req, res) {
  let book = books.find((book) => (book.name == req.body.name));
  if (book) {
    res.status(400).send("Bad request");
  } else {
    let nextId = books[books.length-1].id + 1;
    let newBook = {
      id: nextId,
      ...req.body
    }
    books.push(newBook);
    updateBookToFile(books);
    res.status(200).send(newBook);
  }
};

exports.update = function(req, res) {
  let updatedBook = books.find((book) => book.id===parseInt(req.params.id));
  if (!updatedBook) {
    res.status(400).send("No such boook here");
  } else {
    updatedBook.name = req.body.name;
    updatedBook.author = req.body.author
    updatedBook.description = req.body.description;
    updatedBook.bookCount = req.body.bookCount;
    updateBookToFile(books);
    res.status(200).send(updatedBook);
  }
};
exports.delete = function(req, res) {
  newBookList = books.filter((book) => book.id != req.params.id);
  if (newBookList.length != books.length) {
    books = newBookList;
    updateBookToFile(books);
    res.status(200).send("OK");
  } else {
    res.status(404).send("No such boook here");
  }
};
