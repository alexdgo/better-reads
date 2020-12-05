var config = require("./db-config.js");
var mysql = require("mysql");

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

let users = new Map();
let books = new Map();

// Create new user
function addUser(req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (users.has(username)) {
    res.json({
      status: "false",
    });
  } else {
    users.set(username, { email: email, password: password });
    res.json({
      status: "true",
      username: username,
      email: email,
      password: password,
    });
  }
}

// Get user
function getUser(req, res) {
  const username = req.body.username;
  if (users.has(username)) {
    const info = users.get(username);
    res.json({
      status: "true",
      username: username,
      email: info.email,
      password: info.password,
    });
  } else {
    res.json({
      status: "false",
    });
  }
}

// Log user
function getUser(req, res) {
  const username = req.body.username;
  if (users.has(username)) {
    const info = users.get(username);
    if (info.password === req.body.password) {
      res.json({
        status: "true",
        username: username,
        email: info.email,
        password: info.password,
      });
    } else {
      res.json({
        status: "false",
      });
    }
  } else {
    res.json({
      status: "false",
    });
  }
}

// Get user's book
function getUserBooks(req, res) {
  const username = req.body.username;
  books.set({ username: username, books: Math.random() }, 0);
  var allBooks = [];
  for (const [key, value] of books.entries()) {
    if (key.username === username) {
      allBooks.push(key.books);
    }
  }
  console.log(allBooks);
  const info = users.get(username);
  res.json({
    status: "true",
    username: username,
    books: allBooks,
  });
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  addUser: addUser,
  getUser: getUser,
  getUserBooks: getUserBooks,
  // getAllGenres: getAllGenres,
  // getTopInGenre: getTopInGenre,
  // getRecs: getRecs,
  // getDecades: getDecades,
  // bestGenresPerDecade: bestGenresPerDecade
};
