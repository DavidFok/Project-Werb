const path = require('path');
const sort = require(path.resolve('./scripts/sorter'));
const apiProcess = require(path.resolve("./scripts/api-processor"));

const processResult = function (result){
  let metadata = JSON.stringify(result);
  return metadata;
}

// function apiCB (err, classification, noteID) {
//     if (err) {
//       console.log("classifier error: ", err);
//       // res.status(500).send("oh fuck oh fuck oh fuck oh fuck I AM ON FIRE!");
//     } else {
//       // insertIntoDatabase(rawData, classification, (db_result) => {
//       //   res.render('index.ejs');
//       // })
//       let apiDataStr = JSON.stringify(classification);
//       // knex("notes").insert({ "apidata": apiDataStr}).at(noteID);
//       knex("notes").where('note_id', noteID).update({ "processed_metadata": apiDataStr });
//       // console.log("successful classification:", classification);
//     }
//   };

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

    // apiCB : function(err, classification, noteID) {
    //   if (err) {
    //     console.log("classifier error: ", err);
    //     // res.status(500).send("oh fuck oh fuck oh fuck oh fuck I AM ON FIRE!");
    //   } else {
    //     // insertIntoDatabase(rawData, classification, (db_result) => {
    //     //   res.render('index.ejs');
    //     // })
    //     let apiDataStr = JSON.stringify(classification);
    //     // knex("notes").insert({ "apidata": apiDataStr}).at(noteID);
    //     knex("notes").where('note_id', noteID).update({ "processed_metadata": apiDataStr });
    //     // console.log("successful classification:", classification);
    //   }
    // },

    //add note entry to notes table
    postNote : function(req, res){
      if (req.session.user_id){
        //if logged in
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
        Promise.all([metadata(), category()]).then(function(values) {
        // metadata().then(function(result) {
          let metadataStr = JSON.stringify(values[0]);
          let operation = knex("notes").insert({"user_id": user_id, "category": values[1], "text": text, "created_at": isoDate, "metadata": metadataStr});
          operation.then((rows) => {
            let noteId = 0;
            let query = knex().select("note_id").from("notes");
            query.then((queryOutput) => {
              let max = 0;
              queryOutput.forEach(function(value, index){
                if (value.note_id > max){
                  max = value.note_id;
                }
              });
              noteId = max;
              apiProcess.process(metadataStr, values[1], text, noteId, function(err, classification, noteID) {
                if (err) {
                  console.log("classifier error: ", err);
                  // res.status(500).send("oh fuck oh fuck oh fuck oh fuck I AM ON FIRE!");
                } else {
                  // insertIntoDatabase(rawData, classification, (db_result) => {
                  //   res.render('index.ejs');
                  // })
                  let apiDataStr = JSON.stringify(classification);
                  knex("notes").where('note_id', noteID).update({ 'processed_metadata': apiDataStr })
                  .then(()=>{})
                  .catch((err) => {
                    console.log('fuck your mother', err);
                  });
                  console.log("successful classification:", apiDataStr);
                }
              });
              res.redirect("/app");
            });

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
        let operation = knex().select("text", "note_id", "processed_metadata").from("notes").where("user_id", user_id).andWhere("category", category);
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

