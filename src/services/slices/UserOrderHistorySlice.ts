import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrderHistoryState = {
  orders: TOrder[];
  error: null | string | undefined;
  loading: boolean;
};

const initialState: TOrderHistoryState = {
  orders: [],
  error: null,
  loading: false
};

export const userOrderHistory = createAsyncThunk(
  'user/orderHistory',
  getOrdersApi
);

export const userOrderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userOrderHistory.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(userOrderHistory.fulfilled, (state, action) => {
        (state.orders = action.payload),
          (state.loading = false),
          (state.error = null);
      })
      .addCase(userOrderHistory.rejected, (state, action) => {
        (state.error = action.error.message || 'Error orders history'),
          (state.loading = false);
      });
  },
  selectors: {
    getOrdersHistory: (state) => state.orders,
    getOrdersHistoryLoading: (state) => state.loading,
    getOrdersHistoryErrors: (state) => state.error
  }
});

export default userOrderHistorySlice;
export const {
  getOrdersHistory,
  getOrdersHistoryLoading,
  getOrdersHistoryErrors
} = userOrderHistorySlice.selectors;
