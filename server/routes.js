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
    getBook: getBook,
    addToReadingList: addToReadingList,
    getAvgRating: getAvgRating,
    getAllGenres: getAllGenres,
    getTopInGenre: getTopInGenre
}