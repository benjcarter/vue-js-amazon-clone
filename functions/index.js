import { config } from "dotenv";
config({ path: "./.env" });

import express from "express";
import cors from "cors";
import { onRequest } from "firebase-functions/v2/https";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize API
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);

  const session = await stripe.checkout.sessions.create({
    line_items: req.body.items.map((item) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.title,
          images: [item.image]
        },
        unit_amount: item.price * 100
      },
      quantity: 1
    })),
    mode: "payment",
    success_url: `${req.headers.origin}/orders`,
    cancel_url: `${req.headers.origin}/cart`
  });

  res.json({ url: session.url });
});

export const api = onRequest(app);

// Endpoint: http://127.0.0.1:5001/vue-js-azn-clone/us-central1/api
