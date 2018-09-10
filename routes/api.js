var express = require('express');
var Post = require('../models/post');
var dateformat = require('dateFormat');
var objectId = require('mongodb').ObjectID;
var router = express.Router();

router.get('/posts', function (req, res, next) {
  Post.find().sort({ created: 1 }).exec(function (err, posts) {
    if (err) {
      throw res.send(err);
    }
    res.send({ posts: posts });
  });
});

router.get("/posts/:id", function (req, res) {
  Post.findById(objectId(req.params.id), function (err, post) {
    if (err) {
      res.send(err);
    }
    if (post != null) {
      res.send({ post: post });
    } else { res.send("No post found for id '" + req.params.id + "'") }
  });
});

router.post('/posts/create', function (req, res) {
  res.send(201, req.body);
  var post = new Post(req.body);
  post.save(function (err) {
    if (err) throw err;
    console.log('Post saved successfully!' + post);
  });
});

router.get('/posts/delete/:id', function (req, res) {
  Post.findById(objectId(req.params.id), function (err, post) {
    if(err) {
      res.send(err);
    }
    Post.deleteOne(post);
  })
  res.sendStatus(204);
});

module.exports = router;
