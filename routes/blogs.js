var dateformat = require('dateFormat');
var Post = require('../models/post');  
var markdown = require('markdown').markdown;
var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res, next) {
  var id = req.params.id
  Post.findById({ id: id }, function (err, doc) {
    if (err) console.log(err);
    if (doc != null) {
      res.render('pages/post',
        {
          post: doc,
          dateformat: dateformat,
          markdown: markdown
        });
    }
    // else { console.log("Cannot find page!") }
  });
});

module.exports = router;
