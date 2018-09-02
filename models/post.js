/* post.js */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
    title:  { type: String, required: true },
    author: {type: Schema.Types.ObjectId, required: true},
    title_img: {type: String, required: true},
    summary: {type: String, required: true},
    created: { type: Date, default: Date.now },
    content: {type: String, required: true},  
    votes: Number,
    views: Number,
    comments: [{ user: String, email: String, body: String, date: Date }],
    hashtags: [String]
});

module.exports = mongoose.model('posts', postSchema);