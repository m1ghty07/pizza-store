import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortEnum } from "./types";

const initialState: FilterSliceState = {
    category: 0,
    sort: {
      name: 'Rating',
      sort: SortEnum.RATING,
    },
    currentPage: 1,
    searchValue: '',
  };
  
  const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
      setCategory(state, action: PayloadAction<number>) {
        state.category = action.payload;
      },
      setSearchValue(state, action: PayloadAction<string>) {
        state.searchValue = action.payload;
      },
      setSort(state, action: PayloadAction<Sort>) {
        state.sort = action.payload;
      },
      setCurrentPage(state, action: PayloadAction<number>) {
        state.currentPage = action.payload;
      },
      setFilters(state, action: PayloadAction<FilterSliceState>) {
        if (Object.keys(action.payload).length) {
          state.currentPage = Number(action.payload.currentPage);
          state.category = Number(action.payload.category);
          state.sort = action.payload.sort;
        } else {
          state.currentPage = 1;
          state.category = 0;
          state.sort = {
            name: 'Rating',
            sort: SortEnum.RATING,
          };
        }
      },
    },
  });

  export const { setCategory, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
