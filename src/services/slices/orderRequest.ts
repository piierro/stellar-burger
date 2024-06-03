import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export const placeOrderRequest = createAsyncThunk(
  'order/placeOrderRequest',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

type TOrderRequestState = {
  orderRequest: boolean;
  order: TOrder | null;
  // name: string;
};

export const initialState: TOrderRequestState = {
  orderRequest: false,
  order: null
  // name: ''
};

const newOrderRequestSlice = createSlice({
  name: 'orderRequest',
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderRequest.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(placeOrderRequest.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(placeOrderRequest.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
        // state.name = action.payload.name;
      });
  }
});

export const { clearOrder } = newOrderRequestSlice.actions;
export default newOrderRequestSlice.reducer;
