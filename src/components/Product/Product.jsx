import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchWrapper } from "../../utils";
import useAuth from "../Auth/hooks/useAuth";

function Product() {
  const user = useAuth();
  const { gameId } = useParams();
  const { data, status } = useQuery({
    queryKey: ["games", "game", "screenshots", `${gameId}`],
    queryFn: fetchWrapper.get(
      `${import.meta.env.VITE_BACKEND_URL}/games/screenshots/${gameId}`
    ),
    staleTime: Infinity,
  });

  const addToCart = useMutation({
    mutationFn: fetchWrapper.protectedPost(
      `${import.meta.env.VITE_BACKEND_URL}/cart/add`
    ),
    onSuccess: (data) => {
      // console.log("OnSuccess");
      if (data.accessToken) {
        // console.log("replacing the access token");
        user.login({
          ...user.user,
          isAuthencated: true,
          accessToken: data.accessToken,
        });
      }
      console.log(data.message);
    },
    onError: (error) => {
      console.log("There was an error");
      console.log(error);
    },
  });

  function handleCartChange() {
    if (addToCart.isPending) {
      return;
    }

    if (!user.isAuthenticated) {
      console.log("User not logged in");
      return;
    }

    const gameId = data[0].game_id;
    const accessToken = user.accessToken;
    const email = user.user.email;
    const body = { gameId, accessToken, email };
    addToCart.mutate(body);
  }

  return (
    <div>
      {status === "success" && (
        <Wrapper>
          <GameImages>
            <Image1>
              <img src={data[0]?.image} alt="" />
            </Image1>
            <Image2>
              <img src={data[1]?.image} alt="" />
            </Image2>
            <Image3>
              <img src={data[2]?.image} alt="" />
            </Image3>
            <Image4>
              <img src={data[3]?.image} alt="" />
            </Image4>
          </GameImages>
          <GameDetails>
            <GameInfo>
              <GameTitle>{data[0]?.title}</GameTitle>
              Details
              <GameDescription>{data[0]?.description}</GameDescription>
            </GameInfo>
            <AddToCart>
              <GameTitle>{data[0]?.title}</GameTitle>
              <GamePrice>${data[0]?.price}</GamePrice>
              <select name="" id=""></select>
              <AddToCartButton onClick={handleCartChange}>
                Add to Cart
              </AddToCartButton>
            </AddToCart>
          </GameDetails>
        </Wrapper>
      )}
    </div>
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
  display: flex;

  @media (max-width: 1100px) {
    flex-direction: column-reverse;
  }
`;

const GameInfo = styled.div`
  //   border: 2px solid chartreuse;
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
  //   border: 2px solid blue;
  flex: 1;

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
  margin-bottom: 35px;

  @media (max-width: 1100px) {
    font-size: 1.2rem;
  }
`;

const AddToCartButton = styled.button`
  border: none;
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

export default Product;
