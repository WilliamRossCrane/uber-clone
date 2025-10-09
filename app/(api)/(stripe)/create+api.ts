import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, amount } = body;

  if (!name || !email || !amount) {
    return new Response(
      JSON.stringify({
        error: "Please enter a valid email address and amount",
      }),
      { status: 400 }
    );
  }

  let customer;
  const existingCustomers = await stripe.customers.list({ email });

  if (existingCustomers.data.length > 0) {
    customer = existingCustomers.data[0];
  } else {
    customer = await stripe.customers.create({ name, email });
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-06-20" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(parseFloat(amount) * 100), // convert to cents
    currency: "usd", // always USD
    customer: customer.id,
    automatic_payment_methods: { enabled: true, allow_redirects: "never" },
  });

  return new Response(
    JSON.stringify({ paymentIntent, ephemeralKey, customer: customer.id })
  );
}
