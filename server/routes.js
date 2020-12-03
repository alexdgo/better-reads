var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

function getBook(req, res) {
  var isbn = req.params.isbn;
  // res.json({
  //   isbn: 9780439358071,
  //   title: "Harry Potter and the Order of the Phoenix",
  //   author: "J.K. Rowling", 
  //   language: "eng",
  //   num_pages: 870,
  //   publisher: "Scholastic Inc.",
  //   year_published: 2004, 
  //   cover: "http://images.amazon.com/images/P/0439358078.01.LZZZZZZZ.jpg"
  // });
  res.json({
    isbn: 9780345453747,
    title: "The Ultimate Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams", 
    language: "eng",
    num_pages: 815,
    publisher: "Del Rey Books",
    year_published: 2002, 
    cover: "http://images.amazon.com/images/P/0345453743.01.LZZZZZZZ.jpg",
    format: "Paperback", 
    genre: "Science-Fiction-Fantasy-Horror",
    price: 16.82
  });
}

function addToReadingList(req, res) {
  var isbn = req.params.isbn;
  var user = req.params.user;
  console.log(`isbn: ${isbn} user: ${user}`);
  res.send('Added!')
}

function getAvgRating(req, res) {
  var isbn = req.params.isbn;
  console.log(`isbn: ${isbn}`)
  res.send({rating: 3.5});
}

// The exported functions, which can be accessed in index.js.
module.exports = {
    getBook: getBook,
    addToReadingList: addToReadingList,
    getAvgRating: getAvgRating,
}