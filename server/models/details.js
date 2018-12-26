const mongoose = require('mongoose');

const detailSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: 1,
		maxlength: 100,
	},
});
const Detail = mongoose.model('Detail', detailSchema);
module.exports = Detail;