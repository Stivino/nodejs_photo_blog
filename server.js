// Setup
var Photo = require('./models/photo');
var Post = require('./models/post');
var dateformat = require('dateFormat');
var markdown = require('markdown').markdown;
var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var fs = require('fs');
// var util = require('util');
var formidable = require('formidable');
var config = require('./config');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/posts'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// connecting the database
const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
mongoose.connect(connectionString);

// Routes
app.get("/", (req, res) => {
    Post.find({ $query: {}, $orderby: { created: 1 } }, function (err, posts) {
        if (err) throw err;
        res.render('pages/index', { posts: posts })
    });
});

app.get("/pad", (req, res) => {
    res.render('pages/pad');

});

app.post('/pad', (req, res) => {
    console.log(req.body);
    var post = new Post(req.body);
    post.save(function (err) {
        if (err) throw err;
        console.log('Post saved successfully!');
    });
    res.redirect('/pad');
});



app.get("/blog/:id", (req, res) => {
    var id = req.params.id
    Post.findById({id: id}, function (err, doc) {
        if (err) throw err;
        console.log(doc);
        res.render('pages/post',
        {
            post: doc,
            dateformat: dateformat,
            markdown: markdown
        });
    });
});

app.get('/photos/:id', (req, res) => {
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



app.post('/fileupload', function (req, res) {
    // store an img in binary in mongo
    let Grid = require("gridfs-stream");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var photo = new Photo(req.body);
        photo.name = fields.name;
        photo.img.data = fs.readFileSync(files.upload.path);
        photo.img.contentType = 'image/png';
        photo.save(function (err, photo) {
            if (err) throw err;
        });
    });
});

app.get('/fileupload', function (req, res) {
    res.render('pages/upload');
});



// Listen
app.listen(config.app.port, () => {
    console.log('Server listing on ' + config.app.port);
});


