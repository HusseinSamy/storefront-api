import { Request, Response, Router } from "express";
import ProductModel, { IProduct }  from "../models/products";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config();

const Products = new ProductModel();

export const index = async(_req: Request, res: Response)=> {
    const result = await Products.index();
    res.send(result);
}
export const show = async(req: Request, res: Response)=> {
    const result = await Products.show(+req.params.id);
    res.send(result);
}
//Requires token
export const create = async (req: Request, res: Response)=> {
    const product: IProduct = {
        name: req.body.name , 
        price: req.body.price, 
        category: req.body.category
    };
    try{
        jwt.verify(req.body.token, process.env.TOKEN_SECRET!);
    }
    catch(err){
        res.status(401);
        throw new Error(`Error happened while verifying the token: ${err}`)
    }
    try{

       const result = await Products.create(product);
       res.send(result);
    }
    catch(err){
        throw new Error(`error happened while creating product: ${err}`);
    }
    
}


const productsRouter = (app: Router) => {
    app.get('/', index);
    app.get('/:id', show);
    app.post('/', create);
}

export default productsRouter;