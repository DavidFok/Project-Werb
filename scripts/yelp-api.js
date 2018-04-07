const yelp = require('yelp-fusion');

const apiKey = process.env.API_KEY;
const client = yelp.client(apiKey);


module.exports = function (searchText, noteId, cb) {
    client.search({
      term: searchText,
      location: 'vancouver, bc'
    })
    .then(response => {
      let dataVehicle = {
        data: response.jsonBody.businesses[0],
        subtype: "yelp"
      };
      cb(undefined, dataVehicle, noteId);
    })
    .catch(cb);
}