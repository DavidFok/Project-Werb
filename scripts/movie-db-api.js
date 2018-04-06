const http = require("https");

module.exports = function toMovieDB (searchText, fallbackPlan, noteId, finalCB) {
    let title = searchText.replace(/ /g, "%20");
    let options = {
      "method": "GET",
      "hostname": "api.themoviedb.org",
      "port": null,
      "path": `/3/search/multi?include_adult=false&page=1&query=${title}&language=en-US&api_key=340faa006aa263bb72a0308fe33fcc44`,
      "headers": {}
    };
    let req = http.request(options, function (res) {
      let chunks = [];
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function () {
        let body = Buffer.concat(chunks);
        let resStr = JSON.parse(body);
        let shortStr = resStr.results[0];
        let results = {
          data: shortStr,
          subtype: "movieDB"
        };
        if (resStr.total_results === 0) {
          fallbackPlan(searchText, noteId, finalCB);
        } else {
          finalCB(null, results, noteId);
        }
      });
    });
    req.write("{}");
    req.end();
}