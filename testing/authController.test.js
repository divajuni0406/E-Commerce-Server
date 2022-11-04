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
