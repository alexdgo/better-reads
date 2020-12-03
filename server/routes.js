var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

function getBook(req, res) {
  var isbn = req.params.isbn;
  res.json({
    isbn: 9780439358071,
    title: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowling", 
    language: "eng",
    num_pages: 870,
    publisher: "Scholastic Inc.",
    year_published: 2004, 
    cover: "http://images.amazon.com/images/P/0439358078.01.LZZZZZZZ.jpg"
  });
}

// The exported functions, which can be accessed in index.js.
module.exports = {
		getBook: getBook,
}