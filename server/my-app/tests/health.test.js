const request = require("supertest");
const app = require("../app");

describe("Health API", () => {
  it("should return API health status", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});