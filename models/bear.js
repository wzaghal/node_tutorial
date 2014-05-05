var mongoose = require('mongoose');
var schema = mongoose.Schema();

var BearhSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Bear',BearhSchema);