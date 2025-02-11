import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null | undefined;
  orderByNumber: TOrder | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null,
  orderByNumber: null
};

export const getAllFeeds = createAsyncThunk('feed/getAll', getFeedsApi);

export const getOrderByNumber = createAsyncThunk(
  'order/byNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const feedDataSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderByNumber = action.payload.orders[0];
      });
  },
  selectors: {
    getAllOrders: (state) => state.orders,
    getTotalOrders: (state) => state.total,
    getTotalOrdersToday: (state) => state.totalToday,
    getOrderByNum: (state) => state.orderByNumber,
    getFeedLoading: (state) => state.loading,
    getFeedErrors: (state) => state.error
  }
});

export default feedDataSlice;
export const {
  getAllOrders,
  getTotalOrders,
  getTotalOrdersToday,
  getOrderByNum,
  getFeedLoading,
  getFeedErrors
} = feedDataSlice.selectors;
