const lunr = require('lunr');
const searchData = require('../client/_site/search_data.json');

let idx = lunr(function() {
  this.ref('id');
  this.field('title');
  this.field('content');

  for (var property in searchData) {
    if(searchData.hasOwnProperty(property)) {
      this.add(searchData[property]);
    }
  }
});

module.exports = function(app) {
  app.get('/api/blog-search', (req, res) => {
    let searchText = req.query.query;
    let results = idx.search(searchText);
    let resultsToSend = [];
    for(var i=0; i<results.length; i++){
      resultsToSend.push(searchData[results[i].ref]);
    }
    res.send({
      "results": resultsToSend
    });
  });
}