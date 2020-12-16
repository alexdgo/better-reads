const oracledb = require('oracledb');
const generateConnectionProps = require('./oracleinit');

oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

async function runQuery(query, callback, errorHandler) {
	//   if (_debugMode) console.log(`oracledb running query: ${query}`);
	let connection;
	let result;
	const connectionProps = generateConnectionProps();

	try {
		connection = await oracledb.getConnection(connectionProps);
		result = await connection.execute(query);
		callback(result);
	} catch (err) {
		errorHandler(err);
	} finally {
		if (connection) {
			await connection.close();
		}
	}
}

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */
const searchAll = (req, res) => {
	var query = `WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn)
    SELECT Book.*, Rate.avg_rating
    FROM Book LEFT JOIN Rate ON Book.isbn = Rate.isbn
    WHERE Book.title LIKE '%${req.params.query}%' OR Book.author LIKE '%${req.params.query}%'
    ORDER BY Rate.avg_rating DESC`;

	runQuery(
		query,
		(result) => {
			if (result.rows) {
				console.log(result.rows);
				res.json(result.rows);
			}
		},
		(error) => {
			console.error(error);
		}
	);
};

const searchBooks = (req, res) => {
	var query = `WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn)
    SELECT Book.*, Rate.avg_rating
    FROM Book LEFT JOIN Rate ON Book.isbn = Rate.isbn
    WHERE Book.title LIKE '%${req.params.query}%'
    ORDER BY Rate.avg_rating DESC`;

	runQuery(
		query,
		(result) => {
			if (result.rows) {
				console.log(result.rows);
				res.json(result.rows);
			}
		},
		(error) => {
			console.error(error);
		}
	);
};

const searchAuthors = (req, res) => {
	var query = `WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn)
    SELECT Book.*, Rate.avg_rating
    FROM Book LEFT JOIN Rate ON Book.isbn = Rate.isbn
    WHERE Book.author LIKE '%${req.params.query}%'
    ORDER BY Rate.avg_rating DESC`;

	runQuery(
		query,
		(result) => {
			if (result.rows) {
				console.log(result.rows);
				res.json(result.rows);
			}
		},
		(error) => {
			console.error(error);
		}
	);
};

function getBook(req, res) {
	const isbn = req.params.isbn;
	const query = `
    SELECT *
    FROM Book
    WHERE isbn = ${isbn}
  `;
	runQuery(
		query,
		(result) => {
			if (result.rows.length == 0) {
				res.json({});
			} else {
				res.json(result.rows[0]);
			}
		},
		(error) => {
			console.error(error);
		}
	);
}

function getAuthorRec(req, res) {
	const isbn = req.params.isbn;
	const query = `
    WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn)
    SELECT Book.*, Rate.avg_rating 
    FROM Book LEFT JOIN Rate ON Book.isbn = Rate.isbn
    WHERE Book.author IN 
    (SELECT author FROM Book WHERE isbn = ${isbn})
    AND Book.title <> (SELECT title FROM Book WHERE isbn = ${isbn})
    ORDER BY Rate.avg_rating DESC
  `;

	runQuery(
		query,
		(result) => {
			res.json(result.rows);
		},
		(error) => {
			console.error(error);
		}
	);
}

function getGenreRec(req, res) {
	const isbn = req.params.isbn;
	const query = `
    WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn)
    SELECT Book.*, Rate.avg_rating 
    FROM Book LEFT JOIN Rate ON Book.isbn = Rate.isbn
    WHERE genre IN (SELECT genre FROM Book WHERE isbn = ${isbn})
    AND Book.title <> (SELECT title FROM Book WHERE isbn = ${isbn})
    ORDER BY Rate.avg_rating DESC
  `;

	runQuery(
		query,
		(result) => {
			if (result.rows) {
				console.log(result.rows);
				res.json(result.rows);
			}
		},
		(error) => {
			console.error(error);
		}
	);
}

function addToReadingList(req, res) {
	var isbn = req.params.isbn;
	var user = req.params.user;
	var query = `
    INSERT INTO ReadingList(user_id, isbn)
    VALUES (${user}, ${isbn})
  `;

	runQuery(
		query,
		(result) => {
			console.log(result);
		},
		(error) => {
			console.error(error);
		}
	);
}

