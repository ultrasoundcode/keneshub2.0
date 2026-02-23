import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const stripeInstance = getStripe();
    const event = stripeInstance.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        // In production: update user subscription plan in database
        // await prisma.user.update({
        //   where: { stripeCustomerId: session.customer },
        //   data: { subscriptionPlan: 'PRO' }
        // });
        console.log("Checkout completed:", session.id);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        console.log("Subscription updated:", subscription.id);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        // In production: downgrade user to FREE plan
        // await prisma.user.update({
        //   where: { stripeCustomerId: subscription.customer },
        //   data: { subscriptionPlan: 'FREE' }
        // });
        console.log("Subscription cancelled:", subscription.id);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        console.log("Payment failed:", invoice.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}
