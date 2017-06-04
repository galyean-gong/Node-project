var mongoose = require('mongoose');
var path = require('path');
var MovieSchema = require(path.join(__dirname,'../schemas/movie.js'))
var Movie = mongoose.model('Movie',MovieSchema)
module.exports = Movie;