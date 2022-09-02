export interface IOrder{
    id:number
    product_id: number,
    product_quantity: number,
    user_id: number
    status: string
}

export class OrderModel{
    async show(id: number) {}

}