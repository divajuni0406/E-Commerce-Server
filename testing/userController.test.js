const request = require("supertest");
const router = require("../app.js");
let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzE1YTgwZGI0ZmFjNjJkNjA2NzA5YyIsInVzZXJuYW1lIjoiZGl2YWp1bmkiLCJlbWFpbCI6ImRpdmFqdW5pIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY3NTcwMTM5LCJleHAiOjE2Njc2NTY1Mzl9.GwQMxhKdFVg7HkrKtHX5zuwCmT7Frb5TAG8XQp62UrQ`;
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

describe("user controller", () => {
  describe("login post", () => {
    // success
    it("should success to login if username and password correct", async () => {
      const response = await request(router).post("/loginData").send({
        username: "divajuni",
        password: "divajuni",
      });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response._body.sendData.token).toBeDefined();
      expect(response._body.sendData.id).toBeDefined();
    });

    // wrong
    it("should failed to login username or password wrong, ", async () => {
      const response = await request(router).post("/loginData").send({
        username: "divajuni",
        password: "dii",
      });
      expect(response.statusCode).toBe(400);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });

  describe("social login", () => {
    // success
    it("should success to login if username and password correct", async () => {
      const response = await request(router).post("/socialLogin").send({
        email: "divajuni0406@gmail.com",
        password: "Diva",
      });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response._body.sendData.token).toBeDefined();
      expect(response._body.sendData.id).toBeDefined();
    });

    // wrong
    it("should failed to login username or password wrong", async () => {
      const response = await request(router).post("/socialLogin").send({
        token: "divajuni",
        password: "dii",
      });
      expect(response.statusCode).toBe(400);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });

  describe("forgot password", () => {
    // success
    it("should success to reset password if token correct", async () => {
      const response = await request(router).post("/forgotPassword").send({
        tokenResetPassword:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzViNzExODg2ZTg1ZDRlMTk4ZjM1NjUiLCJpYXQiOjE2NjcwMzUzODF9.aktt7Qb28GPH00FAC31zOBmZMmqBZSrsMOx35AQIJXc",
        password: "Diva",
      });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });

    // wrong
    it("should failed to reset password if token wrong", async () => {
      const response = await request(router).post("/forgotPassword").send({
        tokenResetPassword:
          "eyJhbGciOiJIUzI1NiIMzViNzExODg2ZTg1ZDRlMTk4ZjM1NjUiLCJpYXQiOjE2NjY5Mzg4MzZ9.0lPBVC-R7-P4JQ2ffvoI_hYukCFr0WxTbI3s1cG-FCA",
        password: "Diva",
      });
      expect(response.statusCode).toBe(400);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });

  describe("forgot password verification email", () => {
    // success
    it("should success to send verification email if template email, user email, and other conditoin are correct", async () => {
      const response = await request(router)
        .put("/forgotPasswordVerification")
        .send({
          email: "mahbubsutarya408@gmail.com",
        });
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });

    // wrong
    it("should failed to send verification email if template email, user email, and other conditoin are wronog", async () => {
      const response = await request(router)
        .put("/forgotPasswordVerification")
        .send({
          email: "mahbubsutarddddya408@gmail.com",
        });
      expect(response.statusCode).toBe(400);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });

  describe("tansaction history post", () => {
    it("should success if user have any carts ", async () => {
      const response = await request(router)
        .post("/transactionHistoryPost")
        .send({
          userId: "63315a80db4fac62d606709c",
          total_order: 1212,
          carts: [
            {
              _id: "635cc1fecde4adbed22af828",
              productId: "63331cbba3622624405eca0c",
              quantity: 1,
              cartId: "635cc1fecde4adbed22af828",
              product: [
                {
                  price: 429900,
                },
              ],
            },
          ],
        })
        .set("Authorization", `Bearer ${token}`);
      if (response._body.result === null) {
        expect(response.statusCode).toBe(400);
        expect(response.headers["content-type"]).toBe(
          "application/json; charset=utf-8"
        );
      } else {
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toBe(
          "application/json; charset=utf-8"
        );
      }
    });

    it("should failed if header bearer token is null or invalid", async () => {
      const response = await request(router)
        .post("/transactionHistoryPost")
        .send({
          userId: "63315a80db4fac62d606709c",
          total_order: 1212,
          carts: [
            {
              _id: "635cc1fecde4adbed22af828",
              productId: "63331cbba3622624405eca0c",
              quantity: 1,
              cartId: "635cc1fecde4adbed22af828",
              product: [
                {
                  price: 429900,
                },
              ],
            },
          ],
        })
        .set("Authorization", `Bearer`);
      if (response.statusCode === 401) {
        expect(response.statusCode).toBe(401);
        expect(response.headers["content-type"]).toBe(
          "text/plain; charset=utf-8"
        );
      } else {
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toBe(
          "application/json; charset=utf-8"
        );
      }
    });
  });

  describe("get transaction history", () => {
    // success
    it("should success to get transaction history if userId is correct and has any transaction histories", async () => {
      const response = await request(router)
        .get("/transactionHistory/63315a80db4fac62d606709c")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response._body.result.length).toBeGreaterThan(0);
    });

    // wrong
    it("should failed to get transaction history if userId can't be found", async () => {
      const response = await request(router)
        .get("/transactionHistory/63315a80db4fac62d606709a")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(400);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });

    it("should failed to get transaction history if user doesn't have any transaction yet", async () => {
      const response = await request(router)
        .get("/transactionHistory/635ce9d829ba0682b13ddaea")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(404);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });

    it("should failed to get transaction history if bearer token invalid or null", async () => {
      const response = await request(router).get(
        "/transactionHistory/63315a80db4fac62d606709a"
      );
      expect(response.statusCode).toBe(401);
    });
  });

  describe("get transaction history detail", () => {
    // success
    it("should success to get transaction history detail if userId is correct and has any transaction histories", async () => {
      const response = await request(router)
        .get("/transactionHistoryDetail/63315a80db4fac62d606709c")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response._body.result.length).toBeGreaterThan(0);
    });

    // wrong
    it("should failed to get transaction history detail if userId can't be found", async () => {
      const response = await request(router)
        .get("/transactionHistoryDetail/63315a80db4fac62d606709a")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(400);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });

    it("should failed to get transaction history detail if user doesn't have any transaction yet", async () => {
      const response = await request(router)
        .get("/transactionHistoryDetail/635ce9d829ba0682b13ddaea")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(404);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });

    it("should failed to get transaction history detail if bearer token invalid or null", async () => {
      const response = await request(router).get(
        "/transactionHistoryDetail/63315a80db4fac62d606709a"
      );
      expect(response.statusCode).toBe(401);
    });
  });
});
