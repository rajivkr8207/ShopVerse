import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { cancelOrder, createOrder, getMyOrders, getOrderById,  } from '../controllers/order.controller.js';

const Orderrouter = express.Router();

Orderrouter.post('/', isAuthenticated, createOrder)
Orderrouter.get('/', isAuthenticated, getMyOrders)
Orderrouter.get('/:orderId', isAuthenticated, getOrderById)
Orderrouter.patch('/:orderId', isAuthenticated, cancelOrder)
// Orderrouter.put('/:orderId', isAuthenticated, updateOrderStatus) // rider feattures



export default Orderrouter;