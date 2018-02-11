const http = require("https");
const youtube = require("./youtube-api");
const yelp = require('yelp-fusion');
require("dotenv").config({path: '../.env'});

const apiKey = process.env.API_KEY;
const client = yelp.client(apiKey);

function processMetadata (metadata, category, text, cb) {
  // Catch absent metadata from AWS
  if (metadata == undefined) {
    if (category === 'watch') return toMovieDB(text, youtube.process, cb);
    if (category === 'eat') return toYelp(text, cb);
    if (category === 'read') return toLibrary(text, cb);
    if (category === 'buy') return toAmazon(text, cb);
  };

  let data = JSON.parse(metadata).Entities;
  let metaText = [];
  for(let entity in data) {
    metaText.push(data[entity].Text);
  }
  let metaTypes = [];
  for (let entity in data) {
    metaTypes.push(data[entity].Type);
  }

  // for watch logs ===>>>> send to either movieDB or Youtube
  if (category === "watch") {
    //check for youtube
    let checkForYT = false;
    metaText.forEach(function(element, idx) {
      let check = element.toLowerCase();
      if (check.search('youtube') >= 0) {
        checkForYT = true;
        // remove "youtube" from search query
        metaText.splice(idx, 1)
      }
    })
    let searchInput = metaText.toString().split(",").join(" ");


    if (checkForYT === false) toMovieDB(searchInput, youtube.process, cb);
    if (checkForYT === true) youtube.process(searchInput, cb);
  }
  // for eat log ===>>> send to Yelp for info
  if (category === "eat") {
    if (metaTypes.includes("ORGANIZATION")) {
      let idx = metaTypes.indexOf("ORGANIZATION");
      toYelp(metaText[idx].toString(), cb);
    } else if (metaTypes.includes("QUANTITY") || metaTypes.includes("DATE")) {
      toYelp(text, cb);
    }
    // console.log(metaText);
  }
}


function toMovieDB (searchText, fallbackPlan, finalCB) {
  let title = searchText.replace(/ /g, "%20");
  var options = {
    "method": "GET",
    "hostname": "api.themoviedb.org",
    "port": null,
    "path": `/3/search/multi?include_adult=false&page=1&query=${title}&language=en-US&api_key=340faa006aa263bb72a0308fe33fcc44`,
    "headers": {}
  };
  var req = http.request(options, function (res) {
    var chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      var resStr = JSON.parse(body.toString());
      if (resStr.total_results === 0) {
        fallbackPlan(searchText, finalCB);
      } else {
        finalCB(null, resStr);
      }
    });
  });
  req.write("{}");
  req.end();
}

function toYelp (searchText) {
  client.search({
    term: searchText,
    location: 'vancouver, bc'
  })
  .then(response => {
    cb(undefined, response.jsonBody.businesses[0].name);
  })
  .catch(cb);
}


module.exports = {
  process: processMetadata
};