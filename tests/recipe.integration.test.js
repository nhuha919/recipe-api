const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
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

describe('Recipe Model Integration Test', () => {
  it('should save and fetch a recipe from MongoDB', async () => {
    const recipe = new Recipe({
      title: 'Integration Test Soup',
      ingredients: ['water', 'salt'],
      instructions: 'Boil it'
    });

    await recipe.save();

    const found = await Recipe.findOne({ title: 'Integration Test Soup' });

    expect(found).not.toBeNull();
    expect(found.ingredients).toContain('salt');
  });
});
