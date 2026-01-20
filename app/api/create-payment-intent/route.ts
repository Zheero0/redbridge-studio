import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(req: Request) {
  try {
    const { amount, bookingDetails } = await req.json()

    // Calculate 50% deposit (half the full price)
    const depositAmount = Math.round((amount / 2) * 100) // Convert to cents and take 50%

    const paymentIntent = await stripe.paymentIntents.create({
      amount: depositAmount,
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        package: bookingDetails.package,
        date: bookingDetails.date,
        timeSlot: bookingDetails.timeSlot,
        fullAmount: amount,
        depositAmount: amount / 2,
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("[v0] Payment intent creation error:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
