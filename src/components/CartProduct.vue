<script setup lang="ts">
import { formatPrice } from "@/lib/utils";
import { useGetState } from "@/state/useGetState";
import { StarIcon } from "lucide-vue-next";

interface CartProductProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
}

const props = defineProps<CartProductProps>();

const cart = useGetState();

const removeFromCart = () => {
  cart.removeFromCart(props.id);
};
</script>

<template>
  <div class="my-5 flex gap-x-5">
    <img :src="image" :alt="title" class="size-45 object-contain" />

    <div>
      <h4 class="text-base font-extrabold">{{ title }}</h4>

      <p>
        <strong>{{ formatPrice(price) }}</strong>
      </p>

      <div class="flex">
        <StarIcon
          v-for="(_, i) in Array(Math.round(rating))"
          :key="i"
          fill="currentColor"
          class="size-5 text-yellow-500"
        />
      </div>

      <button
        @click="removeFromCart"
        class="mt-2.5 rounded-full bg-yellow-300 px-10 py-2 text-sm font-medium"
      >
        Remove From Cart
      </button>
    </div>
  </div>
</template>
