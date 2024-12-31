import { Outlet } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useGetPaymentIntent from "../../api/apiHooks/useGetPaymentIntent";

const stripePromise = loadStripe(
  `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`
);

export default function PaymentRoutes() {
  const paymentIntent = useGetPaymentIntent();

  const appearance = {
    theme: "stripe",
  };
  const loader = "auto";

  // Still fetching
  if (paymentIntent.isLoading) {
    return <div>Loading payment details...</div>;
  }

  // No payment intent yet or error
  if (!paymentIntent?.data?.data?.clientSecret) {
    return <Outlet />;
  }

  // Have payment intent, show Elements
  return (
    <Elements
      options={{
        clientSecret: paymentIntent.data.data.clientSecret,
        appearance,
        loader,
      }}
      stripe={stripePromise}
    >
      <Outlet />
    </Elements>
  );
}
