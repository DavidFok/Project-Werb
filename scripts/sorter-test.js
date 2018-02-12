const sort = require("./sorter");
const metadata = require("./api-processor");


// console.log(sort.entity("harpers bazaar fashion magazine", sort.processResult));


var yelpMetadataJSON = JSON.stringify(
  {"Entities":
    [ { "Score":0.8563781976699829,
        "Type":"PERSON",
        "Text":"Miku",
        "BeginOffset":0,
        "EndOffset":4},
      { "Score":0.6879326701164246,
        "Type":"OTHER",
        "Text":"japanese",
        "BeginOffset":19,
        "EndOffset":27}
    ]
  }
)
var youtubeMetadataJSON = '{"Entities":[{"Score":0.9832693338394165,"Type":"ORGANIZATION","Text":"youtube","BeginOffset":5,"EndOffset":12},{"Score":0.9993098974227905,"Type":"PERSON","Text":"Stephen Colbert","BeginOffset":24,"EndOffset":39}]}';


//test 1 entity && entity = TITLE
// metadata.process('{"Entities":[{"Score":0.9834399223327637,"Type":"TITLE","Text":"Citizen Kane","BeginOffset":15,"EndOffset":27}]}', 'watch');

// test multiple entities && for youtube
// metadata.process(null, 'watch', 'Pretty Woman', (err, classification) => {
//   // console.log(data);
//   // res.json(data);
//   if (err) {
//     console.log("fucking classifier is SO FUCKING BROKEN", err);
//     // res.status(500).send("oh fuck oh fuck oh fuck oh fuck I AM ON FIRE!");
//   } else {
//     let classifiedJSONstr = JSON.stringify(classification);
//     // insertIntoDatabase(rawData, classification, (db_result) => {
//     //   res.render('index.ejs');
//     // })
//     console.log("successful classification:", classifiedJSONstr);
//     return classifiedJSONstr;
//   }
// });

// metadata.process('{"Entities":[{"Score":0.7616552710533142,"Type":"QUANTITY","Text":"5 Guys","BeginOffset":16,"EndOffset":22}]}', 'eat');

// test no entities
console.log(metadata.process(youtubeMetadataJSON, 'watch', 'find youtube video from Stephen Colbert', 78));




/*
## processMetadata takes 4 parameters (metadata, category, text, cb)
callback needs to be defined as such:
  (err, classification) => {
    if (err) {
      console.log("classifier error: ", err);
      // res.status(500).send("oh fuck oh fuck oh fuck oh fuck I AM ON FIRE!");
    } else {
      // insertIntoDatabase(rawData, classification, (db_result) => {
      //   res.render('index.ejs');
      // })
      console.log("successful classification:", classification); //
    }
  });

## Add to server.js


const sort = require("./sorter");
const metadata = require("./api-processor");


## List of things to remember to test:

eat with yelp metadata
eat with search text but no metadata
watch with youtube + metadata
watch with no metadata
watch with metadata no youtube





*/