import { expect, test, describe } from '@jest/globals';
import feedReducer, {
  fetchOrders,
  initialState
} from '../slices/feedInfoSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('fetchOrders async thunk', () => {
  test('отображение ленты (fulfilled)', async () => {
    const orderData = {
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'name',
          createdAt: 'createdAt',
          updatedAt: 'updatedAt',
          number: 2,
          ingredients: [1, 2, 3]
        }
      ],
      total: 100,
      totalToday: 10
    };

    const store = configureStore({
      reducer: {
        feed: feedReducer
      }
    });

    await store.dispatch(fetchOrders());

    const state = feedReducer(initialState, {
      type: fetchOrders.fulfilled.type,
      payload: orderData
    });

    expect(state.orders).toEqual(orderData.orders);
    expect(state.total).toBe(orderData.total);
    expect(state.totalToday).toBe(orderData.totalToday);
  });
});

// describe('fetchOrders async thunk', () => {
//   test('отображение ленты (fulfilled)', async () => {
//     const orderData = {
//       orders: [
//         {
//           _id: '1',
//           status: 'done',
//           name: 'name',
//           createdAt: 'createdAt',
//           updatedAt: 'updatedAt',
//           number: 2,
//           ingredients: [1, 2, 3]
//         }
//       ],
//       total: 100,
//       totalToday: 10
//     };

//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         json: () => Promise.resolve(orderData)
//       })
//     ) as jest.Mock;

//     const store = configureStore({
//       reducer: {
//         feed: feedReducer
//       }
//     });

//     await store.dispatch(fetchOrders());

//     const state = store.getState().feed;

//     expect(state.orders).toEqual(orderData.orders);
//     expect(state.total).toBe(orderData.total);
//     expect(state.totalToday).toBe(orderData.totalToday);
//   });
// });
