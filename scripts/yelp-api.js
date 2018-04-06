const yelp = require('yelp-fusion');

const apiKey = process.env.API_KEY;
const client = yelp.client(apiKey);


module.exports = function (searchText, noteId, cb) {
    client.search({
      term: searchText,
      location: 'vancouver, bc'
    })
    .then(response => {
      cb(undefined, response.jsonBody.businesses[0], noteId);
    })
    .catch(cb);
}