const Recipe = require('../models/Recipe');

describe('Recipe Model Unit Test', () => {
  it('should create a recipe object with correct fields', () => {
    const data = {
      title: 'Unit Test Pasta',
      ingredients: ['cheese', 'sauce'],
      instructions: 'Mix and cook'
    };

    const recipe = new Recipe(data);

    expect(recipe.title).toBe('Unit Test Pasta');
    expect(recipe.ingredients).toContain('sauce');
    expect(recipe.instructions).toMatch(/Mix/);
  });

  it('should throw error if required fields are missing', () => {
    const invalidData = {};

    const recipe = new Recipe(invalidData);
    const validationError = recipe.validateSync();

    expect(validationError.errors.title).toBeDefined();
    expect(validationError.errors.instructions).toBeDefined();
  });
});
