const express = require('express');
const router = express.Router();
const controller = require('../controllers/order_controller');

router.param('oid', controller.order_get_by_id);

router.get('/', controller.order_list);

router.get('/get', (req, res, next) => {
    res.render('get_order', { title: "Znajdź zamówienie"});
});

router.get('/post', (req, res, next) => {
    res.render('post_order', { title: "Dodaj zamówienie"});
});

router.get('/delete', (req, res, next) => {
    res.render('delete_order', { title: "Usuń zamówienie"});
});

router.get('/update', (req, res, next) => {
    res.render('update_order', { title: "Zmień zamówienie"});
});

router.get('/:oid', (req, res) => {
    // res.json(req.order);
    res.render('order', {
        title: "Zamówienie",
        order: req.order[0]
    })
});

router.post('/', controller.order_post);

router.put('/:oid', controller.order_put);

router.delete('/:oid', controller.order_delete);

module.exports = router;