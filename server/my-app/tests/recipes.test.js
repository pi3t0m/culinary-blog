const request = require("supertest");
const app = require("../app");

describe("Server smoke tests", () => {
  it("should respond 404 on unknown route", async () => {
    const res = await request(app).get("/__no_such_route__");
    expect(res.status).toBe(404);
  });

  it("should have recipes router mounted (route exists, status is not 404)", async () => {
    // To nie testuje DB; tylko sprawdza, że endpoint jest podpięty.
    // Bez MONGO_URI może zwrócić 500, ale ważne że NIE 404.
    const res = await request(app).get("/api/recipes");
    expect(res.status).not.toBe(404);
  });
});
