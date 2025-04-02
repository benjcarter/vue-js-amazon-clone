<script setup lang="ts">
import CartProduct from "@/components/CartProduct.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import { useGetState } from "@/state/useGetState";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

const state = useGetState();
const { user, cart } = storeToRefs(state);
</script>

<template>
  <HeaderBar />
  <div class="bg-white">
    <div class="payment__container">
      <h1
        class="border-b border-gray-300 bg-gray-200 p-2.5 text-center text-3xl font-normal"
      >
        Checkout (<RouterLink to="/cart">{{ cart.length }} items</RouterLink>)
      </h1>

      <div class="mx-5 flex border-b border-gray-300 p-5">
        <div class="flex-1/5">
          <h3 class="font-bold">Delivery Address</h3>
        </div>
        <div class="flex-4/5">
          <p>{{ user?.email }}</p>
          <p>123 Test Ave</p>
          <p>Fredericton, NB</p>
        </div>
      </div>
      <div class="mx-5 flex border-b border-gray-300 p-5">
        <div class="flex-1/5">
          <h3 class="font-bold">Review Items and Delivery</h3>
        </div>
        <div class="flex-4/5">
          <CartProduct
            v-for="item in cart"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :image="item.image"
            :price="item.price"
            :rating="item.rating"
          />
        </div>
      </div>
      <div class="mx-5 flex border-b border-gray-300 p-5">
        <div class="flex-1/5">
          <h3 class="font-bold">Payment Method</h3>
          <div class="payment__details">
            <!-- Stripe Magic -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
