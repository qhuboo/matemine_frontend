import { Link } from "react-router-dom";
import styled from "styled-components";
import he from "he";
import useGetCart from "../../api/apiHooks/useGetCart";

import CheckoutForm from "./CheckoutForm";
import useGetPaymentIntent from "../../api/apiHooks/useGetPaymentIntent";
import { QUERIES } from "../../constants";

export default function Checkout() {
  const cartItems = useGetCart();
  const paymentIntent = useGetPaymentIntent();

  // Need to check if data is loading first
  if (cartItems.isPending || paymentIntent.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <OrderSummary>
        Order Summary
        <p style={{ color: "rgb(156, 163, 175)", fontSize: "1rem" }}>
          Check your items. And Select a suitable shipping method.
        </p>
        <CartItems>
          {cartItems.data.data.map((game) => (
            <CartItem key={game.game_id}>
              <Cover src={game.sample_cover_image} alt="" />
              <GameInfo>
                <GameTitle>{he.decode(game?.title)}</GameTitle>
                <GamePrice>
                  ${game.quantity} x ${game.price}
                </GamePrice>
              </GameInfo>
            </CartItem>
          ))}
        </CartItems>
      </OrderSummary>
      <PaymentDetails>
        {paymentIntent?.data?.data?.clientSecret ? (
          <CheckoutForm />
        ) : (
          <div>
            <h2>Payment not initialized</h2>
            <p>Please return to cart to initialize payment</p>
            <Link to="/cart">Return to Cart</Link>
          </div>
        )}
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

  @media (${QUERIES.mobileAndSmaller}) {
    margin-bottom: 20px;
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
