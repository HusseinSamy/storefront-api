import { Request, Response, Router } from "express";
import ProductModel, { Product } from "../models/products";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  getProductByCategory,
  getTop5PopularProducts,
} from "../services/dashboard";
import authorize from "../middlewares/authorization";

dotenv.config();

const Products = new ProductModel();

const index = async (_req: Request, res: Response): Promise<Product[]> => {
  try {
    const result = await Products.index();
    res.send(result);
    return result;
  } catch (err) {
    throw new Error(`error happened while retrieving all product: ${err}`);
  }
};
const show = async (req: Request, res: Response): Promise<Product | null> => {
  try {
    const result = await Products.show(+req.params.id);
    res.send(result);
    if (result) {
      return result;
    } else {
      throw new Error(
        `error happened while retrieving product with id ${req.params.id}`
      );
    }
  } catch (err) {
    res.status(400);
    res.send(err);
    return null;
  }
};

//Requires token
const create = async (req: Request, res: Response): Promise<Product> => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const result = await Products.create(product);
    res.send(result);
    return result;
  } catch (err) {
    res.send(err);
    throw new Error(`error happened while creating product: ${err}`);
  }
};
const top5 = async (_req: Request, res: Response): Promise<Product[]> => {
  try {
    const result = await getTop5PopularProducts();
    res.send(result);
    return result;
  } catch (err) {
    throw new Error(`error happened while retrieving last 5 products: ${err}`);
  }
};
const byCategory = async (req: Request, res: Response): Promise<Product[]> => {
  try {
    const result = await getProductByCategory(req.body.category);
    res.send(result);
    return result;
  } catch (err) {
    throw new Error(
      `error happened while filtering products by category: ${err}`
    );
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
