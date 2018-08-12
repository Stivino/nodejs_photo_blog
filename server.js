// Setup
var Post = require('./models/post');
var dateformat = require('dateFormat');
var markdown = require('markdown').markdown;
var express = require('express');
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var fs = require('fs');
var util = require('util');
var formidable = require('formidable');
//var pug = require('pug')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect("mongodb://localhost:27017/node-blog");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/posts'));



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
    Post.findById(id, function (err, doc) {
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
var Schema = mongoose.Schema;
// example schema
var schema = new Schema({
    name: { type: String },
    img: { data: Buffer, contentType: String }
});
// our model
var A = mongoose.model('A', schema);


app.get('/photos/:id', (req, res) => {
    A.findById(a, function (err, doc) {
        if (err) return next(err);
        res.contentType(doc.img.contentType);
        res.send(doc.img.data);
    });
    console.log(req.body);
});




let Grid = require("gridfs-stream");
app.post('/fileupload', function (req, res) {
    // store an img in binary in mongo
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var a = new A;
        a.img.data = fs.readFileSync(files.upload.path);
        a.img.contentType = 'image/png';
        a.save(function (err, a) {
            if (err) throw err;
        });
    });
});

app.get('/fileupload', function (req, res) {
    res.render('pages/upload');
});






// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
});


