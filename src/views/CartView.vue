<script setup lang="ts">
import CartProduct from "@/components/CartProduct.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import SubtotalCard from "@/components/SubtotalCard.vue";
import { useGetState } from "@/state/useGetState";
import { storeToRefs } from "pinia";

const state = useGetState();
const { cart, user } = storeToRefs(state);
</script>

<template>
  <HeaderBar />
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
        <h3 v-if="user" class="text-xl font-bold">Hello, {{ user.email }}</h3>
        <h2
          class="mr-2.5 border-b border-gray-300 p-2.5 pl-0 text-3xl font-bold"
        >
          Your Shopping Cart
        </h2>

        <!-- Product List -->
        <CartProduct
          v-for="item in cart"
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
    <div>
      <SubtotalCard />
    </div>
  </div>
</template>
