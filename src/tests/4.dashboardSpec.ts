import {
  getTop5PopularProducts,
  getProductByCategory,
  getCompletedOrdersByUser,
} from "../services/dashboard";

describe("Dashboard model", () => {
  it("Returns products with test category", async () => {
    const result = await getProductByCategory("test");

    expect(result.length).toBeGreaterThan(0);
  });
  it("Returns top 5 popular products", async () => {
    const result = await getTop5PopularProducts();
    expect(result.length).toBeGreaterThan(0);
  });
  it("Returns completed orders by user 1", async () => {
    const response = await getCompletedOrdersByUser(1);
    expect(response.length).toBeGreaterThan(0);
  });
});
