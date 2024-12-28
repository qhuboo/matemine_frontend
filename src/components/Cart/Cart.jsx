import styled from "styled-components";
import { Link } from "react-router-dom";
import useAuth from "../Auth/hooks/useAuth";
import useGetCart from "../../api/apiHooks/useGetCart";
import useChangeCartQuantity from "../../api/apiHooks/useChangeCartQuantity";
import { Trash2 } from "react-feather";
import useRemoveFromCart from "../../api/apiHooks/useRemoveFromCart";
import { QUERIES } from "../../constants";
import he from "he";

export default function Cart() {
  const user = useAuth();
  const cartItems = useGetCart();
  const changeCartQuantity = useChangeCartQuantity();
  const removeFromCart = useRemoveFromCart();

  function handleQuantityChange(event) {
    event.preventDefault();

    if (changeCartQuantity.isPending) {
      return;
    }

    const gameId = event.target.dataset.gameId;
    const quantity = event.target.value;

    // Create the payload object, body, accessToken, and email

    const payload = {
      body: { gameId, quantity },
      accessToken: user?.accessToken,
      email: user?.user?.email,
    };
    changeCartQuantity.mutate(payload);
  }

  function handleRemoveFromCart(gameId) {
    console.log("remove from cart");

    if (removeFromCart.isPending) {
      return;
    }

    const payload = {
      body: { gameId },
      accessToken: user?.accessToken,
      email: user?.user?.email,
    };

    console.log(payload);
    removeFromCart.mutate(payload);
  }

  if (cartItems.isPending && user.isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <h2>Shopping Cart</h2>
      <CartItems>
        {cartItems?.status === "success" &&
          cartItems?.data?.data?.length > 0 &&
          cartItems?.data?.data.map((game) => (
            <CartItem key={game.game_id}>
              <GameInfo to={`/product/${game.game_id}`}>
                <GameCover
                  src={game.sample_cover_image}
                  alt={`Sample cover image for the game: ${he.decode(
                    game?.title
                  )}`}
                />
                <GameTitle>{he.decode(game?.title)}</GameTitle>
              </GameInfo>
              <CartActions>
                <GamePrice>
                  <label htmlFor="quantity-select">Quantity </label>
                  <select
                    name={`${game.game_id}-quantity`}
                    data-game-id={game.game_id}
                    id="quantity-select"
                    value={game.quantity}
                    onChange={handleQuantityChange}
                  >
                    {[
                      ...[...Array(10).keys()]
                        .map((index) => index + 1)
                        .map((quantity) => (
                          <option key={quantity} value={quantity}>
                            {quantity}
                          </option>
                        )),
                    ]}
                  </select>{" "}
                  x ${game.price}
                </GamePrice>
                <button
                  onClick={() => {
                    handleRemoveFromCart(Number(game.game_id));
                  }}
                >
                  <TrashIcon />
                </button>
              </CartActions>
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
          {cartItems?.status === "success" &&
            cartItems?.data?.data?.length > 0 &&
            parseFloat(
              cartItems.data.data
                .reduce((accumulatedPrice, currentGame) => {
                  return (
                    accumulatedPrice +
                    Number(currentGame.quantity) * parseFloat(currentGame.price)
                  );
                }, 0)
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
  // border: 2px dotted blue;
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
  text-align: center;
  // padding: 20px;
`;

const CartItems = styled.div`
  // border: 3px solid springgreen;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > *:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`;

const CartItem = styled.div`
  // border: 3px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  padding-bottom: 20px;
`;

const GameInfo = styled(Link)`
  // border: 3px solid blue;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  gap: 25px;

  @media (${QUERIES.tabletAndSmaller}) {
    // border: 3px solid yellow;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  @media (${QUERIES.mobileAndSmaller}) {
  }
`;

const GameCover = styled.img`
  // border: 4px dotted black;
  width: 150px;
  border-radius: 5px;
`;

const GameTitle = styled.p`
  font-size: 1.4rem;
  color: black;

  @media (${QUERIES.tabletAndSmaller}) {
    font-size: 1.2rem;
  }

  @media (${QUERIES.mobileAndSmaller}) {
    font-size: 1rem;
  }
`;

const CartActions = styled.div`
  // border: 3px solid red;
  display: flex;
  align-items: center;
  gap: 50px;
  flex-shrink: 0;
  font-size: 1.2rem;

  @media (${QUERIES.tabletAndSmaller}) {
    font-size: 1.1rem;
  }

  @media (${QUERIES.mobileAndSmaller}) {
    font-size: 1rem;
    gap: 10px;
  }
`;

const GamePrice = styled.p``;

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

const TrashIcon = styled(Trash2)`
  color: black;
  cursor: pointer;
`;
