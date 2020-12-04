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


app.get('/search/all/:query', routes.searchAll)
app.get('/search/books/:query', routes.searchBooks)
app.get('/search/authors/:query', routes.searchAuthors)



app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});