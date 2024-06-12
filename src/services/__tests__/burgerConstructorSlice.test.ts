import { expect, test, describe } from '@jest/globals';
import burgerConstructorReducer, {
  initialState,
  addItem,
  removeIngredient,
  clearConstructor,
  moveConstructorItem
} from '../slices/burgerConstructorSlice';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid')
}));

const mockIngridient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  id: '1'
};

const mockBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  __v: 0
};

describe('burgerConstructorSlice', () => {
  test('добавление ингридиентов addItem', () => {
    const newState = burgerConstructorReducer(
      initialState,
      addItem(mockIngridient)
    );
    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0]).toEqual({
      ...mockIngridient,
      id: 'test-uuid'
    });
  });

  test('добавление булки addItem', () => {
    const newState = burgerConstructorReducer(initialState, addItem(mockBun));
    expect(newState.bun).toEqual({ ...mockBun, id: 'test-uuid' });
  });

  test('удаление ингридиента removeIngredient', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [{ ...mockIngridient, id: 'test-uuid' }]
    };
    const newState = burgerConstructorReducer(
      stateWithIngredient,
      removeIngredient({ id: 'test-uuid' })
    );
    expect(newState.ingredients).toHaveLength(0);
  });

  test('очистка конструктора clearConstructor', () => {
    const stateWithData = {
      bun: { ...mockBun, id: 'test-uuid' },
      ingredients: [{ ...mockIngridient, id: 'test-uuid' }]
    };
    const newState = burgerConstructorReducer(
      stateWithData,
      clearConstructor()
    );
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});

// describe('moveConstructorItem', () => {
//   it('should move the item up when the index is greater than 0', () => {
//    ([
//       {
//         _id: '1',
//         name: 'Ingredient 1',
//         type: 'main',
//         proteins: 1,
//         fat: 1,
//         carbohydrates: 1,
//         calories: 1,
//         price: 1,
//         image: '',
//         image_mobile: '',
//         image_large: ''
//       },
//       {
//         _id: '2',
//         name: 'Ingredient 2',
//         type: 'main',
//         proteins: 1,
//         fat: 1,
//         carbohydrates: 1,
//         calories: 1,
//         price: 1,
//         image: '',
//         image_mobile: '',
//         image_large: ''
//       }
//     ]);
//     const action = { payload: 0, newPayload: 1 }; // Индекс 1 соответствует элементу 'Ingredient 2'

//     moveConstructorItem(state, action);

//     expect(state.ingredients).toEqual([
//       {
//         _id: '2',
//         name: 'Ingredient 2',
//         type: 'main',
//         proteins: 1,
//         fat: 1,
//         carbohydrates: 1,
//         calories: 1,
//         price: 1,
//         image: '',
//         image_mobile: '',
//         image_large: ''
//       },
//       {
//         _id: '1',
//         name: 'Ingredient 1',
//         type: 'main',
//         proteins: 1,
//         fat: 1,
//         carbohydrates: 1,
//         calories: 1,
//         price: 1,
//         image: '',
//         image_mobile: '',
//         image_large: ''
//       }
//     ]);
//   });
// })
