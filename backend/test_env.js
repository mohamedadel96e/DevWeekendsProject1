import "dotenv/config";
import stripe from "stripe";
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
(async () => {
    try {
        const res = await stripeInstance.checkout.sessions.list({ limit: 1 });
        console.log("Stripe call succeeded", res);
    } catch (e) {
        console.log("Stripe call failed:", e.message);
    }
})();