function deleteFromReadingList(req, res) {
	var isbn = req.params.isbn;
	var user = req.params.user;
	var query = `
    DELETE
    FROM ReadingList
    WHERE user_id = ${user} AND isbn = ${isbn}
  `;

	runQuery(
		query,
		(result) => {
			console.log(result);
		},
		(error) => {
			console.error(error);
		}
	);
}

function getInReadingList(req, res) {
	var isbn = req.params.isbn;
	var user = req.params.user;
	var query = `
    SELECT *
    FROM ReadingList
    WHERE user_id = ${user} AND isbn = ${isbn}
  `;

	runQuery(
		query,
		(result) => {
			console.log(result.rows);
			res.json(result.rows);
		},
		(error) => {
			console.error(error);
		}
	);
}

function addRating(req, res) {
	const isbn = req.body.isbn;
	const user = req.body.user;
	const rating = req.body.rating * 2;

	let query = `
    INSERT INTO Ratings(isbn, user_id, rating)
    VALUES (${isbn}, ${user}, ${rating})
  `;

	runQuery(
		query,
		(result) => {
			console.log('ADDED RATING');
			console.log(result);
		},
		(error) => {
			let query2 = `
        UPDATE Ratings
        SET rating = ${rating}
        WHERE isbn = ${isbn} AND user_id = ${user}
      `;
			console.log('error from ratings insert:', error);
			runQuery(
				query2,
				(result) => {
					console.log('succes:');
					console.log(result);
				},
				(error) => {
					console.log('error:');
					console.log(error);
				}
			);
		}
	);
}

function getAvgRating(req, res) {
	const isbn = req.params.isbn;
	const query = `
    SELECT isbn, AVG(rating) AS rating
    FROM Ratings
    GROUP BY isbn
    HAVING isbn = ${isbn}
  `;

	runQuery(
		query,
		(result) => {
			if (result.rows.length > 0) {
				res.json(result.rows[0]);
			}
		},
		(error) => {
			console.error(error);
		}
	);
}

function getUserRating(req, res) {
	const isbn = req.params.isbn;
	const user = req.params.user;
	console.log('USER ', user);
	console.log('ISBN ', isbn);

	const query = `
    SELECT rating
    FROM Ratings
    WHERE isbn = ${isbn} AND user_id = ${user}
  `;

	runQuery(
		query,
		(result) => {
			if (result.rows.length > 0) {
				console.log(result.rows);
				res.json(result.rows[0]);
			} else {
				res.json({});
			}
		},
		(error) => {
			console.error(error);
		}
	);
}
function getAllGenres(req, res) {
	const query = `
    WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn)
    SELECT DISTINCT BOOK.genre 
    FROM Book LEFT JOIN Rate ON Book.isbn = Rate.isbn
  `;

	runQuery(query, (result) => {
		console.log(result.rows);
		res.json(result.rows);
	});
}
// Create new user
async function addUser(req, res) {
	const name = req.body.name;
	const username = req.body.username;
	const password = req.body.password;
	const location = req.body.location;
	const age = req.body.age;
	const user_id = new Date().getTime();
	if (user_id >= 1 && user_id <= 62000) {
		res.json({ status: 'false' });
	} else {
		const query = `INSERT INTO Reader (user_id, location, age, username, password) VALUES ('${user_id}', '${location}', ${age}, '${username}', '${password}')`;
		runQuery(
			query,
			(result) => {
				//console.log(result);
				res.json({
					status: 'true',
					user_id: user_id,
					name: name,
					username: username,
					password: password,
					location: location,
					age: age,
				});
			},
			(error) => {
				console.error(error);
				res.json({ status: 'false' });
			}
		);
	}
}

// Log user
async function getUser(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const query = `SELECT * FROM Reader WHERE username = '${username}'`;
	runQuery(
		query,
		(result) => {
			//console.log(result.rows);
			if (result.rows[0].PASSWORD === password) {
				res.json({
					status: 'true',
					user_id: result.rows[0].USER_ID,
					username: result.rows[0].LOCATION,
					password: result.rows[0].USERNAME,
					location: result.rows[0].PASSWORD,
					age: result.rows[0].AGE,
				});
			} else {
				res.json({ status: 'false' });
			}
		},
		(error) => {
			console.error(error);
			res.json({ status: 'false' });
		}
	);
}

// Get user's book
function getUserBooks(req, res) {
	const userid = req.body.userid;
	const query = `SELECT Book.*
  FROM Book LEFT JOIN ReadingList ON Book.isbn = ReadingList.isbn
  WHERE user_id = ${userid}`;
	runQuery(query, (result) => {
		res.json(result.rows);
	});
}

