var mongoose	= require('mongoose');

module.exports = mongoose.model('Todo', {
	text: String,
	time: String,
	done: Boolean
});