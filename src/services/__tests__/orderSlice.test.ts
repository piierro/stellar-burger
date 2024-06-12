import { expect, test, describe } from '@jest/globals';
import ordersReducer, { getOrders, initialState } from '../slices/ordersSlice';

describe('orderSlice', () => {
  test('отображение заказов', () => {
    const ordersData = [
      {
        _id: 'order1',
        status: 'completed',
        name: 'Order 1',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        number: 1,
        ingredients: ['1', '2']
      }
    ];

    const newState = ordersReducer(initialState, {
      type: getOrders.fulfilled.type,
      payload: ordersData
    });
    expect(newState.orders).toEqual(ordersData);
  });
});
