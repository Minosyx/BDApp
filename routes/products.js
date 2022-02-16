const express = require('express');
const router = express.Router();
const Product = require('../model/product').Product;
const getNextValue = require('../model/utils').getNextSequenceValue;

router.param('pname', (req, res, next, pname) => {
    Product.find({ name: new RegExp(pname, 'i')}, (err, docs) => {
        if (err) return next(err);
        if (docs.length == 0) {
            err = new Error('No documents found');
            err.status = 404;
            return next(err);
        }
        req.product = docs
        return next();
    });
})

router.param('pid', (req, res, next, pid) => {
    Product.find({ id: pid }, (err, doc) => {
        if (err) return next(err);
        if (!doc) {
            err = new Error('No documents found');
            err.status = 404;
            return next(err);
        }
        req.product = doc
        return next();
    });
});

router.get('/get', (req, res, next) => {
    res.render('get_product', { title: "Znajdź produkt"});
});

router.get('/post', (req, res, next) => {
    res.render('post_product', { title: "Dodaj produkt"});
});

router.get('/delete', (req, res, next) => {
    res.render('delete_product', { title: "Usuń produkt"});
});

router.get('/update', (req, res, next) => {
    res.render('update_product', { title: "Zmień produkt"});
});

router.get('/:pid', (req, res) => {
    res.render('product', {
        title: "Produkt",
        product: req.product[0]
    });
});

router.get('/name/:pname', (req, res) => {
    res.render('product_list', { 
        title: "Produkty",
        products: req.product
    })
});

router.get('/', (req, res, next) => {
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

    Product.count({}, (err, totalCount) => {
        if (err) return next(err);
        Product.find({}, {}, query, ((err, products) => {
            if (err) return next(err);
            // res.json(products);
            res.render('products', { 
                title: "Produkty",
                products: products,
                page: pageNo,
                size: size,
                pages: Math.ceil(totalCount / size)
            });
        }));
    });
});

router.post('/', async (req, res, next) => {
    const product = new Product(req.body);
    product.id = await getNextValue("product_id");
    product.save((err, product) => {
        if (err) return next(err);
        res.status(201);
        // res.json(product);
        res.send("OK");
    });
});

router.put('/:pid', (req, res, next) => {
    if (req.body){
        Product.updateOne({ id: req.body.id }, req.body, (err, _res) => {
            if (err) return next(err);
            res.status(201);
            res.json(_res);
        });
    } else {
        res.status(200);
        res.sendStatus();
    }
});

router.delete('/:pid', (req, res, next) => {
    const product = req.product[0];
    if (product){
        Product.deleteOne(product, (err, _res) => {
            if (err) return next(err);
            res.status(201);
            res.json(_res);
        });
    }
    else {
        res.status(200);
        res.sendStatus();
    }
});

module.exports = router;