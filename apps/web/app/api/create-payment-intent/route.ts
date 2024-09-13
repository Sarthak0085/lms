import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: NextRequest) => {
    try {
        const { amount } = await req.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({ clientSecret: paymentIntent.clientSecret }, { status: 200 });
    } catch (error) {
        console.error("Internal Server Error :" + error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}