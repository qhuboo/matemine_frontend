import { useState } from "react";
import styled from "styled-components";
import he from "he";
import useGetCart from "../../api/apiHooks/useGetCart";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function Checkout() {
  const cartItems = useGetCart();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://localhost:5173/",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <Wrapper>
      <OrderSummary>
        Order Summary
        <p style={{ color: "rgb(156, 163, 175)", fontSize: "1rem" }}>
          Check your items. And Select a suitable shipping method.
        </p>
        <CartItems>
          {!cartItems.isPending &&
            cartItems.data.data.length > 0 &&
            cartItems.data.data.map((game) => {
              return (
                <CartItem key={game.game_id}>
                  <Cover src={game.sample_cover_image} alt="" />
                  <GameInfo>
                    <GameTitle>{he.decode(game?.title)}</GameTitle>
                    <GamePrice>
                      ${game.quantity} x ${game.price}
                    </GamePrice>
                  </GameInfo>
                </CartItem>
              );
            })}
        </CartItems>
      </OrderSummary>
      <PaymentDetails>
        <form onSubmit={handleSubmit}>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">{isLoading ? <Spinner /> : "Pay now"}</span>
          </button>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </form>
      </PaymentDetails>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  //   border: 2px solid red;
  display: flex;
  gap: 20px;
  padding-top: 50px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const OrderSummary = styled.div`
  //   border: 2px solid springgreen;
  width: 50%;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;

  @media (max-width: 1100px) {
    width: 100%;
    padding: 10px;
  }
`;

const PaymentDetails = styled.div`
  //   border: 2px solid springgreen;
  background-color: rgb(249, 250, 251);
  width: 50%;
  padding-top: 40px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 5px;

  @media (max-width: 1100px) {
    width: 100%;
  }
`;

const CartItems = styled.div`
  border: 1px solid rgb(229, 231, 235);
  border-radius: 8px;
  width: 100%;
  margin-top: 32px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled.div`
  display: flex;
  gap: 20px;
`;

const Cover = styled.img`
  width: 100px;
  border-radius: 6px;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  font-size: 1.1rem;
`;

const GameTitle = styled.p``;

const GamePrice = styled.p``;

const Spinner = styled.div`
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
`;
