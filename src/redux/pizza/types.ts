export type SearchPizzaParams = {
    categoryId: string;
    searchQuery: string;
    sortParams: string;
    currentPage: string;
  };

  
export type PizzaItem = {
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
  
  export interface PizzaSliceState {
    status: Status;
    items: PizzaItem[];
  }