import { Request, Response, Router } from "express";
import ProductModel, { Product } from "../models/products";
import dotenv from "dotenv";
import {
  getProductByCategory,
  getTop5PopularProducts,
} from "../services/dashboard";
import authorize from "../middlewares/authorization";

dotenv.config();

const Products = new ProductModel();

const index = async (
  _req: Request,
  res: Response<Product[] | string>
): Promise<Response<Product[] | string>> => {
  try {
    const result = await Products.index();
    return res.send(result);
  } catch (err) {
    return res.send(`error happened while retrieving all product`);
  }
};
const show = async (
  req: Request,
  res: Response<Product | string>
): Promise<Response<Product | string>> => {
  try {
    const result = await Products.show(+req.params.id);
    if (result) {
      return res.send(result);
    } else {
      throw new Error(
        `error happened while retrieving product with id ${req.params.id}`
      );
    }
  } catch (err) {
    return res.status(400).send((err as Error).message);
  }
};

//Requires token
const create = async (
  req: Request,
  res: Response<Product | string>
): Promise<Response<Product | string>> => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const result = await Products.create(product);
    return res.send(result);
  } catch (err) {
    return res.send(`error happened while creating product`);
  }
};
const top5 = async (
  _req: Request,
  res: Response<Product[] | string>
): Promise<Response<Product[] | string>> => {
  try {
    const result = await getTop5PopularProducts();
    return res.send(result);
  } catch (err) {
    return res.send(`error happened while retrieving last 5 products`);
  }
};
const byCategory = async (
  req: Request,
  res: Response<Product[] | string>
): Promise<Response<Product[] | string>> => {
  try {
    const result = await getProductByCategory(req.body.category);
    return res.send(result);
  } catch (err) {
    return res.send(`error happened while filtering products by category`);
  }
};

const productsRouter = (app: Router) => {
  app.get("/top5", top5);
  app.get("/productByCategory", byCategory);
  app.get("/:id", show);
  app.get("/", index);
  app.post("/", authorize, create);
};

export default productsRouter;
