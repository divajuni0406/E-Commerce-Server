const request = require("supertest");
const router = require("../app.js");
jest.setTimeout(30000);
const tokenAdmin =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzE1YTgwZGI0ZmFjNjJkNjA2NzA5YyIsInVzZXJuYW1lIjoiZGl2YWp1bmkiLCJlbWFpbCI6ImRpdmFqdW5pIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY3NjI2MTE0LCJleHAiOjE2Njc3MTI1MTR9.soHfgcL2rgRR1FtSzhFfndZgkQmXh4FCGwGYLDcLotI";
const tokenUser =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjVmMzFjM2EwZDYzZjgxYzMyY2U1ZSIsInVzZXJuYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY2NzYyNTc3MSwiZXhwIjoxNjY3NzEyMTcxfQ.fSBWyya_8MKNOiHrx5TQHlwO0YwvcEUxHL3yB05-TKQ";

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

describe("sign up", () => {
  // success
  it("should success to user profile if all fields be filled and the format is correct by user", async () => {
    const response = await request(router).post("/api/user/signup").send({
      username: "jest",
      email: "jest@gmail.com",
      password: "jest",
      name: "jest",
      birthdate: "08/08/2001",
    });
    console.log(
      "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      response._body.newUser,
      "alllllllllllllllllllllllllll"
    );
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response._body.newUser.username).toBeDefined();
    expect(response._body.newUser.email).toBeDefined();
    expect(response._body.newUser.role).toBeDefined();
    expect(response._body.newUser.name).toBeDefined();
    expect(response._body.newUser.birthdate).toBeDefined();
  });

  it("should failed to create user profile if there are any fields are blank or empty", async () => {
    const response = await request(router).post("/api/user/signup").send({
      username: "",
      email: "jest",
      password: "jest",
      name: "jest",
      birthdate: "08",
    });
    console.log(
      "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      response._body,
      "alllllllllllllllllllllllllll"
    );
    expect(response.statusCode).toBe(400);
    expect(response._body.status).toBe("fail");
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });
});

describe("get users", () => {
  // success
  it("should success get users if nothing wrong from server or wrong api address", async () => {
    const response = await request(router)
      .get("/api/user")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    console.log(
      "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      response._body,
      "alllllllllllllllllllllllllll"
    );
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
  });

  it("should failed to get users if bearer token is not sent to server from client or null", async () => {
    const response = await request(router)
      .get("/api/user")
      .set("Authorization", `Bearer`);
    console.log(
      "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      response.statusCode,
      "alllllllllllllllllllllllllll"
    );
    expect(response.statusCode).toBe(302);
    expect(response.headers["content-type"]).toBe("text/plain; charset=utf-8");
  });

  it("should failed to get users if bearer token of jwt role is not admin", async () => {
    const response = await request(router)
      .get("/api/user")
      .set("Authorization", `Bearer ${tokenUser}`);
    console.log(
      "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      response.statusCode,
      "alllllllllllllllllllllllllll"
    );
    expect(response.statusCode).toBe(302);
    expect(response.headers["content-type"]).toBe("text/plain; charset=utf-8");
  });
});

describe("delete users", () => {
  // success
  it("should success to delete user if user can be found", async () => {
    const response = await request(router)
      .delete("/api/user/633169c5f8a9665c4dc3cbd1")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    console.log(
      "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      response.statusCode,
      "alllllllllllllllllllllllllll"
    );
    if (response.statusCode === 204) {
      expect(response.statusCode).toBe(204);
    } else {
      expect(response.statusCode).toBe(400);
    }
  });

  it("should failed to delete user if bearer token is not sent to server from client or null", async () => {
    const response = await request(router)
      .delete("/api/user/633169c5f8a9665c4dc3cbd1")
      .set("Authorization", `Bearer`);
    console.log(
      "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      response.statusCode,
      "alllllllllllllllllllllllllll"
    );
    expect(response.statusCode).toBe(302);
  });

  it("should failed to delete user if bearer token of jwt role is not admin", async () => {
    const response = await request(router)
      .get("/api/user")
      .set("Authorization", `Bearer ${tokenUser}`);
    console.log(
      "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
      response.statusCode,
      "alllllllllllllllllllllllllll"
    );
    expect(response.statusCode).toBe(302);
  });
});
