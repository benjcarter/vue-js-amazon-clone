<script setup lang="ts">
import { auth } from "@/firebase";
import { useGetState } from "@/state/useGetState";
import { signOut } from "firebase/auth";
import { SearchIcon, ShoppingCartIcon } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

const state = useGetState();
const { cart, user } = storeToRefs(state);

const handleAuth = async () => {
  if (user.value) {
    await signOut(auth);
  }
};
</script>

<template>
  <header
    class="sticky top-0 z-50 flex h-15 items-center justify-between bg-[#131921]"
  >
    <!-- Amazon Logo -->
    <RouterLink to="/">
      <img
        loading="lazy"
        src="/src/assets/logo.png"
        alt="Amazon Logo"
        class="mx-5 w-25 object-contain"
      />
    </RouterLink>

    <!-- Search Bar -->
    <div class="hidden flex-1 items-center sm:flex">
      <input type="text" class="h-9 w-full bg-white p-2.5 outline-none" />
      <div class="flex h-9 w-10 items-center justify-center bg-yellow-300">
        <SearchIcon />
      </div>
    </div>

    <!-- Right Nav Options -->
    <div class="flex items-center gap-x-4 px-4">
      <RouterLink :to="!user ? '/login' : ''">
        <div
          @click="handleAuth"
          class="flex cursor-pointer flex-col text-white hover:underline"
        >
          <span class="text-xs">Hello, {{ user ? user.email : "Guest" }}!</span>
          <span class="text-sm font-extrabold">
            {{ user ? "Sign Out" : "Sign In" }}
          </span>
        </div>
      </RouterLink>
      <RouterLink
        to="/orders"
        class="flex cursor-pointer flex-col text-white hover:underline"
      >
        <span class="text-xs">Returns</span>
        <span class="text-sm font-extrabold">&amp; Orders</span>
      </RouterLink>
      <RouterLink to="/cart" class="relative cursor-pointer">
        <ShoppingCartIcon class="size-9 text-white" />
        <span
          class="absolute top-0 -right-2 flex size-4 items-center justify-center rounded-full bg-yellow-300 text-xs font-extrabold"
        >
          {{ cart.length }}
        </span>
      </RouterLink>
    </div>
  </header>
</template>
