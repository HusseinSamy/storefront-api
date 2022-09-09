import { database } from "../database";

export const getTop5PopularProducts = async()=> {

    try{
    const connection = await database.connect();
    const sql = `SELECT * FROM products LIMIT 5`;
    const result = await connection.query(sql);
    connection.release();
    return result.rows;
    }
    catch(err) {
        throw new Error(`Cannot retrive data from the database: ${err}`);
    }
}
export const  getProductByCategory = async(category: string)=> {}
//Token required
export const getCompletedOrdersByUser = (user_id: number)=> {}