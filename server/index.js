const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

app.get('/books/:isbn', routes.getBook);
app.get('/getRating/:isbn', routes.getAvgRating);
app.get('/addToList/:isbn/:user', routes.addToReadingList);



/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.
app.get('/genres', routes.getAllGenres);
app.get('/genres/:genre', routes.getTopInGenre);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});