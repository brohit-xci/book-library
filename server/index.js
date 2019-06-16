var express = require('express');
var app = express();
const bodyParser = require("body-parser")
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
require('./routes')(app);
app.listen(3001);

console.log('Server running at http://localhost:3001/');
