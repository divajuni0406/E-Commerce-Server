const request = require("supertest");
const router = require("../app.js");
jest.setTimeout(30000);

const mongoose = require("mongoose");
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(
    `mongodb+srv://fsw23c9t1:${process.env.MONGOPASS}@fsw23c9t1.09vmpg5.mongodb.net/?retryWrites=true&w=majority`
  );
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("search by category", () => {
  // success
  it("should success to search products by category if user choose any category and products available", async () => {
    const response = await request(router).get("/api/productCategory").send({
      category: "baju",
    });
    console.log(response._body.result.length, "alllllllllllllllllllllllllll");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response._body.result.length).toBeGreaterThan(0);
  });

  // wrong
  it("should no products available to search by category if there is something wrong from user or developer", async () => {
    const response = await request(router).get("/api/productCategory").send({
      category: "/",
    });
    console.log(response._body, "alllllllllllllllllllllllllll");
    expect(response.statusCode).toBe(404);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });
});

describe("search products", () => {
  // success
  it("should success to search products if user type any words and products available", async () => {
    const response = await request(router).post("/api/searchProduct").send({
      search: "baju",
    });
    console.log(response._body.result.length, "alllllllllllllllllllllllllll");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response._body.result.length).toBeGreaterThan(0);
  });

  // wrong
  it("should be no product available to search if there is something wrong from user or developer", async () => {
    const response = await request(router).post("/api/searchProduct").send({
      search: "//",
    });
    console.log(response._body, "alllllllllllllllllllllllllll");
    expect(response.statusCode).toBe(404);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  it("should error to search by category if there is something wrong else", async () => {
    const response = await request(router).post("/api/searchProduct").send({});
    console.log(response._body, "alllllllllllllllllllllllllll");
    expect(response.statusCode).toBe(400);
  });
});
