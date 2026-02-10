// tests/recipes.test.js
const request = require('supertest');
const app = require('../server/my-app/app'); // Import aplikacji Express

describe('Recipes API', () => {
  let recipeId;

  // Test POST: Dodawanie nowego przepisu
  it('should create a new recipe', async () => {
    const newRecipe = {
      title: 'Test Recipe',
      description: 'Test recipe description',
      ingredients: ['ingredient 1', 'ingredient 2'],
      steps: ['step 1', 'step 2']
    };

    const response = await request(app)
      .post('/api/recipes')
      .send(newRecipe);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newRecipe.title);
    expect(response.body.description).toBe(newRecipe.description);

    // Zapamiętanie ID przepisu do późniejszych testów
    recipeId = response.body._id;
  });

  // Test GET: Pobieranie wszystkich przepisów
  it('should get all recipes', async () => {
    const response = await request(app).get('/api/recipes');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET: Pobieranie pojedynczego przepisu
  it('should get a single recipe by ID', async () => {
    const response = await request(app).get(`/api/recipes/${recipeId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(recipeId);
    expect(response.body.title).toBe('Test Recipe');
  });

  // Test PUT: Aktualizowanie przepisu
  it('should update a recipe', async () => {
    const updatedRecipe = {
      title: 'Updated Recipe',
      description: 'Updated description',
      ingredients: ['ingredient 1', 'ingredient 2', 'ingredient 3'],
      steps: ['step 1', 'step 2', 'step 3']
    };

    const response = await request(app)
      .put(`/api/recipes/${recipeId}`)
      .send(updatedRecipe);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedRecipe.title);
  });

  // Test DELETE: Usuwanie przepisu
  it('should delete a recipe', async () => {
    const response = await request(app).delete(`/api/recipes/${recipeId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Recipe deleted successfully');
  });
});
