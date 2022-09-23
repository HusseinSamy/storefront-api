import { ProductModel, Product } from "../models/products";

describe("Products model", () => {
    const product = new ProductModel();
    it("Create 15 products in the products table", async () => {
      const products: Product[] = [];
      for (let i = 1; i <= 15; i++) {
        const newProduct: Product = {
          id: i,
          name: `Product-${i}`,
          price: i,
          category: "test",
        };
        const response = await product.create(newProduct);
        products.push(response);
      }
      expect(products.length).toEqual(15);
    });
    it("Returns products from products table", async () => {
      const response = await product.index();
      expect(response.length).toBeGreaterThan(1);
    });
    it("Returns certain product from products table", async () => {
      const response = await product.show(2);
      expect(response).toBeTruthy;
    });
  });