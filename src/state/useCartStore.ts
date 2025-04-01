import { defineStore } from "pinia";

interface CartItem {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
}

export const useCartStore = defineStore("cart", {
  state: () => ({ items: [] as CartItem[] }),
  getters: {
    getSubtotal(state): number {
      return state.items.reduce((acc, item) => acc + item.price, 0);
    }
  },
  actions: {
    addToCart(item: CartItem) {
      this.items = [...this.items, item];
    },
    removeFromCart(id: string) {
      const newItems = [...this.items];

      const index = newItems.findIndex((item) => item.id === id);

      if (index != -1) {
        newItems.splice(index, 1);
      } else {
        console.warn(`Item with id ${id} not found in cart!`);
      }

      this.items = newItems;
    }
  }
});
