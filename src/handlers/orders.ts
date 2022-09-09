import { Request, Response, Router } from "express";
import dotenv from 'dotenv'
import { OrdersModel } from "../models/orders";
import authorize from "../middlewares/authorization";

dotenv.config();

const Orders = new OrdersModel();

export const show = async(req: Request, res: Response)=> {
    try{
        const result = await Orders.show(+req.params.id);
        res.send(result);
    }
    catch(err){
        throw new Error(`Error happened while retrieving orders from database: ${err}`);
}
}
const ordersRouter = (app: Router) => {
    app.get('/:id', authorize, show);
}

export default ordersRouter;