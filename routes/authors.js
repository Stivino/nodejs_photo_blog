var express = require('express');
var Post = require('../models/post');
var dateformat = require('dateFormat');
var objectId = require('mongodb').ObjectID;
var router = express.Router();

router.get('/', function (req, res, next) {
  Post.find().sort({ created: 1 }).exec(function (err, posts) {
    if (err) throw err;
    res.render('authors/posts', { posts: posts, dateformat: dateformat });
  });
});

router.get("/edit/", function (req, res) {
    res.render('authors/edit');
});

router.get("/edit/:id", function (req, res) {
    Post.findById(objectId(req.params.id), function (err, doc) {
    if (err) console.log(err);
    if (doc != null) {
      res.render('authors/edit',
        {
          post: doc
        });
    }
  });
});

router.post('/edit/', function (req, res) {
  var post = new Post(req.body);
  post.save(function (err) {
    if (err) throw err;
    console.log('Post saved successfully!' + post);
  });
  res.redirect('authors/edit');
});

module.exports = router;
