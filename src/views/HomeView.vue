<script setup lang="ts">
import AdBanner from "@/components/AdBanner.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import ProductCard from "@/components/ProductCard.vue";
</script>

<template>
  <HeaderBar />
  <main class="mx-auto flex max-w-screen-2xl justify-center">
    <div class="home__container">
      <AdBanner />

      <div
        class="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <ProductCard
          id="1"
          title="Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
          :price="109.95"
          image="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          :rating="3.9"
        />
        <ProductCard
          id="2"
          title="Mens Casual Premium Slim Fit T-Shirts"
          :price="22.29"
          image="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
          :rating="4.1"
        />
      </div>
    </div>
  </main>
</template>
