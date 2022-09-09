import { database } from "../database"

export interface IOrder{
    id?:number
    product_id: number,
    product_quantity: number,
    user_id: number
    status: string
}

export class OrdersModel{
    //Token required
    async show(id: number): Promise<IOrder[]> {
        const connection = await database.connect();
        const sql = `SELECT * FROM orders WHERE id = $1`;
        const result = await connection.query(sql,[id]);
        connection.release();
        return result.rows;
    }

}