/* post.js */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var postSchema = new Schema({
    title: String,
    title_img: String,
    summary: String,
    created: Date,
    content: String,  
    hearts: Number,
    views: Number,
    comments: [{ user: String, email: String, body: String, date: Date }]
});

var Post = mongoose.model('Posts', postSchema);
module.exports = Post;