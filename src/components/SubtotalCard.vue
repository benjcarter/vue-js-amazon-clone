<script setup lang="ts">
import { formatPrice } from "@/lib/utils";
import { useGetState } from "@/state/useGetState";
import { storeToRefs } from "pinia";
import axios from "@/axios";
import { ref } from "vue";

const state = useGetState();
const { cart } = storeToRefs(state);

const loading = ref(false);

const handleCheckout = async () => {
  loading.value = true;

  const { data } = await axios.post("/create-checkout-session", {
    items: cart.value
  });

  loading.value = false;

  window.location.href = data.url;
};
</script>

<template>
  <div
    class="flex w-75 flex-col justify-between rounded-sm border border-[#ddd] bg-[#f3f3f3] p-5"
  >
    <p>
      Subtotal ({{ cart.length }} items):
      <strong>{{ formatPrice(state.getCartSubtotal) }}</strong>
    </p>

    <button
      @click="handleCheckout"
      class="mt-2.5 w-full rounded-lg bg-yellow-500 py-2 font-medium"
    >
      {{ loading ? "Processing..." : "Proceed to Checkout" }}
    </button>
  </div>
</template>
