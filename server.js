// Setup
var Post = require('./model/post');
var dateformat = require('dateFormat');
var markdown = require('markdown').markdown;
var express = require('express');
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
//var pug = require('pug')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect("mongodb://localhost:27017/node-blog");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/posts'));

// Routes
app.get("/", (req, res) => {
    Post.find({ $query: {}, $orderby: { created: 1}}, function(err, posts){
        if (err) throw err;
      res.render('pages/index', { posts: posts})
   });
});

app.get("/pad", (req, res) => {
    res.render('pages/pad');
    
});

app.post('/pad', (req, res) => {
    // var post = new Post({
    //     title: res.body.title,
    //     summary: res.body.summary,
    //     content: res.body.markdown,
    //     created: res.body.date});
    console.log(req.body);
    var post = new Post(req.body);
    //console.log('Save post to db:' + post);
    post.save(function(err) {
        if (err) throw err;
        console.log('Post saved successfully!');
      });
    res.redirect('/pad');
});

app.get("/blog/:id", (req, res) => {
    var id = req.params.id
    console.log(req.params.id);
    Post.findById(id, function (err, doc) {
        if (err) throw err;
        console.log(doc);
        res.render('pages/post', { post: doc, dateformat: dateformat, markdown: markdown});    
    });
});

// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})