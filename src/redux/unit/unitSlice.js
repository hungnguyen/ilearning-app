import { createSlice } from "@reduxjs/toolkit";
import * as asyncThunk from "./unitAsyncThunk";

export const initUnit = {
  name: "",
};

const initialState = {
  list: [],
  item: initUnit,
  loading: false,
};

export const unitSlice = createSlice({
  name: "unit",
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
          (a, b) => new Date(b.createdate) - new Date(a.createdate)
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

export const { select, unselect } = unitSlice.actions;

export const unitSelector = (state) => state.unit;

export default unitSlice.reducer;
