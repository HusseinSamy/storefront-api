import { Request, Response, Router } from "express";
import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Order, OrdersModel } from "../models/orders";
import authorize from "../middlewares/authorization";
import { getCompletedOrdersByUser } from "../services/dashboard";
import { resourceLimits } from "worker_threads";

dotenv.config();

interface IUserPayload extends JwtPayload{
    user?: [
        {
            id: number,
            first_name: string, 
            last_name: string, 
            password: string
        }
    ]
}

const Orders = new OrdersModel();

export const show = async(req: Request, res: Response): Promise<Order[]>=> {
    try{
        const result = await Orders.show(+req.params.id);
        res.send(result);
        return result;
    }
    catch(err){
        throw new Error(`Error happened while retrieving orders from database: ${err}`);
    }
    
}
export const create = async(req: Request, res: Response): Promise<Order>=> {
    const decoded: IUserPayload = jwt.decode(req.cookies.token,{complete: true})!;
    const order: Order = {
        user_id: decoded.payload.user[0].id,
        status: req.body.status
    }
    try{
        const result = await Orders.create(order);
        res.send(result);
        return result;
    }
    catch(err){
        throw new Error(`Error happened while retrieving orders from database: ${err}`);
    }

}

export const completedOrdersByUser = async(req: Request, res: Response): Promise<Order[]>=> {
    try{
        const result = await getCompletedOrdersByUser(+req.params.id);
        res.send(result);
        return result;
    }
    catch(err){
        throw new Error(`Error happened while retrieving orders of user from database: ${err}`);
    }

}
export const addProduct = async(req: Request, res: Response) => {
    const orderId: number = +req.params.id;
    const productId: number = +req.body.product;
    const quantity: number = +req.body.quantity;

    const result = await Orders.addProduct(orderId, productId, quantity);
    res.send(result);
    return result;
}

const ordersRouter = (app: Router) => {
    app.get('/completedOrdersByUser/:id', authorize, completedOrdersByUser);
    app.get('/:id/products', authorize, addProduct);
    app.get('/:id', authorize, show);
    app.post('/', authorize, create);

}

export default ordersRouter;