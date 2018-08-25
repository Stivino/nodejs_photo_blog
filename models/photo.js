/* photo.js */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var photoSchema = new Schema({
    name: String,
    img: { data: Buffer, contentType: String } ,
    hashtags: [String]
});

module.exports = mongoose.model('Photos', photoSchema);