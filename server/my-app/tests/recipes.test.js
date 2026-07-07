const request = require("supertest");
const app = require("../app");

describe("Recipes API", () => {
  it("should return an empty recipes array", async () => {
    const res = await request(app).get("/api/recipes");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it("should reject invalid recipe data", async () => {
    const res = await request(app)
      .post("/api/recipes")
      .send({
        title: "",
        description: "",
        ingredients: [],
        steps: [],
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });

  it("should create a recipe", async () => {
    const recipeData = {
      title: "Protein pancakes",
      description: "Simple high-protein breakfast.",
      ingredients: ["2 eggs", "50g oats", "100g skyr"],
      steps: ["Blend ingredients", "Fry on low heat"],
      imageUrl: "",
    };

    const res = await request(app)
      .post("/api/recipes")
      .send(recipeData);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(recipeData.title);
    expect(res.body.ingredients).toHaveLength(3);
  });
});