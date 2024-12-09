const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateOrder } = require('../middleware/validationMiddleware');

router.post('/', validateOrder, orderController.createOrder);
router.put('/:id', validateOrder, orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);

module.exports = router;