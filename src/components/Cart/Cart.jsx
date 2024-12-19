import styled from "styled-components";
import { Link } from "react-router-dom";

import useGetCart from "../../api/apiHooks/useGetCart";

function Cart() {
  const cartItems = useGetCart();

  return (
    <Wrapper>
      <h2>Shopping Cart</h2>
      <CartItems>
        {!cartItems.isPending &&
          cartItems.data.length > 0 &&
          cartItems.data.map((game) => (
            <CartItem key={game.game_id}>
              <GameInfo>
                <GameCover
                  src={game.sample_cover_image}
                  alt={`Sample cover image for the game: ${game.title}`}
                />
                <GameTitle>{game.title}</GameTitle>
              </GameInfo>
              <GamePrice>${game.price}</GamePrice>
            </CartItem>
          ))}
      </CartItems>
      <Subtotal>
        <SubtotalTitle>
          <p>Subtotal</p>{" "}
          <Disclaimer>Shipping and taxes calculated at checkout.</Disclaimer>
        </SubtotalTitle>
        <p>
          $
          {!cartItems.isPending &&
            cartItems.data.length > 0 &&
            parseFloat(
              cartItems.data
                .reduce(
                  (accumulatedPrice, currentGame) =>
                    accumulatedPrice + parseFloat(currentGame.price),
                  0
                )
                .toFixed(2)
            )}
        </p>
      </Subtotal>
      <CheckoutButton to={"/checkout"}>Checkout</CheckoutButton>
      <div style={{ color: "rgb(107, 114, 128)", fontSize: "1rem" }}>
        or{" "}
        <Link
          style={{ color: " rgb(234, 88, 12)", textDecoration: "none" }}
          to={"/marketplace"}
        >
          Continue Shopping →
        </Link>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  //   border: 2px dotted blue;
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
  text-align: center;
  padding: 20px;
`;

const CartItems = styled.div`
  //   border: 3px solid springgreen;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > *:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

const GameInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
`;

const GameCover = styled.img`
  width: 150px;
  border-radius: 5px;
`;

const GameTitle = styled.p`
  font-size: 1rem;
`;

const GamePrice = styled.p`
  font-size: 1.2rem;
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubtotalTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Disclaimer = styled.p`
  font-size: 1rem;
  color: rgb(107, 114, 128);
  text-align: left;
`;

const CheckoutButton = styled(Link)`
  background-color: rgb(234, 88, 12);
  border: none;
  border-radius: 6px;
  padding: 10px;
  color: white;
`;

export default Cart;
