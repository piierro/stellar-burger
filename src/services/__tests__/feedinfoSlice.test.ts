import { expect, test, describe } from '@jest/globals';
import feedReducer, {
  fetchOrders,
  initialState
} from '../slices/feedInfoSlice';

describe('feedinfoSlice', () => {
  const orderData = {
    orders: [
      {
        _id: 'order1',
        status: 'completed',
        name: 'Order 1',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        number: 1,
        ingredients: []
      }
    ],
    success: true,
    total: 100,
    totalToday: 5151
  };

  test('отображение ленты (fulfilled)', () => {
    const state = feedReducer(
      initialState,
      fetchOrders.fulfilled(orderData, 'fulfilled')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.orders).toEqual(orderData.orders);
    expect(state.total).toEqual(orderData.total);
    expect(state.totalToday).toEqual(orderData.totalToday);
  });

  test('отображение ленты (pending)', () => {
    const state = feedReducer(initialState, fetchOrders.pending('pending'));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);

    expect(state.orders).toEqual([]);
    expect(state.total).toEqual(0);
    expect(state.totalToday).toEqual(0);
  });

  test('отображение ленты (rejected)', () => {
    const error = new Error('Fetch error');
    const state = feedReducer(
      initialState,
      fetchOrders.rejected(error, 'rejected')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error.message);

    expect(state.orders).toEqual([]);
    expect(state.total).toEqual(0);
    expect(state.totalToday).toEqual(0);
  });
});
