<script setup lang="ts">
import type { Order } from "@/types";
import { useDateFormat } from "@vueuse/core";
import CartProduct from "@/components/CartProduct.vue";
import { formatPrice } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
}

defineProps<OrderCardProps>();
</script>

<template>
  <div class="relative my-5 border border-gray-300 bg-white p-10">
    <h4 class="text-2xl font-semibold">Order</h4>
    <p class="font-medium text-gray-800">
      {{
        useDateFormat(new Date(order.createdAt * 1000), "MMMM Do, YYYY, h:mma")
      }}
    </p>

    <p class="absolute top-10 right-5">
      <small>{{ order.id }}</small>
    </p>

    <CartProduct
      v-for="item in order.items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :image="item.image"
      :price="item.price"
      :rating="item.rating"
      :hide-remove-button="true"
    />

    <h3 class="text-right text-lg font-medium">
      Order Total: {{ formatPrice(order.total / 100) }}
    </h3>
  </div>
</template>
