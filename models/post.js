/* post.js */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
    title: { type: String, required: true },
    title_img: String,
    summary: String,
    created: Date,
    content: String,  
    hearts: Number,
    views: Number,
    comments: [{ user: String, email: String, body: String, date: Date }]
});

module.exports = mongoose.model('Posts', postSchema);