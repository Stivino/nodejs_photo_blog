var express = require('express');
var Post = require('../models/post');  
var dateformat = require('dateFormat');
var markdown = require('markdown').markdown;
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/:id', function (req, res, next) {
  var id = new ObjectId(req.params.id);
  console.log(id);
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
