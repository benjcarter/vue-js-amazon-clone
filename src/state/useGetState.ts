import type { CartItem } from "@/types";
import type { User } from "firebase/auth";
import { defineStore } from "pinia";

export const useGetState = defineStore("cart", {
  state: () => ({ cart: [] as CartItem[], user: null as User | null }),
  getters: {
    getCartSubtotal(state): number {
      return state.cart.reduce((acc, item) => acc + item.price, 0);
    }
  },
  actions: {
    addToCart(item: CartItem) {
      this.cart = [...this.cart, item];
    },
    removeFromCart(id: string) {
      const newCart = [...this.cart];

      const index = newCart.findIndex((item) => item.id === id);

      if (index != -1) {
        newCart.splice(index, 1);
      } else {
        console.warn(`Item with id ${id} not found in cart!`);
      }

      this.cart = newCart;
    },
    emptyCart() {
      this.cart = [];
    },
    setUser(user: User | null) {
      this.user = user;
    }
  }
});
