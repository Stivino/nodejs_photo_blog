var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('authors');
});

router.post('/', function (req, res) {
  console.log(req.body);
  var post = new Post(req.body);
  post.save(function (err) {
    if (err) throw err;
    console.log('Post saved successfully!' + post);
  });
  res.redirect('/pad');
});

module.exports = router;
