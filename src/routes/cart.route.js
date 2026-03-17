import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { addToCart, clearCart, getCart, removeFromCart, updateCartItem } from '../controllers/cart.controller.js';

const Cartrouter = express.Router();

Cartrouter.post('/', isAuthenticated, addToCart)
Cartrouter.get('/', isAuthenticated, getCart)
Cartrouter.put('/', isAuthenticated, updateCartItem)
Cartrouter.delete('/:productId', isAuthenticated, removeFromCart)
Cartrouter.delete('/', isAuthenticated, clearCart)



export default Cartrouter