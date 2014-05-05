var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BearhSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Bear',BearhSchema);