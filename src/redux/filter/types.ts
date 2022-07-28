export enum SortEnum {
    RATING = 'rating',
    PRICE = 'price',
    TITLE = 'title',
  }
  
  export type Sort = {
    name: string;
    sort: SortEnum;
  };
  
  export interface FilterSliceState {
    category: number;
    sort: Sort;
    currentPage: number;
    searchValue: string;
  }