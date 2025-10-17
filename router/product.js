const { createProduct, getAll, getOne } = require('../controllers/product');
const { authenticate, adminAuth } = require('../middleware/authentication');

const router = require('express').Router();

/**
 * @swagger
 * /api/v1/create-product:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided details.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.post('/create-product', authenticate, adminAuth, createProduct);

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     tags:
 *       - Products
 *     responses:
 *       '200':
 *         description: A list of products
 *       '500':
 *         description: Internal server error
 */
router.get('/products', getAll);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a single product
 *     description: Retrieve a single product by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single product
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
router.get('/products/:id', getOne);

module.exports = router;