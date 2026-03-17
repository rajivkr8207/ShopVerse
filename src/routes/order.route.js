import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { cancelOrder, createOrder, getMyOrders, getOrderById, updateOrderStatus } from '../controllers/order.controller.js';

const Orderrouter = express.Router();

Orderrouter.post('/', isAuthenticated, createOrder)
Orderrouter.get('/', isAuthenticated, getMyOrders)
Orderrouter.get('/:orderId', isAuthenticated, getOrderById)
Orderrouter.delete('/:orderId', isAuthenticated, cancelOrder)
Orderrouter.put('/:orderId', isAuthenticated, updateOrderStatus)



export default Orderrouter;