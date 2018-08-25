/* photo.js */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var authorSchema = new Schema({
    name: String,
    img: { data: Buffer, contentType: String },
    description: {type: String}
});

module.exports = mongoose.model('Photos', photoSchema);