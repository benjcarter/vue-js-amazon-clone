<script setup lang="ts">
import SubtotalCard from "@/components/SubtotalCard.vue";
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
        <!-- CartItem -->
      </div>
    </div>

    <div class="checkout__right">
      <SubtotalCard />
    </div>
  </div>
</template>
