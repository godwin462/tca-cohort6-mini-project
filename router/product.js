const { createProduct } = require('../controllers/product');

const router = require('express').Router();

router.post('/create-product', createProduct);

module.exports = router;