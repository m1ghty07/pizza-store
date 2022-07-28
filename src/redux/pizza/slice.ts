import { createSlice } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncAction";
import { PizzaSliceState, Status } from "./types";

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
  };
  
  const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
      setItems(state, action) {
        state.items = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state, action) => {
        state.status = Status.LOADING;
        state.items = [];
      });
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      });
      builder.addCase(fetchPizzas.rejected, (state, action) => {
        state.items = [];
        state.status = Status.ERROR;
      });
    },
  });

  export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
