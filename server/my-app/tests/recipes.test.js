const request = require("supertest");
const app = require("../app");

describe("Server smoke tests", () => {
  it("should respond 404 on unknown route", async () => {
    const res = await request(app).get("/__no_such_route__");
    expect(res.status).toBe(404);
  });

  it("should respond on root route", async () => {
    const res = await request(app).get("/");
    // W express-generator zwykle jest 200, ale jakbyś miał redirect, to też ok.
    expect([200, 301, 302]).toContain(res.status);
  });
});
