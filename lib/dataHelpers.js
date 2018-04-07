const path = require('path');
const sort = require(path.resolve('./scripts/sorter'));
const apiProcess = require(path.resolve("./scripts/api-processor"));

const processResult = function (result){
  let metadata = JSON.stringify(result);
  return metadata;
};


module.exports = function makeDataHelpers(knex) {
  return {
    //adds user entry to users table
    registerUser : function(req, res){
      let email = req.body.email;
      let password = req.body.password;

      knex("users").insert({"email": email, "password": password})
      .then(() => {
        return knex().select('user_id').from('users').where('email', email);
      })
      .then((result) => {
        req.session.user_id = result[0].user_id;
        res.redirect("/app");
      });
    },

    //add note entry to notes table
    postNote : function(req, res){
      //if logged in
      if (req.session.user_id){
        let text = req.body.text;
        let user_id = req.session.user_id;
        let date = new Date();
        let isoDate = date.toISOString();
        let created_at = isoDate;


        let category = function() {
          return new Promise(function(resolve, reject) {
            resolve(sort.entry(text));
          });
        };

        let metadata = function() {
          return new Promise(function(resolve, reject) {
            resolve(sort.entity(text));
          });
        };

        Promise.all([metadata(), category()])
        .then((values) => {
          let category = values[1];
          let metadataStr = JSON.stringify(values[0]);

          knex("notes")
          .insert({
            "user_id": user_id,
            "category": values[1],
            "text": text,
            "created_at": isoDate,
            "metadata": metadataStr
          })
          .then(() => {
            return knex().select("note_id").from("notes")
          })
          .then((queryOutput) => {
            let noteId = 0;
            queryOutput.forEach(function(value, index){
              if (value.note_id > noteId) {
                noteId = value.note_id;
              }
            });
            apiProcess.process(metadataStr, category, text, noteId, this.insertProcessedMetadata);
            res.redirect("/app");
          })
        })
        .catch((error) => {
          console.error("error: ", error);
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
        knex('notes').where('note_id', note_id).del()
        .then((rows) => {
          res.status(200).send();
        });
      } else {
        //if not logged in
        res.redirect('/login');
      }
    },

    //reads notes from notes table, queried by user id and category
    readNote : function(req, res){
      //if logged in
      if (req.session.user_id){
        let user_id = req.session.user_id;
        let category = req.params.category;

        knex().select("text", "note_id", "processed_metadata", "subtype").from("notes").where("user_id", user_id).andWhere("category", category)
        .then((rows) => {
          res.send(rows);
        })
        .catch((error) => {
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
      knex().select("email", "user_id").from("users").where("email", req.body.email).andWhere("password", req.body.password)
      .then((rows) => {
        //if the login credentials are correct, log the user in.
        if(rows.length > 0) {
          req.session.user_id = rows[0].user_id;
          res.redirect('/app');
        } else {
          //if the login credentials are invalid
          console.log("Account not found");
          res.redirect('/login');
        }
      })
      .catch((error) => {
        console.error("error: ", error);
      });
    },

    //logs the user out by ending the user's session
    logoutUser : function(req, res){
      //log user out
      req.session.user_id = null;
      res.redirect('/login');
    },

    userEmail : function (req, res){
      if (req.session.user_id){
        //if logged in
        let user_id = req.session.user_id;
        //query database for user's email
        knex('users').select('email').where('user_id', user_id)
        .then((email) => {
          //send email back to client
          res.send(email[0].email);
        });
      } else {
        //if not logged in, redirect to login screen
        res.redirect('/login');
      }

    },

    insertProcessedMetadata : function(err, classification, noteID) {
      if (err) {
        console.log("classifier error: ", err);
      } else {
        let subtype = classification.subtype;
        let apiDataStr = JSON.stringify(classification.data);
        knex("notes").where('note_id', noteID).update({ 'processed_metadata': apiDataStr, 'subtype': subtype })
        .then(()=>{})
        .catch((err) => {
          console.log(err);
        });
        console.log("successful classification:", apiDataStr);
      }
    }
  }
}

