// import Stripe from "stripe";

// export async function getPlans() {
//   const stripe = require("stripe")(
//     "sk_test_51KsFpgEewcpAM4MfqUhXKeEnFfdHkN0Btxdxi4pLQzB45cOWyGtk1ujQsZWfT5RIOcijIZqyIrUpeVfJtGxHuMmz00rGEWP0qm"
//   );
//   const prices = await stripe.prices.list({
//     active: true,
//     limit: 10,
//     expand: ["data.product"],
//   });

//   const products: Record<string, Product> = prices.data.reduce(
//     (
//       accumulator: Record<string, Product>,
//       price: Stripe.Response<Stripe.Price>
//     ) => {
//       const product = price.product as Stripe.Product;
//       if (product.active) {
//         if (!accumulator[product.id]) {
//           accumulator[product.id] = {
//             id: product.id,
//             name: product.name || "",
//             description: product.description || "",
//             monthly_price: null,
//             annual_price: null,
//             features: [
//               "1 User",
//               "1 GB Storage",
//               "Email Support",
//               "Help Center Access",
//             ],
//           };
//         }
//         if (price.recurring && price.recurring.interval === "month") {
//           accumulator[product.id].monthly_price = {
//             id: price.id,
//             unit_amount: price.unit_amount,
//           };
//         } else if (price.recurring && price.recurring.interval === "year") {
//           accumulator[product.id].annual_price = {
//             id: price.id,
//             unit_amount: price.unit_amount,
//           };
//         }
//       }
//       return accumulator;
//     },
//     {}
//   );

//   console.log("pro", products);
//   return products;
// }
