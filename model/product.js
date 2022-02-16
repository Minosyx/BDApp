const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment-2');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: Number,
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    category: { type: String, required: true }
});

// ProductSchema.method('update', (updates, callback) => {
//     Object.assign(this, updates);
    // this.save(callback);
// });

// autoIncrement.initialize(mongoose.connection);
// ProductSchema.plugin(autoIncrement.plugin, 'Product');

const Product = mongoose.model('Product', ProductSchema);

module.exports.Product = Product;