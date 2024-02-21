import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./Slice";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { PostApi } from "../services/Post";
import { chartSlice } from "./chartSlice";
import { localSlice } from "./localSlice";

export const store = configureStore({
  reducer: {
    [PostApi.reducerPath]: PostApi.reducer,
    user: userSlice.reducer,
    charts: chartSlice.reducer,
    local: localSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PostApi.middleware),
});

setupListeners(store.dispatch);
