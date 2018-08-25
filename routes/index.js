var express = require('express');
var Post = require('../models/post');  
var dateformat = require('dateFormat');
var router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {
  Post.find({ $query: {}, $orderby: { created: 1 } }, function (err, posts) {
    if (err) throw err;
    res.render('index', { posts: posts, dateformat: dateformat, })
  });
});

module.exports = router;
