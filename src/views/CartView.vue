<script setup lang="ts">
import CartProduct from "@/components/CartProduct.vue";
import SubtotalCard from "@/components/SubtotalCard.vue";
import { useCartStore } from "@/state/useCartStore";
import { storeToRefs } from "pinia";

const cart = useCartStore();
const { items } = storeToRefs(cart);
</script>

<template>
  <div class="flex h-max bg-white p-5">
    <div class="checkout__left">
      <!-- Ad Banner -->
      <img
        loading="lazy"
        src="/src/assets/cart_ad.jpg"
        alt=""
        class="mb-2.5 w-full"
      />

      <div>
        <h2
          class="mr-2.5 border-b border-gray-300 p-2.5 pl-0 text-3xl font-bold"
        >
          Shopping Cart
        </h2>

        <!-- Product List -->
        <CartProduct
          v-for="item in items"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :price="item.price"
          :image="item.image"
          :rating="item.rating"
        />
      </div>
    </div>

    <!-- Subtotal Card -->
    <div class="checkout__right">
      <SubtotalCard />
    </div>
  </div>
</template>
