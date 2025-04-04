import { config } from "dotenv";
config({ path: "./.env" });

import express from "express";
import cors from "cors";
import { onRequest } from "firebase-functions/v2/https";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-03-31.basil"
});

// Initialize API
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.post("/payments/create", async (req, res) => {
  if (
    req.headers["authorization"] !== process.env.REQUEST_AUTHORIZATION_SECRET
  ) {
    return res.status(403).send({ error: "Unauthorized" });
  }

  const { amount, paymentMethodId } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "cad",
    payment_method: paymentMethodId,
    confirm: true,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never"
    }
  });

  res.status(201).send({ paymentIntent: paymentIntent });
});

export const api = onRequest(app);
