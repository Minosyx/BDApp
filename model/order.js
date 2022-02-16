const mongoose = require('mongoose');
const ProductSchema = require('./product').Product.schema;
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    id: Number,
    products: [ProductSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    totalCost: { type: Number, default: 0 }
});

OrderSchema.pre('save', function(next){
    this.totalCost = 0;
    this.products.forEach((p) => {
        this.totalCost += p.cost;
    })
    next();
});

OrderSchema.method('update', function(updates, callback) {
    Object.assign(this, updates, { updatedAt: new Date() });
    this.save(callback);
});

const Order = mongoose.model('Order', OrderSchema);

module.exports.Order = Order;