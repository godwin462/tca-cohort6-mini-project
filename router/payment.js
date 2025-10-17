const { initializePayment, verifyPayment, verifyPaymentWebHook } = require('../controllers/payment');
const { authenticate } = require('../middleware/authentication');

const router = require('express').Router();

/**
 * @swagger
 * /api/v1/make-payment/{id}:
 *   post:
 *     summary: Initialize a payment
 *     description: Initialize a payment for a product.
 *     tags:
 *       - Payment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to purchase
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment initialized successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 */
router.post('/make-payment/:id', authenticate, initializePayment);

/**
 * @swagger
 * /api/v1/verify-payment:
 *   get:
 *     summary: Verify a payment
 *     description: Verify a payment using the reference from the query parameter.
 *     tags:
 *       - Payment
 *     parameters:
 *       - in: query
 *         name: reference
 *         required: true
 *         description: The payment reference to verify.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment verified successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.get('/verify-payment', verifyPayment);

/**
 * @swagger
 * /api/v1/verify-payment-webhook:
 *   post:
 *     summary: Verify a payment webhook
 *     description: Verify a payment webhook using the event and data from the request body.
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: string
 *               data:
 *                 type: object
 *     responses:
 *       '200':
 *         description: Payment webhook verified successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.get('/verify-payment-webhook', verifyPaymentWebHook);

module.exports = router;
