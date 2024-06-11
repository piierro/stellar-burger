import { expect, test, describe, jest } from '@jest/globals';
import ordersReducer, {
  placeOrderRequest,
  initialState
} from '../slices/orderRequest';
import { configureStore } from '@reduxjs/toolkit';

describe('placeOrderRequest async thunk', () => {
  beforeEach(() => {
    const store = configureStore({
      reducer: { orders: ordersReducer }
    });
  });

  test('should handle placeOrderRequest with resolved response', async () => {});
});
