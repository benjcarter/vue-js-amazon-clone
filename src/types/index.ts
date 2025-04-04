export type CartItem = {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: number;
};
