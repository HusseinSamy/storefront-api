import { database } from "../database"

export type Order = {
    id?:number
    user_id: number
    status: string
}

export class OrdersModel{
    //Token required
    async show(id: number): Promise<Order[]> {
        const connection = await database.connect();
        const sql = `SELECT * FROM orders WHERE user_id = $1 LIMIT 1`;
        const result = await connection.query(sql,[id]);
        connection.release();
        return result.rows;
    }
    async create(order: Order): Promise<Order> {
        const connection = await database.connect();
        const sql = `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`;
        const result = await connection.query(sql,[order.user_id, order.status]);
        connection.release();
        return result.rows[0];
    }

    async addProduct(orderId: number, productId: number, quantity: number) {
        const connection = await database.connect();
        const sql = `INSERT INTO products_orders ( product_id, order_id, product_quantity) VALUES ($1, $2, $3) RETURNING *`;
        const result = await connection.query(sql,[productId, orderId, quantity]);
        connection.release();
        return result.rows[0];
    }

}