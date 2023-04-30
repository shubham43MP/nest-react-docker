import { configureStore } from "@reduxjs/toolkit";

import bidItemReducer from "./slices/bidItems.slice";
import userReducer from "./slices/user.slice";
export const store = configureStore({
  reducer: {
    bidItems: bidItemReducer,
    user: userReducer
  },
});
