<script setup lang="ts">
import { onAuthStateChanged, type User } from "firebase/auth";
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { auth } from "@/firebase";
import { useGetState } from "@/state/useGetState";

const state = useGetState();

onMounted(() => {
  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      state.setUser(user);
    } else {
      state.setUser(null);
    }
  });
});
</script>

<template>
  <RouterView />
</template>
