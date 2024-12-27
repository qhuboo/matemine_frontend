import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";
import useAuth from "../Auth/hooks/useAuth";
import { AnimatePresence } from "framer-motion";
import { PacmanLoader } from "react-spinners";
import { useEffect } from "react";
import useGetGameScreenshots from "../../api/apiHooks/useGetGameScreenshots";
import useAddGameToCart from "../../api/apiHooks/useAddGameToCart";
import useGetGame from "../../api/apiHooks/useGetGame";

export default function Product() {
  const user = useAuth();
  const { gameId } = useParams();
  const screenshots = useGetGameScreenshots(gameId);
  const game = useGetGame(gameId);
  const [searchParams, setSearchParams] = useSearchParams();
  const addToCart = useAddGameToCart();

  useEffect(() => {
    if (
      !searchParams.get("quantity") ||
      !/^[0-9]+$/.test(searchParams.get("quantity"))
    ) {
      const newParams = {};
      searchParams.get((value, key) => {
        newParams[key] = value;
      });
      newParams.quantity = "1";
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  function handleQuantityChange(event) {
    event.preventDefault();

    const newParams = {};
    searchParams.get((value, key) => {
      newParams[key] = value;
    });

    if (event.target.value) {
      newParams.quantity = event.target.value;
    }
    setSearchParams(newParams, { replace: true });
  }

  function handleCartChange() {
    if (addToCart.isPending) {
      return;
    }

    if (!user.isAuthenticated) {
      console.log("User not logged in");
      return;
    }

    const gameId = game?.data.game_id;
    const quantity = searchParams.get("quantity");

    const payload = {
      body: { gameId, quantity },
      accessToken: user.accessToken,
      email: user?.user?.email,
    };
    addToCart.mutate(payload);
  }

  return (
    <Wrapper>
      {screenshots.status === "success" &&
        !screenshots.isLoading &&
        !screenshots.isFetching && (
          <GameImages>
            <Image1>
              <img src={screenshots.data[0]?.image} alt="" />
            </Image1>
            <Image2>
              <img src={screenshots.data[1]?.image} alt="" />
            </Image2>
            <Image3>
              <img src={screenshots.data[2]?.image} alt="" />
            </Image3>
            <Image4>
              <img src={screenshots.data[3]?.image} alt="" />
            </Image4>
          </GameImages>
        )}
      {game.status === "success" && !game.isLoading && !game.isFetching && (
        <GameDetails>
          <GameInfo>
            <GameTitle>{game.data?.title}</GameTitle>
            Details
            <GameDescription>{game.data?.description}</GameDescription>
          </GameInfo>

          <AddToCart>
            <GameTitle>{game.data?.title}</GameTitle>
            <GamePrice>${game.data?.price}</GamePrice>
            <QuantityWrapper>
              <label htmlFor="quantity-select">Quantity </label>
              <select
                name="quantity"
                id="quantity-select"
                value={searchParams.get("quantity") || "1"}
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
              </select>
            </QuantityWrapper>
            <AnimatePresence>
              <AddToCartButton onClick={handleCartChange}>
                {addToCart.isPending ? (
                  <PacmanLoader color="#fffc00" size={20} />
                ) : addToCart.isError ? (
                  <p>There was an error, try again</p>
                ) : (
                  <p>Add to cart</p>
                )}
              </AddToCartButton>
            </AnimatePresence>
          </AddToCart>
        </GameDetails>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  // border: 2px solid springgreen;
  padding: 30px 15px 0;
  display: flex;
  flex-direction: column;
  heigth: 100%;
`;

const GameImages = styled.div`
  //   border: 2px solid blue;
  margin-bottom: 25px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    "image1 image2 image3"
    "image1 image4 image3";
  gap: 20px;
  justify-items: center;
  align-items: center;
`;

const Image1 = styled.div`
  grid-area: image1;
`;
const Image2 = styled.div`
  grid-area: image2;
`;
const Image3 = styled.div`
  grid-area: image3;
`;
const Image4 = styled.div`
  grid-area: image4;
`;

const GameTitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 25px;

  @media (max-width: 1100px) {
    font-size: 1.2rem;
    margin-bottom: 0;
  }
`;

const GameDetails = styled.div`
  // border: 2px solid red;
  display: flex;

  @media (max-width: 1100px) {
    flex-direction: column-reverse;
  }
`;

const GameInfo = styled.div`
  // border: 2px solid chartreuse;
  border-right: 1px solid #e5e7eb;
  padding-right: 25px;
  margin-right: 25px;
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 1100px) {
    border-right: revert;
    padding-right: revert;
    margin-right: revert;
    font-size: 1rem;

    ${GameTitle} {
      display: none;
    }
  }
`;

const GameDescription = styled.p`
  font-size: 1rem;
  color: rgb(75 85 99);
`;

const AddToCart = styled.div`
  // border: 2px solid blue;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  ${GameTitle} {
    display: none;
  }

  @media (max-width: 1100px) {
    margin-bottom: 50px;

    ${GameTitle} {
      display: revert;
    }
  }
`;

const GamePrice = styled.div`
  font-size: 1.8rem;
  // margin-bottom: 35px;

  @media (max-width: 1100px) {
    font-size: 1.2rem;
  }
`;

const AddToCartButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  color: white;
  padding: 12px 32px;
  width: 100%;
  background-color: rgb(79 70 229);

  @media (max-width: 1100px) {
    font-size: 1rem;
  }
`;

const QuantityWrapper = styled.div`
  // border: 3px solid red;
  font-size: 1.25rem;
`;
