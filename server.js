"use strict";
require("dotenv").config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require("morgan");
const knexLogger  = require("knex-logger");
const cookieSession = require("cookie-session");
//initializing cookieSession
app.use(cookieSession({
  name : "session",
  keys : [process.env.COOKIE_TOKEN],
  maxAge: 24 * 60 * 60 * 1000
}));

// Separate routes file
//import functions
const dataHelpers = require("./lib/dataHelpers.js")(knex);
//import routes with functions
const usersRoutes = require("./routes/users.js")(dataHelpers);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: "expanded"
}));
app.use(express.static("public"));

//send requests to router
app.use('/', usersRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});