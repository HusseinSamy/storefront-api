import express from 'express'
import productsRouter from '../../handlers/products';

const products = express.Router();

productsRouter(products);

export default products;