import { Request, Response, Router } from "express";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { OrdersModel } from "../models/orders";

dotenv.config();

const Orders = new OrdersModel();

export const show = async(req: Request, res: Response)=> {
    try{
        jwt.verify(req.body.token, process.env.TOKEN_SECRET!);
    }
    catch(err){
        res.status(401);
        throw new Error(`Error happened while verifying the token: ${err}`)
    }
    try{
        const result = await Orders.show(+req.params.id);
        res.send(result);
    }
    catch(err){
        throw new Error(`Error happened while retrieving orders from database: ${err}`);
    }
}
const ordersRouter = (app: Router) => {
    app.get('/:id', show);
}

export default ordersRouter;