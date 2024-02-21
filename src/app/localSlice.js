// localSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const localSlice = createSlice({
  name: "local",
  initialState: {
    token: localStorage.getItem("ecoAdmintoken") || null,
    modules: localStorage.getItem("adminModules") || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("ecoAdmintoken", action.payload);
    },
    setModules: (state, action) => {
      state.modules = action.payload;
      localStorage.setItem("adminModules", action.payload);
    },
  },
});

export const { setToken, setModules } = localSlice.actions;
export default localSlice.reducer;
