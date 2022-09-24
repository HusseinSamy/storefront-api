import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Order, OrdersModel } from "../models/orders";
import authorize from "../middlewares/authorization";
import { getCompletedOrdersByUser } from "../services/dashboard";

dotenv.config();

interface IUserPayload extends JwtPayload {
  user?: [
    {
      id: number;
      first_name: string;
      last_name: string;
      password: string;
    }
  ];
}

const Orders = new OrdersModel();

export const show = async (
  req: Request,
  res: Response<Order[] | string>
): Promise<Response<Order[] | string>> => {
  try {
    const result = await Orders.show(+req.params.id);
    return res.send(result);
  } catch (err) {
    return res.send(`Error happened while retrieving orders from database`);
  }
};
export const create = async (
  req: Request,
  res: Response<Order | string>
): Promise<Response<Order | string>> => {
  try {
    if (req.cookies.token !== undefined) {
      const decoded: IUserPayload = jwt.decode(req.cookies.token, {
        complete: true,
      })!;
      const order: Order = {
        user_id: decoded.payload.user.id,
        status: req.body.status,
      };
      const result = await Orders.create(order);
      return res.send(result);
    } else {
      res.status(401);
      throw new Error(`Error happened while retrieving orders from database`);
    }
  } catch (err) {
    return res.send((err as Error).message);
  }
};

export const completedOrdersByUser = async (
  req: Request,
  res: Response<Order[] | string>
): Promise<Response<Order[] | string>> => {
  try {
    const result = await getCompletedOrdersByUser(+req.params.id);
    return res.send(result);
  } catch (err) {
    return res.send(
      `Error happened while retrieving orders of user from database`
    );
  }
};
export const addProduct = async (
  req: Request,
  res: Response<Order[] | string>
): Promise<Response<Order[] | string>> => {
  try {
    const orderId: number = +req.params.id;
    const productId: number = +req.body.product;
    const quantity: number = +req.body.quantity;
    const result = await Orders.addProduct(orderId, productId, quantity);
    return res.send(result);
  } catch (err) {
    return res.send(`Error happened while adding products to the database`);
  }
};

const ordersRouter = (app: Router) => {
  app.get("/completedOrdersByUser/:id", authorize, completedOrdersByUser);
  app.post("/:id/products", authorize, addProduct);
  app.get("/:id", authorize, show);
  app.post("/", authorize, create);
};

export default ordersRouter;
