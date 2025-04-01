<script setup lang="ts">
import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential
} from "firebase/auth";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");

const signIn = async () => {
  await signInWithEmailAndPassword(auth, email.value, password.value)
    .then((auth: UserCredential) => {
      if (auth) {
        router.push("/");
      }
    })
    .catch((error) => alert(error.message));
};

const register = async () => {
  await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((auth: UserCredential) => {
      if (auth) {
        router.push("/");
      }
    })
    .catch((error) => alert(error.message));
};
</script>

<template>
  <div class="flex h-screen flex-col items-center bg-white pt-20">
    <RouterLink to="/">
      <img
        src="/src/assets/logo-black.png"
        alt="Amazon Logo"
        class="mx-auto my-5 w-25 object-contain"
      />
    </RouterLink>

    <div class="flex h-fit w-75 flex-col rounded-sm border border-gray-300 p-5">
      <h1 class="mb-5 text-3xl font-medium">Sign In</h1>

      <form @submit.prevent="signIn">
        <label class="mb-1 font-bold">Email</label>
        <input
          type="email"
          class="mb-2.5 w-full rounded-md border border-gray-400 bg-white p-2 outline-none focus:ring-2 focus:ring-yellow-500"
          v-model="email"
        />

        <label class="mb-1 font-bold">Password</label>
        <input
          type="password"
          class="mb-2.5 w-full rounded-md border border-gray-400 bg-white p-2 outline-none focus:ring-2 focus:ring-yellow-500"
          v-model="password"
        />

        <button
          type="submit"
          class="mt-2.5 w-full rounded-lg bg-yellow-500 py-2 font-medium"
        >
          Sign In
        </button>
      </form>

      <p class="mt-4 text-xs">
        By signing-in you agree to the Amazon Clone Conditions of Use &amp;
        Sale. Please see our Privacy Notice, our Cookies Notice and our
        Interest-Based Ads Notice.
      </p>

      <button
        @click.prevent="register"
        class="mt-2.5 w-full rounded-lg border border-gray-300 bg-gray-200 py-2 font-medium"
      >
        Create Your Amazon Account
      </button>
    </div>
  </div>
</template>
