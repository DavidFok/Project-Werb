"use strict";

const express = require('express');
const router  = express.Router();
const path = require('path');

module.exports = (dataHelpers) => {
    //get app page
  router.get('/app', (req, res) => {
    if (req.session.user_id){
      res.sendFile(path.resolve('./public/app.html'));
    } else {
      //redirect to login screen if not logged in
      res.redirect('/login');
    }
  });

  //routing to test form
  router.get("/testForm", (req, res) => {
    res.sendFile(path.resolve('./public/testForm.html'));
  });

  //logs user to table 'users'
  router.post("/register", (req, res) => {
    dataHelpers.registerUser(req, res);
  });

  //register page
  router.get("/register", (req, res) => {
    res.sendFile(path.resolve('./public/register.html'));
  });

  //log user in
  router.post("/login", (req, res) => {
    dataHelpers.loginUser(req, res);
  });

  router.get("/login", (req, res) => {
    res.sendFile(path.resolve('./public/login.html'));
  });

  //log user out
  router.post("/logout", (req, res) => {
    dataHelpers.logoutUser(req, res);
  });

  //logs note into table 'notes'
  router.post("/note", (req, res) => {
    dataHelpers.postNote(req, res);
  });

  router.post('/delete', (req, res) => {
    dataHelpers.deleteNote(req, res);
  });

  //reads notes from category and user specified
  router.get("/notes/:category", (req, res) => {
    dataHelpers.readNote(req, res);
  });

  // Home page
  router.get("/", (req, res) => {
    res.sendFile(path.resolve('./public/login.html'));
  });
  return router;
}
