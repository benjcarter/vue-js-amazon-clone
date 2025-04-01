<script setup lang="ts">
import { formatPrice } from "@/lib/utils";
import { useGetState } from "@/state/useGetState";
import { storeToRefs } from "pinia";

const state = useGetState();
const { cart } = storeToRefs(state);
</script>

<template>
  <div
    class="flex w-75 flex-col justify-between rounded-sm border border-[#ddd] bg-[#f3f3f3] p-5"
  >
    <p>
      Subtotal ({{ cart.length }} items):
      <strong>{{ formatPrice(state.getCartSubtotal) }}</strong>
    </p>

    <button class="mt-2.5 w-full rounded-lg bg-yellow-500 py-2 font-medium">
      Proceed to Checkout
    </button>
  </div>
</template>
