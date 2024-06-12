import { expect, test, describe } from '@jest/globals';
import ingredientsReducer, {
  fetchIngredients,
  initialState
} from '../slices/ingridientsSlice';

describe('ingredients', () => {
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
  test('обработка экшена получения ингредиентов (pending)', async () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('pending')
    );
    expect(state.isIngredientsLoading).toBe(true);
    expect(state.ingredientsError).toBeNull();
  });

  test('обработка экшена получения ингредиентов (fulfilled)', async () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(ingredientData, 'fulfilled')
    );
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredientData);
    expect(state.ingredientsError).toBeNull();
  });

  test('Запрос завершился ошибкой (rejected)', async () => {
    const error = new Error('Fetch error');
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(error, 'rejected')
    );
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredientsError).toBe(error.message);
  });
});
