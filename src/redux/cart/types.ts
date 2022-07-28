export type CartItemType = {
    title: string;
    id: string;
    imageUrl: string;
    type: string;
    size: number;
    price: number;
    count: number;
  };
  
  export interface CartSliceState {
    totalPrice: number;
    items: CartItemType[];
  }