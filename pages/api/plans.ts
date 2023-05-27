import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@/types";
import Stripe from "stripe";
import stripe from "@/stripe/stripeServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prices = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ["data.product"],
  });

  const productsObject: Record<string, Product> = prices.data.reduce(
    (accumulator: Record<string, Product>, price: Stripe.Price) => {
      const product = price.product as Stripe.Product;
      if (product.active) {
        if (!accumulator[product.id]) {
          accumulator[product.id] = {
            id: product.id,
            name: product.name || "",
            description: product.description || "",
            monthly_price: { id: "", unit_amount: 0 },
            annual_price: { id: "", unit_amount: 0 },
            firebaseRole: product.metadata.firebaseRole,
            features: [
              { text: "Unlimited users" },
              { text: "Unlimited branded links" },
              {
                text: "Unlimited custom domains",
              },
              {
                text: "Free SSL certificates",
              },
              {
                text: "Advanced link features",
                footnote:
                  "Password protection, link expiration, device targeting, custom social media cards, etc.",
              },
              {
                text: "Root domain redirect",
                footnote:
                  "Redirect vistors that land on the root of your domain (e.g. yourdomain.com) to a page of your choice.",
                negative: true,
              },
              {
                text: "Custom QR Code Logo",
                negative: true,
              },
            ],
          };
        }
        if (price.recurring && price.recurring.interval === "month") {
          accumulator[product.id].monthly_price = {
            id: price.id,
            unit_amount: price.unit_amount || 0,
          };
        } else if (price.recurring && price.recurring.interval === "year") {
          accumulator[product.id].annual_price = {
            id: price.id,
            unit_amount: price.unit_amount || 0,
          };
        }
      }
      return accumulator;
    },
    {} as Record<string, Product> // assert initialValue as Record<string, Product>
  );

  // Convert the products object back into an array
  const productsArray: Product[] = Object.values(productsObject);

  res.status(200).json({ productsArray });
}
