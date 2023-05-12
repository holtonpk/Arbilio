import {
  getFirestore,
  doc,
  addDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { app } from "@/firebase";
import getStripe from "./initializeStripe";

export async function createCheckoutSession(
  uid: string,
  priceCode: string,
  success_url: string,
  cancel_url: string
) {
  const db = getFirestore(app);
  const stripe = await getStripe();

  const checkoutSessionRef = collection(db, "users", uid, "checkout_sessions");

  const checkoutSessionDecRef = await addDoc(checkoutSessionRef, {
    price: priceCode,
    success_url: success_url,
    cancel_url: cancel_url,
  });

  onSnapshot(checkoutSessionDecRef, (doc) => {
    const { sessionId } = doc.data()!;
    if (sessionId) {
      stripe?.redirectToCheckout({ sessionId });
    }
  });
}
