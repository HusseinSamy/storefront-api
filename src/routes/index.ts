import express from 'express'
import orders from './api/orders';
import products from './api/products';
import users from './api/users';

const router = express.Router();

router.use('/users', users)
router.use('/products', products)
router.use('/orders', orders)

export default router;
