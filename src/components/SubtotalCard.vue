<script setup lang="ts">
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/state/useCartStore";
import { storeToRefs } from "pinia";

const cart = useCartStore();
const { items } = storeToRefs(cart);
</script>

<template>
  <div
    class="flex w-75 flex-col justify-between rounded-sm border border-[#ddd] bg-[#f3f3f3] p-5"
  >
    <p>
      Subtotal ({{ items.length }} items):
      <strong>{{ formatPrice(cart.getSubtotal) }}</strong>
    </p>

    <button class="mt-2.5 w-full rounded-lg bg-yellow-500 py-2">
      Proceed to Checkout
    </button>
  </div>
</template>
