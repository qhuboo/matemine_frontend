import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useGetPaymentIntent from "../../api/apiHooks/useGetPaymentIntent";
import { ClipLoader } from "react-spinners";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const paymentIntent = useGetPaymentIntent();

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await paymentIntent.refetch();
    console.log(result);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_STRIPE_REDIRECT_URL}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  }

  const paymentElementOptions = {
    layout: "accordion",
  };

  // No stripe context
  if (!stripe || !elements) {
    return (
      <div>
        <h2>Payment system unavailable</h2>
        <p>Please return to cart and try again</p>
        <Link to="/cart">Return to Cart</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span>{isLoading ? <ClipLoader /> : "Pay now"}</span>
      </button>
      {message && <div>{message}</div>}
    </form>
  );
}
