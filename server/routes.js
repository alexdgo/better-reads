var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

const searchAll = (req, res) => {
  var query = 
  `WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn)
    SELECT Book.title, Rate.avg_rating
    FROM Book LEFT JOIN Rate ON Book.isbn = Rate.isbn
    WHERE Book.title LIKE ${req.params.query} OR Book.author LIKE ${req.params.query}
    ORDER BY Rate.avg_rating DESC;`
  // connection.query(query, (err, rows, fields) => {
  //   if (err) console.log(err)
  //   else {
  //     res.json(rows)
  //   }
  // })
  // trial
  res.json([{
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
    price: 16.82,
    avg_rating: 5
  }, {
    isbn: 123,
    title: "test",
    author: "Alex", 
    language: "eng",
    num_pages: 2,
    publisher: "Del Rey Books",
    year_published: 2000, 
    cover: "http://images.amazon.com/images/P/0345453743.01.LZZZZZZZ.jpg",
    format: "Paperback", 
    genre: "Science-Fiction-Fantasy-Horror",
    price: 42,
    avg_rating: 2.5
  }])
}

const searchBooks = (req, res) => {
  var query = 
  `WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn)
    SELECT Book.title, Rate.avg_rating
    FROM Book LEFT JOIN Rate ON Book.isbn = Rate.isbn
    WHERE Book.title LIKE ${req.params.query}
    ORDER BY Rate.avg_rating DESC;`
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

const searchAuthors = (req, res) => {
  var query = 
  `WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn)
    SELECT Book.title, Book.cover, Book.author, Rate.avg_rating
    FROM Book LEFT JOIN Rate ON Book.isbn = Rate.isbn
    WHERE Book.author LIKE ${req.params.query}
    ORDER BY Rate.avg_rating DESC;`
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err)
    else {
      res.json(rows)
    }
  })
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  searchAll: searchAll,
  searchBooks: searchBooks,
  searchAuthors: searchAuthors
}