import { createSlice } from "@reduxjs/toolkit";
import * as asyncThunk from "./itemAsyncThunk";

export const initItem = {
  content: "",
  image: "",
  audio: "",
  unitid: "",
  ordernumber: 1,
};

const initialState = {
  list: [],
  item: initItem,
  loading: false,
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    select: (state, action) => {
      state.item = state.list.find((i) => i._id === action.payload);
    },
    unselect: (state) => {
      state.item = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncThunk.getAllAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncThunk.getAllAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.sort(
          (a, b) => new Date(a.ordernumber) - new Date(b.ordernumber)
        );
      })
      .addCase(asyncThunk.getOneAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncThunk.getOneAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(asyncThunk.createAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncThunk.createAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.concat(action.payload);
      })
      .addCase(asyncThunk.updateAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncThunk.updateAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.map((i) =>
          i._id === action.payload._id ? action.payload : i
        );
      })
      .addCase(asyncThunk.removeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncThunk.removeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((i) => i._id !== action.payload);
      });
  },
});

export const { select, unselect } = itemSlice.actions;

export const itemSelector = (state) => state.item;

export default itemSlice.reducer;
