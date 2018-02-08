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

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

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

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

app.get('/testForm', (req, res) => {
  res.sendFile("public/testForm.html", {root: __dirname});
});

const registerUser = function(req, res){
  let email = req.body.email;
  let password = req.body.password;
  let operation = knex('users').insert({"email": email, "password": password});
  operation.asCallback((error, rows) => {
    res.redirect('/testForm');
  });
};

const postNote = function(req, res){
  let text = req.body.text;
  let category = req.body.category;
  let user_id = req.body.userId;
  let date = new Date();
  let isoDate = date.toISOString();
  console.log("isoDate: ", isoDate);
  let created_at = isoDate;
  let operation = knex('notes').insert({"user_id": user_id, "category": category, "text": text, "created_at": isoDate});
  operation.asCallback((error, rows) => {
    res.redirect('/testForm');
  });
};

const readNote = function(req, res){
  let user_id = req.params.user_id;
  let category = req.params.category;
  let operation = knex('notes').select('text').from('notes').where('user_id', user_id).andWhere('category', category);
  operation.asCallback((error, rows) => {
    console.log('notes read: ', rows);
    res.send(rows);
  });
};

//logs user to table 'users'
app.post('/register', (req, res) => {
  registerUser(req, res);
});

//logs note into table 'notes'
app.post('/note', (req, res) => {
  postNote(req, res);
});

//reads notes from category and user specified
app.get('/notes/:user_id/:category', (req, res) => {
  readNote(req, res);
});


// Home page
app.get("/", (req, res) => {
  res.sendFile("public/login.html", {root: __dirname});
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});