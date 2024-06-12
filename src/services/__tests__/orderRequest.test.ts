import { expect, test, describe, jest } from '@jest/globals';
import ordersReducer, {
  placeOrderRequest,
  initialState,
  clearOrder
} from '../slices/orderRequest';

describe('orderRequest', () => {
  const ordersData: string[] = ['1', '2'];

  test('handles placeOrderRequest.pending', () => {
    const nextState = ordersReducer(
      initialState,
      placeOrderRequest.pending('', ordersData)
    );
    expect(nextState.orderRequest).toEqual(true);
    expect(nextState.order).toEqual(null);
  });

  test('handles placeOrderRequest.rejected', () => {
    const nextState = ordersReducer(
      initialState,
      placeOrderRequest.rejected(null, '', ordersData)
    );
    expect(nextState.orderRequest).toEqual(false);
    expect(nextState.order).toEqual(null);
  });

  test('handles placeOrderRequest.fulfilled', () => {
    const payload = {
      success: true,
      order: { id: '123', items: ['burger', 'fries'] }
    };
    const nextState = ordersReducer(initialState, {
      type: placeOrderRequest.fulfilled.type,
      payload
    });

    expect(nextState.orderRequest).toEqual(false);
    expect(nextState.order).toEqual(payload.order);
  });
});

describe('newOrderRequestSlice reducers', () => {
  test('should handle clearOrder', () => {
    const stateWithOrder = {
      orderRequest: false,
      order: {
        _id: 'order1',
        status: 'completed',
        name: 'Order 1',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        number: 1,
        ingredients: ['1', '2']
      }
    };

    const nextState = ordersReducer(stateWithOrder, clearOrder());

    expect(nextState.order).toEqual(null);
    expect(nextState.orderRequest).toEqual(stateWithOrder.orderRequest);
  });
});
