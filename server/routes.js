module.exports = function(app){
    var booksController = require('./controller');
    app.get('/books', booksController.findAll);
    app.get('/books/:id', booksController.findById);
    app.post('/books', booksController.add);
    app.put('/books/:id', booksController.update);
    app.delete('/books/:id', booksController.delete);
}
