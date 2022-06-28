import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Sort } from './filterSlice';

export type SearchPizzaParams = {
  categoryId: string;
  searchQuery: string;
  sortParams: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: SearchPizzaParams) => {
    const { categoryId, searchQuery, sortParams, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://628648de96bccbf32d72a35c.mockapi.io/items?&page=${currentPage}&limit=3&category=${categoryId}&search=${searchQuery}&sortBy=${sortParams}&order=asc`,
    );
    return data as PizzaItem[];
  },
);

type PizzaItem = {
  id: string;
  imageUrl: string;
  types: number[];
  title: string;
  sizes: number[];
  price: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  status: Status;
  items: PizzaItem[];
}

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

export const pizzaDataSelector = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
