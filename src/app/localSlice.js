// localSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const localSlice = createSlice({
  name: "local",
  initialState: {
    token: localStorage.getItem("ecoAdmintoken") || null,
    modules: localStorage.getItem("adminModules") || null,
    loginType: localStorage.getItem("loginType") || null,
    ecomadminloginId: localStorage.getItem("ecomadminloginId") || null,
    emailauthecomadmin: localStorage.getItem("emailauthecomadmin") || null,
    productId: localStorage.getItem("productId") || null,
    header: null,
    page: null,
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
    setProductId: (state, action) => {
      state.productId = action.payload;
      localStorage.setItem("productId", action.payload);
    },
    setEmailauthecomadmin: (state, action) => {
      state.emailauthecomadmin = action.payload;
      localStorage.setItem("emailauthecomadmin", action.payload);
    },
    setHeader: (state, action) => {
      state.header = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {
  setToken,
  setModules,
  setLoginType,
  setEcomLoginId,
  setEmailauthecomadmin,
  setHeader,
  setProductId,
  setPage,
} = localSlice.actions;
export default localSlice.reducer;
