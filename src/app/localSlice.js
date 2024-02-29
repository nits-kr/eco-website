// localSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const localSlice = createSlice({
  name: "local",
  initialState: {
    token: localStorage.getItem("ecoAdmintoken") || null,
    modules: localStorage.getItem("adminModules") || null,
    loginType: localStorage.getItem("loginType") || null,
    ecomadminloginId: localStorage.getItem("ecomadminloginId") || null,
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
    setLoginType: (state, action) => {
      state.loginType = action.payload;
      localStorage.setItem("loginType", action.payload);
    },
    setEcomLoginId: (state, action) => {
      state.ecomadminloginId = action.payload;
      localStorage.setItem("ecomadminloginId", action.payload);
    },
  },
});

export const { setToken, setModules, setLoginType, setEcomLoginId } =
  localSlice.actions;
export default localSlice.reducer;
