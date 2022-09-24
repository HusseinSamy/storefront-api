import app from "../server";
import supertest from "supertest";

const request = supertest(app);

describe("API endpoint tests suite", () => {
  let token: string = "";
  //Creates user and store the token sent back
  beforeAll(async () => {
    const response = await request
      .post("/users")
      .set("content-type", "application/json")
      .send({
        firstName: "test",
        lastName: "user",
        password: "test",
      });
    token = `token=${response.text}`;
    expect(response.status).toBe(200);
  });

  describe("200 OK tests for /users", () => {
    it("GET /users", async () => {
      const response = await request.get("/users").set("Cookie", token);
      expect(response.status).toBe(200);
    });

    it("GET /users/1", async () => {
      const response = await request.get("/users/1").set("Cookie", token);
      expect(response.status).toBe(200);
    });
  });

  describe("200 OK tests for /products", () => {
    it("POST /products", async () => {
      const response = await request
        .post("/products")
        .set("content-type", "application/json")
        .set("Cookie", token)
        .send({ name: "test", price: 299, category: "test" });
      expect(response.status).toBe(200);
    });

    it("GET /products", async () => {
      const response = await request.get("/products");
      expect(response.status).toBe(200);
    });

    it("GET /products/1", async () => {
      const response = await request.get("/products/1").set("Cookie", token);
      expect(response.status).toBe(200);
    });

    it("GET /products/productByCategory", async () => {
      const response = await request
        .get("/products/productByCategory")
        .send({ category: "completed" });
      expect(response.status).toBe(200);
    });

    it("GET /products/top5", async () => {
      const response = await request.get("/products/top5");
      expect(response.status).toBe(200);
    });
  });

  describe("200 OK tests for /orders", () => {
    it("POST /orders", async () => {
      const response = await request
        .post("/orders")
        .set("content-type", "application/json")
        .set("Cookie", token)
        .send({ status: "completed" });
      expect(response.status).toBe(200);
    });

    it("GET /orders/2", async () => {
      const response = await request.get("/orders/2").set("Cookie", token);
      expect(response.status).toBe(200);
    });

    it("POST /orders/1/products", async () => {
      const response = await request
        .post("/orders/2/products")
        .set("Cookie", token)
        .send({ product: 1, quantity: 10 });
      expect(response.status).toBe(200);
    });

    it("GET /orders/completedOrdersByUser/1", async () => {
      const response = await request
        .get("/orders/completedOrdersByUser/1")
        .set("Cookie", token);
      expect(response.status).toBe(200);
    });
  });
});
