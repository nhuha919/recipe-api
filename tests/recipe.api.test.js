const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../index');
const Recipe = require('../models/Recipe');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await Recipe.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Recipe API', () => {
  it('POST /recipes - should create a recipe', async () => {
    const res = await request(app).post('/recipes').send({
      title: 'Pizza',
      ingredients: ['cheese', 'sauce'],
      instructions: 'Bake it'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Pizza');
  });

  it('GET /recipes - should return all recipes', async () => {
    await Recipe.create({ title: 'Salad', ingredients: ['lettuce'], instructions: 'Mix it' });

    const res = await request(app).get('/recipes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('DELETE /recipes/:id - should delete a recipe', async () => {
    const recipe = await Recipe.create({ title: 'Soup', ingredients: [], instructions: 'Boil it' });

    const res = await request(app).delete(`/recipes/${recipe._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Recipe deleted');
  });
});
