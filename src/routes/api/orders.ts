import express from 'express'
import ordersRouter from '../../handlers/orders';

const orders = express.Router();

ordersRouter(orders)

export default orders;