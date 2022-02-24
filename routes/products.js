const express = require('express');
const router = express.Router();
const controller = require('../controllers/product_controller');

router.param('pname', controller.product_get_by_name);

router.param('pid', controller.product_get_by_id);

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

router.get('/', controller.product_list);

router.post('/', controller.product_post);

router.put('/:pid', controller.product_put);

router.delete('/:pid', controller.product_delete);

module.exports = router;