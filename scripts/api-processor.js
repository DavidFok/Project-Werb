const http = require("https");
const youtube = require("./youtube-api");
const toMovieDB = require("./movie-db-api");
const yelp = require("./yelp-api");

function processMetadata (metadata, category, text, noteId, cb) {
  let data = JSON.parse(metadata).Entities;
  let metaText = [];
  let metaTypes = [];
  
  // Catch absent metadata from AWS
  if (metadata === undefined || data === undefined) {
    if (category === 'watch') return toMovieDB(text, youtube.process, noteId, cb);
    if (category === 'eat') return yelp(text, noteId, cb);
  };
  
  // Extract text & types from given data & place into separate arrays 
  for(let entity in data) {
    metaText.push(data[entity].Text);
    metaTypes.push(data[entity].Type);
  };

  switch (category) {
    // For watch logs ===>>>> send to either movieDB or Youtube
    case "watch": 
      //check for youtube
      let checkForYT = false;
      metaText.forEach(function(element, idx) {
        let check = element.toLowerCase();
        if (check.search('youtube') >= 0) {
          checkForYT = true;
          // remove "youtube" from search query
          metaText.splice(idx, 1);
        }
        console.log("checkForYT is: ", checkForYT);
      })

      let searchInput = metaText.toString().split(",").join(" ");
      
      // send searchInput to respective API functions
      checkForYT ? youtube.process(searchInput, noteId, cb) : toMovieDB(searchInput, youtube.process, noteId, cb);
      
      break;
      
    // for eat log ===>>> send to Yelp for info
    case "eat":
      let organizationIncluded = metaTypes.includes("ORGANIZATION");
      if (organizationIncluded || metaTypes.includes("PERSON")) {
        let idx = organizationIncluded ? metaTypes.indexOf("ORGANIZATION") : metaTypes.indexOf("PERSON");
        yelp(metaText[idx].toString(), noteId, cb);
      } else {
        yelp(text, noteId, cb);
      }
      break;
  }
}







module.exports = {
  process: processMetadata
};