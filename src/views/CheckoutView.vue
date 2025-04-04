<script setup lang="ts">
import CartProduct from "@/components/CartProduct.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import AlertIcon from "@/components/icons/AlertIcon.vue";
import { useStripe } from "@/composables/useStripe";
import { formatPrice } from "@/lib/utils";
import { useGetState } from "@/state/useGetState";
import axios from "@/axios";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import type { PaymentIntent, StripeCardElement } from "@stripe/stripe-js";
import { useRouter } from "vue-router";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase.ts";

const router = useRouter();

const state = useGetState();
const { user, cart } = storeToRefs(state);

const { stripe, cardElement, complete, error } = useStripe();

const disabled = computed<boolean>(
  () => cart.value.length === 0 || !user.value || !complete.value
);

const processing = ref<boolean>(false);
const succeeded = ref<boolean>(false);

const handleSubmit = async () => {
  if (!stripe.value || !cardElement.value || !user.value) return;

  processing.value = true;

  const { paymentMethod } = await stripe.value?.createPaymentMethod({
    type: "card",
    card: cardElement.value as StripeCardElement
  });

  await axios
    .post("/payments/create", {
      amount: Math.round((state.getCartSubtotal + 4.99) * 1.15 * 100),
      paymentMethodId: paymentMethod?.id
    })
    .then(
      async ({
        data: { paymentIntent }
      }: {
        data: { paymentIntent: PaymentIntent };
      }) => {
        await setDoc(
          doc(
            db,
            "users",
            user.value?.uid as string,
            "orders",
            paymentIntent.id
          ),
          {
            items: cart.value,
            total: paymentIntent.amount,
            createdAt: paymentIntent.created
          }
        );

        succeeded.value = true;
        processing.value = false;
        error.value = null;

        state.emptyCart();

        router.replace("/orders");
      }
    );
};
</script>

<template>
  <HeaderBar />
  <div
    class="mx-auto flex max-w-screen-2xl flex-col gap-5 p-5 pb-10 lg:flex-row"
  >
    <div class="flex h-screen flex-4/5 flex-col gap-5">
      <div class="flex flex-col bg-white p-5">
        <h3 class="text-xl font-bold">Deliver to {{ user?.email }}</h3>
        <p class="text-sm text-gray-800">
          123 Test Road, Fredericton, NB, Canada
        </p>
      </div>

      <div class="flex flex-col gap-5 bg-white p-5">
        <div>
          <h3 class="text-xl font-bold">Payment Method</h3>
          <p class="text-xs text-gray-500">
            Use Stripe Test Card: 4242 4242 4242 4242
          </p>
        </div>
        <div id="card-element"></div>
        <div
          v-if="error"
          class="mt-2 flex items-center gap-2 rounded-md bg-red-100 p-3 text-sm text-red-700"
        >
          <AlertIcon />
          {{ error }}
        </div>
      </div>

      <div class="flex flex-col gap-5 bg-white p-5">
        <h3 class="text-xl font-bold">Review Items</h3>
        <div class="flex flex-col gap-3">
          <CartProduct
            v-for="item in cart"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :image="item.image"
            :price="item.price"
            :rating="item.rating"
          />
        </div>
      </div>
    </div>
    <div
      class="flex h-fit flex-1/5 flex-col gap-3 bg-white p-5 lg:sticky lg:top-20"
    >
      <button
        @click.prevent="handleSubmit"
        :disabled="disabled || processing || succeeded"
        class="w-full rounded-full bg-yellow-300 px-10 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:bg-gray-300/80"
      >
        {{ processing ? "Processing..." : "Place your order" }}
      </button>

      <hr class="text-gray-300" />

      <div class="flex flex-col gap-1 text-xs">
        <div class="flex items-center justify-between">
          <p>Items:</p>
          <p>{{ formatPrice(state.getCartSubtotal) }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p>Shipping &amp; Handling:</p>
          <p>{{ formatPrice(4.99) }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p>Estimated Sales Tax:</p>
          <p>{{ formatPrice((state.getCartSubtotal + 4.99) * 0.15) }}</p>
        </div>
        <div class="flex items-center justify-between text-lg font-bold">
          <p>Order Total:</p>
          <p>{{ formatPrice((state.getCartSubtotal + 4.99) * 1.15) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
