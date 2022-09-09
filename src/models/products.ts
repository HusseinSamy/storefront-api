import { database } from "../database";

export interface IProduct {
    id?: number, 
    name: string,
    price: number,
    category: string
}

export class ProductModel{
    async index (): Promise<IProduct[]> {
        try{
            const connection = await database.connect();
            const sql = `SELECT * FROM products`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch(err) {
            throw new Error(`Cannot retrive data from the database: ${err}`);
        }
    }
    async show (id: number): Promise<IProduct> {
        try{
            const connection = await database.connect();
            const sql = `SELECT * FROM products WHERE id = $1`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch(err) {
            throw new Error(`Cannot retrive data from the database: ${err}`);
        }
    }

    //Requires token
    async create (product: IProduct): Promise<IProduct> {
        try{
            const connection = await database.connect();
            const sql = `INSERT INTO products (name, price, category) VALUES ($1,$2,$3) RETURNING *`;
            const result = await database.query(sql, [product.name, product.price, product.category]);
            connection.release();
            return result.rows[0];
        }
        catch(err) {
            throw new Error(`Cannot post data to the database: ${err}`);
        }
    } 
}

export default ProductModel;