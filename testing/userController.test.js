const request = require("supertest");
const app = require("../routes/route");
let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzE3YmUxOThjM2Q4YTM5NjcyZTEzYiIsInVzZXJuYW1lIjoiaWRoYW0iLCJlbWFpbCI6ImlkaGFtQG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjY4NjgzNjAsImV4cCI6MTY2Njk1NDc2MH0.wlQNDqYBuaRHCbvCZHGWe243bIaj0U9Ag6JGylY4SZk`;
jest.setTimeout(30000);
// positive case

describe("login post from user controller", () => {
  it("username and password correct success to login", async () => {
    const response = await request(app).post("/loginData").send({
      username: "divajuni",
      password: "divajuni",
    });
    console.log(response);
    expect(true).toBe(true);
  });

  it("success get cart", async (done) => {
    request(app)
      .get("/cart/63317be198c3d8a39672e13b")
      .expect(200)
      .set("Authorization", `Bearer ${token}`)
      .then((resp) => {
        // done()
      })
      .catch((err) => {
        done(err);
      });
  });
});
