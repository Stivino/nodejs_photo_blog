var express = require('express');
var router = express.Router();
var Photo = require('../models/photo');  

router.get('/:id', (req, res) => {
  var name = req.params.id
  Photo.findOne({ name: name }, function (err, doc) {
      if (err) return next(err);
      if (doc != null && doc.img != null) {
          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
      } else {
          Photo.findOne({ name: 'default' }, function (err, doc) {
              res.contentType(doc.img.contentType);
              res.send(doc.img.data);
          });
      }
  });
});

module.exports = router;
