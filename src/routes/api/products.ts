import express from 'express'
import productsRouter from '../../handlers/products';

const products = express.Router();

productsRouter(products);

products.get('/top5', () => {

})
products.get('/product-by-category', () => {

})

export default products;