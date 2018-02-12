const path = require('path');
const sort = require(path.resolve('./scripts/sorter'));

const processResult = function (result){
  let metadata = JSON.stringify(result);
  return metadata;
}

module.exports = function makeDataHelpers(knex) {
  return {
    //adds user entry to users table
    registerUser : function(req, res){
      let email = req.body.email;
      let password = req.body.password;
      let operation = knex("users").insert({"email": email, "password": password});
      operation.then((rows) => {
        let user_id = knex().select('user_id').from('users').where('email', email);
        user_id.then((rows) => {
          console.log("rows: ", rows[0]);
          req.session.user_id = rows[0].user_id;
          res.redirect("/app");
        });
      });
    },

    //add note entry to notes table
    postNote : function(req, res){
      if (req.session.user_id){
        //if logged in
        let text = req.body.text;
        let user_id = req.session.user_id;
        let date = new Date();
        let isoDate = date.toISOString();
        let created_at = isoDate;
        let category = sort.entry(text);
        let metadata = function() {
          return new Promise(function(resolve, reject) {
            resolve(sort.entity(text));
          });
        };
        metadata().then(function(result) {
          console.log("the metadata is: ", result);
          let metadataStr = JSON.stringify(result);
          let operation = knex("notes").insert({"user_id": user_id, "category": category, "text": text, "created_at": isoDate, "metadata": metadataStr});
          operation.then((rows) => {
            res.redirect("/app");
          }).catch((error) => {
            console.error("error: ", error);
          });
        });
      } else {
        //if not logged in
        res.redirect('/login');
      }
    },

    deleteNote: function(req, res){
      if (req.session.user_id){
        //if logged in
        let note_id = req.body.note_id;
        //delete the entry from the database
        let operation = knex('notes').where('note_id', note_id).del();
        operation.then((rows) => {
          res.status(200).send();
        });
      } else {
        //if not logged in
        res.redirect('/login');
      }
    },

    //reads notes from notes table, queried by user id and category
    readNote : function(req, res){
      if (req.session.user_id){
        //if logged in
        let user_id = req.session.user_id;
        let category = req.params.category;
        let operation = knex().select("text", "note_id").from("notes").where("user_id", user_id).andWhere("category", category);
        operation.then((rows) => {
          console.log("notes read: ", rows);
          res.send(rows);
        }).catch((error) => {
          console.error("error: ", error);
        });
      } else {
        //if not logged in
        res.redirect('/login');
      }
    },

    //logs user in by searching the user database for matching credentials. If the matching credentials are found,
    //the user is given a session
    loginUser : function(req, res){
      let operation = knex().select("email", "user_id").from("users").where("email", req.body.email).andWhere("password", req.body.password);
      operation.then((rows) => {
        if(rows.length > 0){
          //if the login credentials are correct, log the user in.
          req.session.user_id = rows[0].user_id;
          res.redirect('/app')
        }else{
          //if the login credentials are invalid
          console.log("Account not found");
          res.redirect('/login');
        }
      }).catch((error) => {
        console.error("error: ", error);
      });
    },

    //logs the user out by ending the user's session
    logoutUser : function(req, res){
      //log user out
      req.session.user_id = null;
      res.redirect('/login');
    }
  }
}

