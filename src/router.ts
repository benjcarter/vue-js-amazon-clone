import { createWebHistory, createRouter, type Router } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import CartView from "@/views/CartView.vue";
import AuthView from "@/views/AuthView.vue";

export const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/cart", component: CartView },
    { path: "/login", component: AuthView }
  ]
});
