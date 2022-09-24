import { OrdersModel, Order } from "../models/orders";

describe("Orders model", () => {
  const order = new OrdersModel();
  it("Create 15 orders in the orders table", async () => {
    const orders: Order[] = [];
    for (let i = 1; i <= 15; i++) {
      const newOrder: Order = {
        user_id: 1,
        status: "completed",
      };
      const response = await order.create(newOrder);
      orders.push(response);
    }
    expect(orders.length).toEqual(15);
  });
  it("Returns orders from orders table", async () => {
    const response = await order.show(1);
    expect(response.length).toBeGreaterThan(0);
  });
  it("Adds product to the product_order table", async () => {
    const response = await order.addProduct(1, 1, 12);
    expect(response).toBeTruthy;
  });
});
