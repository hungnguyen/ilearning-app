import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./unitService";

export const getAllAsync = createAsyncThunk("unit/getAll", async () => {
  return await service.getAll();
});

export const getOneAsync = createAsyncThunk("unit/getOne", async (id) => {
  return await service.getOne(id);
});

export const createAsync = createAsyncThunk("unit/create", async (data) => {
  return await service.create(data);
});

export const updateAsync = createAsyncThunk("unit/update", async (data) => {
  await service.update(data);
  return data;
});

export const removeAsync = createAsyncThunk("unit/remove", async (id) => {
  await service.remove(id);
  return id;
});
