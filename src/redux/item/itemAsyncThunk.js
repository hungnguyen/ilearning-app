import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./itemService";

export const getAllAsync = createAsyncThunk("item/getAll", async () => {
  return await service.getAll();
});

export const getOneAsync = createAsyncThunk("item/getOne", async (id) => {
  return await service.getOne(id);
});

export const createAsync = createAsyncThunk("item/create", async (data) => {
  return await service.create(data);
});

export const updateAsync = createAsyncThunk("item/update", async (data) => {
  await service.update(data);
  return data;
});

export const removeAsync = createAsyncThunk("item/remove", async (id) => {
  await service.remove(id);
  return id;
});
