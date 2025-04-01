<script setup lang="ts">
import { formatPrice } from "@/lib/utils";
import { useGetState } from "@/state/useGetState";
import { StarIcon } from "lucide-vue-next";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
}

const props = defineProps<ProductCardProps>();

const cart = useGetState();

const addToCart = () => {
  cart.addToCart({ ...props });
};
</script>

<template>
  <div
    class="z-10 flex max-h-100 w-full min-w-25 flex-col justify-end bg-white p-5"
  >
    <img
      loading="lazy"
      :src="image"
      :alt="title"
      class="mb-4 max-h-50 w-full object-contain"
    />

    <div class="mb-4 h-25">
      <h4>{{ title }}</h4>
      <p class="mt-1">
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
    </div>

    <button
      @click="addToCart"
      class="w-full rounded-lg bg-yellow-500 py-2 font-medium"
    >
      Add To Cart
    </button>
  </div>
</template>
