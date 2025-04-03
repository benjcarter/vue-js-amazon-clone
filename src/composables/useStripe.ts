import { onMounted, ref } from "vue";
import {
  loadStripe,
  type Stripe,
  type StripeCardElement,
  type StripeCardElementChangeEvent,
  type StripeElements
} from "@stripe/stripe-js";

export const useStripe = () => {
  const stripe = ref<Stripe | null>(null);
  const elements = ref<StripeElements | null>(null);
  const cardElement = ref<StripeCardElement | null>(null);
  const complete = ref<boolean>(false);
  const error = ref<string | null>(null);

  onMounted(async () => {
    stripe.value = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    if (!stripe.value) {
      throw new Error("Stripe.js failed to load.");
    }

    elements.value = stripe.value.elements();
    cardElement.value = elements.value.create("card", {
      style: {
        base: {
          fontSize: "16px",
          color: "#32325d"
        }
      },
      hidePostalCode: true
    });
    cardElement.value.mount("#card-element");

    cardElement.value.on("change", (event: StripeCardElementChangeEvent) => {
      complete.value = event.complete;
      error.value = event.error ? event.error.message : null;
    });
  });

  return { stripe, cardElement, complete, error };
};
