<script setup lang="ts">
import HeaderBar from "@/components/HeaderBar.vue";
import { db } from "@/firebase";
import { useGetState } from "@/state/useGetState";
import type { Order } from "@/types";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  type Unsubscribe
} from "firebase/firestore";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, ref, watch } from "vue";
import OrderCard from "@/components/OrderCard.vue";

const state = useGetState();
const { user } = storeToRefs(state);

const orders = ref<Order[]>([]);
const unsubscribe = ref<Unsubscribe | null>(null);

watch(
  () => user.value,
  (user) => {
    if (unsubscribe.value) {
      unsubscribe.value();
      unsubscribe.value = null;
    }

    if (user) {
      const unsub = onSnapshot(
        query(
          collection(db, "users", user.uid, "orders"),
          orderBy("createdAt", "desc")
        ),
        (snapshot) => {
          orders.value = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })) as Order[];
        },
        (error) => {
          console.error("Error fetching orders: ", error);
        }
      );

      unsubscribe.value = unsub;
    } else {
      orders.value = [];
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (unsubscribe.value) {
    unsubscribe.value();
    unsubscribe.value = null;
  }
});
</script>

<template>
  <HeaderBar />
  <div class="px-20 py-5">
    <h1 class="my-7.5 text-4xl font-bold">Your Orders</h1>

    <div class="orders__order">
      <OrderCard v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>
