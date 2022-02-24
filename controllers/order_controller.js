const Order = require('../model/order').Order;
const Product = require('../model/product').Product;
const getNextValue = require('../model/utils').getNextSequenceValue;


exports.order_get_by_id = (req, res, next, oid) => {
    Order.find({ id: oid }, (err, doc) => {
        if (err) return next(err);
        if (!doc) {
            err = new Error('No documents found');
            err.status = 404;
            return next(err);
        }
        req.order = doc
        return next();
    });
};

exports.order_list = (req, res, next) => {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);

    if (!pageNo) pageNo = 1;
    if (!size) size = 10;

    if(pageNo < 0 || pageNo === 0) {
        var err = new Error('Bad index number');
        err.status = 500;
        return next(err);
    }

    var query = {}
    query.skip = size * (pageNo - 1);
    query.limit = size;

    Order.count({}, (err, totalCount) => {
        if (err) return next(err);
        Order.find({}, {}, query, ((err, orders) => {
            if (err) return next(err);
            // res.json(orders);
            res.render('orders', {
                title: "Zamówienia",
                orders: orders,
                page: pageNo,
                size: size,
                pages: Math.ceil(totalCount / size)
            });
        }));
    });
};

exports.order_post = async (req, res, next) => {
    var pids = req.body['products[]'];
    if (!Array.isArray(pids)) {
        pids = [pids];
    }
    for (var i = 0; i < pids.length; i++) {
        pids[i] = parseInt(pids[i])
    }
    var oid = await getNextValue('order_id');
    Product.find({ id: { "$in": pids }}, (err, docs) => {
        if (err) return next(err);
        if (docs.length == 0){
            err = new Error('No documents found');
            err.status = 404;
            return next(err);
        }

        const order = new Order();
        order.products = docs;
        order.id = oid;
        order.save((err, order) => {
            if (err) return next(err);
            res.status(201);
            res.json(order);
        });
    });
};

exports.order_put = (req, res, next) => {
    if (req.body){
        const orderID = req.body.id;
        var pids = req.body['products[]'];
        if (!Array.isArray(pids)) {
            pids = [pids];
        }
        for (var i = 0; i < pids.length; i++) {
            pids[i] = parseInt(pids[i])
        }
        Order.findOne({ id: orderID }, (err, doc) => {
            if (!doc){
                err = new Error('No documents found');
                err.status = 404;
                return next(err);
            }
            
            Product.find({ id: { "$in": pids }}, (err, docs) => {
                if (err) return next(err);
                if (docs.length == 0){
                    err = new Error('No documents found');
                    err.status = 404;
                    return next(err);
                }
                up = {
                    id: orderID,
                    products: docs
                }
                doc.update(up, (err, _res) => {
                    if (err) return next(err);
                    res.status(201);
                    res.json(_res);
                });
            });
        });
    } else {
        res.status(200);
        res.sendStatus();
    }
};

exports.order_delete = (req, res, next) => {
    const order = req.order[0];
    if (order){
        Order.deleteOne(order, (err, _res) => {
            if (err) return next(err);
            res.status(201);
            res.json(order);
        });
    } else {
        res.status(200);
        res.sendStatus();
    }
};
