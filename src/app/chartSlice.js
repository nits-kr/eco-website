import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  charts: [],
};

export const chartSlice = createSlice({
  initialState,
  name: "charts",
  reducers: {
    getAllData(state, action) {
      //   state.charts.push(action.payload);
      state.charts = action.payload;
    },
  },
});

export const { getAllData } = chartSlice.actions;
export default chartSlice.reducer;
