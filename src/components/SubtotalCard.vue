<script setup lang="ts">
import { formatPrice } from "@/lib/utils";
import { useGetState } from "@/state/useGetState";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const state = useGetState();
const { cart, user } = storeToRefs(state);

const disabled = computed(() => cart.value.length === 0 || !user.value);
</script>

<template>
  <div
    class="sticky top-20 flex w-75 flex-col justify-between rounded-sm border border-[#ddd] bg-[#f3f3f3] p-5"
  >
    <p>
      Subtotal ({{ cart.length }} items):
      <strong>{{ formatPrice(state.getCartSubtotal) }}</strong>
    </p>

    <button
      @click="router.push('/checkout')"
      :disabled="disabled"
      class="mt-2.5 w-full rounded-full bg-yellow-300 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:bg-gray-300/80"
    >
      Proceed to Checkout
    </button>
  </div>
</template>
