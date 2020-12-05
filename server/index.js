const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

var routes = require("./routes.js");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

app.post("/userRegister", routes.addUser);

app.post("/userLogin", routes.getUser);

app.post("/userBooks", routes.getUserBooks);

app.listen(8081, () => {
  console.log(`Server listening on PORT 8081`);
});
