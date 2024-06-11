import { expect, test, describe, jest } from '@jest/globals';
import ingredientsReducer, {
  fetchIngredients,
  initialState
} from '../slices/ingridientsSlice';

const ingredientData = [
  {
    _id: '1',
    name: 'Ingredient 1',
    type: 'main',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 50,
    image: 'image1.png',
    image_large: 'image1_large.png',
    image_mobile: 'image1_mobile.png'
  }
];

describe('тест асинхронных экшенов', () => {
  test('обработка экшена получения ингредиентов (pending)', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('pending')
    );
    expect(state.isIngredientsLoading).toBe(true);
  });

  test('обработка экшена получения ингредиентов (fulfilled)', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(ingredientData, 'fulfilled')
    );
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredientData);
  });
});
