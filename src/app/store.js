import { configureStore } from "@reduxjs/toolkit";
import unitReducer from "../redux/unit/unitSlice";
import itemReducer from "../redux/item/itemSlice";
import accountReducer from "../redux/account/accountSlice";

export const store = configureStore({
  reducer: {
    unit: unitReducer,
    item: itemReducer,
    account: accountReducer,
  },
});
