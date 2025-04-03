import { onMounted, ref } from "vue";
import {
  loadStripe,
  type Stripe,
  type StripeCardElement,
  type StripeElements
} from "@stripe/stripe-js";

export const useStripe = () => {
  const stripe = ref<Stripe | null>(null);
  const elements = ref<StripeElements | null>(null);
  const cardElement = ref<StripeCardElement | null>(null);
  const cardComplete = ref<boolean>(false);

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

    cardElement.value.on("change", (event) => {
      cardComplete.value = event.complete;
    });
  });

  return { stripe, cardElement, cardComplete };
};
