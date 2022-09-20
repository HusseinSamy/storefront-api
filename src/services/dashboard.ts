import { database } from "../database";
import { Order } from "../models/orders";
import { Product } from "../models/products";

export const getTop5PopularProducts = async (): Promise<Product[]> => {
  try {
    const connection = await database.connect();
    const sql = `SELECT * FROM products LIMIT 5`;
    const result = await connection.query(sql);
    connection.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Cannot retrive data from the database: ${err}`);
  }
};
export const getProductByCategory = async (
  category: string
): Promise<Product[]> => {
  try {
    const connection = await database.connect();
    const sql = `SELECT * FROM products WHERE category = $1`;
    const result = await connection.query(sql, [category]);
    connection.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Cannot retrive data from the database: ${err}`);
  }
};
//Token required
export const getCompletedOrdersByUser = async (
  user_id: number
): Promise<Order[]> => {
  try {
    const connection = await database.connect();
    const sql = `SELECT * FROM orders WHERE user_id = $1 AND status = 'completed'`;
    const result = await connection.query(sql, [user_id]);
    connection.release();
    return result.rows;
  } catch (err) {
    throw new Error(`Cannot retrive data from the database: ${err}`);
  }
};
