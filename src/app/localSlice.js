// localSlice.js
import { createSlice } from "@reduxjs/toolkit";

const localSlice = createSlice({
  name: "local",
  initialState: {
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
});

export const { setToken } = localSlice.actions;
export default localSlice.reducer;
