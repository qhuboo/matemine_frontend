import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useGetPaymentIntent from "../../api/apiHooks/useGetPaymentIntent";
import { ClipLoader } from "react-spinners";
import { QUERIES } from "../../constants";

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
    layout: "tabs",
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
    <Form onSubmit={handleSubmit}>
      <PaymentElement options={paymentElementOptions} />
      <PayButtonWrapper>
        <PayButton disabled={isLoading || !stripe || !elements} id="submit">
          <span>{isLoading ? <ClipLoader /> : "Pay now"}</span>
        </PayButton>
      </PayButtonWrapper>
      <ErrorMessage>{message && <div>{message}</div>}</ErrorMessage>
    </Form>
  );
}

const Form = styled.form`
  // border: 2px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  font-family: "Rajdhani";
  font-weight: 600;
`;

const PayButtonWrapper = styled.div`
  // border: 2px solid green;
  display: flex;
  justify-content: center;
`;

const PayButton = styled.button`
  // border: 2px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;

  @media (${QUERIES.mobileAndSmaller}) {
    width: 100%;
  }
`;

const ErrorMessage = styled.div`
  // border: 2px solid springgreen;
  color: red;
  font-family: "Rajdhani";
  font-weight: 600;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (${QUERIES.mobileAndSmaller}) {
    font-size: 1.2rem;
  }
`;
