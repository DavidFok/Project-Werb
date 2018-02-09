"use strict";

require("dotenv").config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const sort        = require("./scripts/sorter");
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

// ===================================================================================================================
// FUNCTIONS
// ===================================================================================================================

//adds user entry to users table
const registerUser = function(req, res){
  let email = req.body.email;
  let password = req.body.password;
  let operation = knex("users").insert({"email": email, "password": password});
  operation.then((rows) => {
    res.redirect("/login");
  });
};

//add note entry to notes table
const postNote = function(req, res){
  let text = req.body.text;
  let category = sort.entry(text);
  let user_id = req.body.userId;
  let date = new Date();
  let isoDate = date.toISOString();
  let created_at = isoDate;
  let operation = knex("notes").insert({"user_id": user_id, "category": category, "text": text, "created_at": isoDate});
  operation.then((rows) => {
    res.redirect("/testForm");
  }).catch((error) => {
    console.error("error: ", error);
  });
};

//reads notes from notes table, queried by user id and category
const readNote = function(req, res){
  let user_id = req.params.user_id;
  let category = req.params.category;
  let operation = knex("notes").select("text").from("notes").where("user_id", user_id).andWhere("category", category);
  operation.then((rows) => {
    console.log("notes read: ", rows);
    res.send(rows);
  }).catch((error) => {
    console.error("error: ", error);
  });
};

//logs user in by searching the user database for matching credentials. If the matching credentials are found,
//the user is given a session
const loginUser = function(req, res){
  let operation = knex("users").select("email", "user_id").from("users").where("email", req.body.email).andWhere("password", req.body.password);
  operation.then((rows) => {
    if(rows.length > 0){
      //if the login credentials are correct, log the user in.
      req.session.user_id = rows[0].user_id;
      res.send();
    }else{
      //if the login credentials are invalid
      console.log("Account not found");
      res.status(404).send();
    }
  }).catch((error) => {
    console.error("error: ", error);
  });
};

//logs the user out by ending the user's session
const logoutUser = function(req, res){
  //log user out
  req.session.user_id = null;
  res.send();
};

// ===================================================================================================================
// ROUTING
// ===================================================================================================================

//routing to test form
app.get("/testForm", (req, res) => {
  res.sendFile("public/testForm.html", {root: __dirname});
});

//logs user to table 'users'
app.post("/register", (req, res) => {
  registerUser(req, res);
});

//log user in
app.post("/login", (req, res) => {
  loginUser(req, res);
});

app.get("/login", (req, res) => {
  res.sendFile("public/login.html", {root: __dirname});
});

//log user out
app.post("/logout", (req, res) => {
  logoutUser(req, res);
});

//logs note into table 'notes'
app.post("/note", (req, res) => {
  postNote(req, res);
});

//reads notes from category and user specified
app.get("/notes/:user_id/:category", (req, res) => {
  readNote(req, res);
});

// Home page
app.get("/", (req, res) => {
  res.sendFile("public/login.html", {root: __dirname});
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});