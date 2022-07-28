import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem, SearchPizzaParams } from "./types";

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