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
    price: 16.82,
  })
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

function getAllGenres(req, res) {
  res.json([
    {genre: "comedy"},{genre: "fiction"},{genre: "horror"},{genre: "mystery"},
    {genre: "biography"},{genre: "thriller"},{genre: "historical"},{genre: "nonfiction"},
    {genre: "short story"},{genre: "novel"}
  ]);
}

function getTopInGenre(req, res) {
  res.json([
    {
      isbn: 9780345453747,
      title: "Thinking, Fast and Slow",
      author: "Douglas Adams", 
      language: "eng",
      num_pages: 815,
      publisher: "Del Rey Books",
      year_published: 2002, 
      cover: "https://images-na.ssl-images-amazon.com/images/I/41wI53OEpCL._SX332_BO1,204,203,200_.jpg",
      format: "Paperback", 
      genre: "Science-Fiction-Fantasy-Horror",
      price: 16.82
    },
    {
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
  }
  ]);
}
// The exported functions, which can be accessed in index.js.
module.exports = {
  searchAll: searchAll,
  searchBooks: searchBooks,
  searchAuthors: searchAuthors,
  getBook: getBook,
  addToReadingList: addToReadingList,
  getAvgRating: getAvgRating,
  getAllGenres: getAllGenres,
  getTopInGenre: getTopInGenre
}