function getUserRated(req, res) {
	const userid = req.body.userid;
	const query = `SELECT Book.*, Ratings.rating
  FROM Book LEFT JOIN Ratings ON Book.isbn = Ratings.isbn
  WHERE user_id = ${userid}`;
	runQuery(query, (result) => {
		console.log(result.row);
		res.json(result.rows);
	});
}

function getTopInGenre(req, res) {
	const genre = req.params.genre;
	console.log(genre);
	const query = `
  WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn),
  b AS (SELECT Book.*, Rate.avg_rating  
      FROM Book LEFT JOIN Rate ON Book.isbn = Rate.isbn
      WHERE Book.genre = '${genre}'
      ORDER BY Rate.avg_rating DESC
     )
      SELECT *
      FROM b
      WHERE rownum <= 10
  `;

	runQuery(query, (result) => {
		if (result.rows) {
			console.log(result.rows);
			res.json(result.rows);
		}
	});
}

function getLocationRec(req, res) {
	const user = req.params.user;

	const query = `
      WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn),
      Res AS (
        SELECT DISTINCT Book.*, Rate.avg_rating FROM 
        Reader JOIN Ratings ON Reader.user_id = Ratings.user_id
        JOIN Book ON Ratings.isbn = Book.isbn
        JOIN Rate ON Rate.isbn = Book.isbn
        WHERE Reader.location LIKE (SELECT location FROM Reader WHERE user_id = ${user})
        ORDER BY Rate.avg_rating DESC
      )
      SELECT *
      FROM Res
      WHERE rownum <= 20
    `;

	runQuery(
		query,
		(result) => {
			if (result.rows) {
				console.log(result.rows);
				res.json(result.rows);
			}
		},
		(error) => {
			console.error(error);
		}
	);
}

function getAgeRec(req, res) {
	const user = req.params.user;

	// const query = `
	//   WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn)
	//   SELECT Book.*, Rate.avg_rating FROM
	//   Reader JOIN Ratings ON Reader.user_id = Ratings.user_id
	//   JOIN Book ON Ratings.isbn = Book.isbn
	//   JOIN Rate ON Rate.isbn = Book.isbn
	//   WHERE Reader.age >= 0.8 * (SELECT age FROM Reader WHERE Reader.user_id = ${user})
	//   AND Reader.age <= 1.2 * (SELECT age FROM Reader WHERE Reader.user_id = ${user})
	// `;
	const query = `
    WITH Rate AS (SELECT isbn, AVG(rating) AS avg_rating FROM Ratings GROUP BY isbn),
    a AS (SELECT age FROM Reader WHERE Reader.user_id = ${user}),
    Res AS (
      SELECT DISTINCT b.*, Rate.avg_rating 
      FROM (SELECT Reader.age, Reader.user_id FROM Reader) r JOIN (
          Ratings JOIN (
              (SELECT * from Book) b JOIN 
                  Rate ON Rate.isbn = b.isbn) ON b.isbn = Ratings.isbn)  
                  ON Ratings.user_id= r.user_id  
      WHERE r.age >= 0.8 * (SELECT MAX(age) from a) 
      AND r.age <= 1.2 * (SELECT MAX(age) from a)
      AND Ratings.rating > 7
      ORDER BY Rate.avg_rating DESC
    )
    SELECT *
    FROM Res
    WHERE rownum <= 20
  `;

	runQuery(
		query,
		(result) => {
			if (result.rows) {
				console.log(result.rows);
				res.json(result.rows);
			}
		},
		(error) => {
			console.error(error);
		}
	);
}
// The exported functions, which can be accessed in index.js.
module.exports = {
	addUser: addUser,
	getUser: getUser,
	getUserBooks: getUserBooks,
	getUserRated: getUserRated,
	searchAll: searchAll,
	searchBooks: searchBooks,
	searchAuthors: searchAuthors,
	getBook: getBook,
	addToReadingList: addToReadingList,
	getInReadingList: getInReadingList,
	deleteFromReadingList: deleteFromReadingList,
	addRating: addRating,
	getAuthorRec: getAuthorRec,
	getGenreRec: getGenreRec,
	getAvgRating: getAvgRating,
	getUserRating: getUserRating,
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getLocationRec: getLocationRec,
	getAgeRec: getAgeRec,
};
