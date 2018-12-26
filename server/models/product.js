const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: 1,
		maxlength: 100,
    },
    description: {
		type: String,
		required: true,
		maxlength: 1000000,
    },
    price: {
		type: Number,
		required: true,
		maxlength: 250,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref : 'Brand',
        required: true,
    },
    shipping: {
        type: Boolean,
        required: true,
    },
    available: {
        type: Boolean,
        required:true,
    },
    detail: {
        type: Schema.Types.ObjectId,
        ref : 'Detail',
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0,
    },
    publish: {
        required: true,
        type: Boolean,
    },
    images: {
        type: Array,
        default: [],
    }
});
productSchema.set('timestamps', true);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;