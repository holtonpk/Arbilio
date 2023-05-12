import { Stripe as StipeType, loadStripe } from "@stripe/stripe-js";
const Stripe = require("stripe");

let stripePromise: StipeType | null;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );
  }
  return stripePromise;
};
export default initializeStripe;
