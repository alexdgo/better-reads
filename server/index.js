const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

var routes = require('./routes.js');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

app.get('/books/:isbn', routes.getBook);
app.get('/getRating/:isbn', routes.getAvgRating);
app.get('/getUserRating/:isbn&:user', routes.getUserRating);
app.get('/addToList/:isbn/:user', routes.addToReadingList);
app.get('/deleteFromList/:isbn/:user', routes.deleteFromReadingList);
app.get('/getInList/:isbn/:user', routes.getInReadingList);
app.get('/authorRec/:isbn', routes.getAuthorRec);
app.get('/genreRec/:isbn', routes.getGenreRec);
app.post('/addRating', routes.addRating);
app.get('/ageRec/:user', routes.getAgeRec);
app.get('/locationRec/:user', routes.getLocationRec);

app.get('/search/all/:query', routes.searchAll);
app.get('/search/books/:query', routes.searchBooks);
app.get('/search/authors/:query', routes.searchAuthors);

app.get('/genres', routes.getAllGenres);
app.get('/genres/:genre', routes.getTopInGenre);

app.post('/userRegister', routes.addUser);

app.post('/userLogin', routes.getUser);

app.post('/userBooks', routes.getUserBooks);
app.post('/userRated', routes.getUserRated);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
