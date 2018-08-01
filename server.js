// Setup
var markdown = require('markdown').markdown;
var express = require('express');
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var pug = require('pug')
var urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect("mongodb://localhost:27017/node-blog");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

var postSchema = new mongoose.Schema({ 
    title: String,
    summary: String,
    date: Date,
    comments: [{ body: String, date: Date }],
    body: String
}
);
var Post = mongoose.model('Post', postSchema);
// Routes
app.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
      res.render('pages/index', { posts: posts})
   });
});

app.get("/blog/:id", (req, res) => {
    console.log("hello");
    var id = req.params.id;
    console.log(id);
    Post.findById(id, function (err, doc){
        console.log(doc);
        res.render('pages/post', { post: doc});    
    });
});

app.get("/markdown", (req, res) => {
    // var html = markdown.toHTML( "Hello *World*!" +"![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png \"Logo Title Text 1\")");   
 });

 app.get("/addPost", (req, res) => {
    res.render('pages/addPost')
 });

app.post('/addPost', (req, res) => {
    var postData = new Post(req.body);
    // postData.title = res.body.title;
    // postData.body = res.body.body;
    // postData.date = res.body.date;
    // postData.summary = res.body.summary;
    postData.save().then( result => {
        res.redirect(''); 
    }).catch(err => {
        res.status(400).send("Unable to save data");
        console.log(err);
    });
});
// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
})