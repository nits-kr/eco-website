import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
  offerList: [],
  productName: "",
  productName2: "",
  title: "",
  title2: "",
  title3: "",
  startDate: "",
  endDate: "",
  code: "",
  code2: "",
  discount: "",
  discount2: "",
  itemId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});
console.log("Slice", userSlice?.actions);
export const { increment, decrement, incrementByAmount } = userSlice.actions;
export default userSlice.reducer;
