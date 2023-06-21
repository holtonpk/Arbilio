import {
  getFirestore,
  doc,
  addDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { app } from "@/firebase";
import getStripe from "./initializeStripe";
import { storage } from "@/config/data-storage";
import { siteConfig } from "@/config/site";

export async function createCheckoutSession(
  uid: string,
  priceCode: string,
  success_url: string,
  cancel_url: string
) {
  const db = getFirestore(app);
  const stripe = await getStripe();

  console.log(priceCode, "", uid);

  const checkoutSessionRef = collection(
    db,
    storage.users,
    uid,
    "checkout_sessions"
  );

  const checkoutSessionDecRef = await addDoc(checkoutSessionRef, {
    price: priceCode,
    success_url: success_url,
    cancel_url: cancel_url,
  });

  onSnapshot(checkoutSessionDecRef, (doc) => {
    const { sessionId } = doc.data()!;
    console.log("sessionId", sessionId);
    if (sessionId) {
      stripe?.redirectToCheckout({ sessionId });
    }
  });
}

export async function manageSubscription(stripeId: string, return_url: string) {
  const stripe = require("stripe")(
    process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string
  );
  const session = await stripe?.billingPortal.sessions.create({
    customer: stripeId,
    return_url: `${siteConfig.url}/${return_url}`,
  });
  return session.url;
}
