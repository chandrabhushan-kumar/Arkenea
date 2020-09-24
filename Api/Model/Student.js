const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
	_id 		                : mongoose.Schema.Types.ObjectId,
	Name 		                : String,
	mail 		                : String,
	message 		            : String,
	createdAt 	                : Date,
	createdBy 	                : String
});

module.exports = mongoose.model('student', StudentSchema);