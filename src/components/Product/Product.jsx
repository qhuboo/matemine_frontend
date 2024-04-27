import styled from "styled-components";
import { cart_data } from "../../data";

function Product() {
  return (
    <Wrapper>
      <GameImages>
        <Image1>
          <img
            src="https://cdn.mobygames.com/screenshots/4170929-star-wars-episode-i-racer-windows-pick-a-pod-and-no-i-will-not-m.png"
            alt=""
          />
        </Image1>
        <Image2>
          <img
            src="https://cdn.mobygames.com/screenshots/10864635-star-wars-episode-i-racer-windows-they-come-in-here-they-look-ar.png"
            alt=""
          />
        </Image2>
        <Image3>
          <img
            src="https://cdn.mobygames.com/screenshots/10869612-star-wars-episode-i-racer-windows-snow-tunnel.png"
            alt=""
          />
        </Image3>
        <Image4>
          <img
            src="https://cdn.mobygames.com/screenshots/10418988-star-wars-episode-i-racer-dreamcast-tatooine-finish.jpg"
            alt=""
          />
        </Image4>
      </GameImages>
      <GameDetails>
        <GameInfo>
          <GameTitle>{cart_data[0].title}</GameTitle>
          Details
          <GameDescription>{cart_data[0].description}</GameDescription>
        </GameInfo>
        <AddToCart>
          <GameTitle>{cart_data[0].title}</GameTitle>
          <GamePrice>${cart_data[0].price}</GamePrice>
          <AddToCartButton>Add to Cart</AddToCartButton>
        </AddToCart>
      </GameDetails>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  //   border: 2px solid springgreen;
  padding: 30px 15px 0;
  display: flex;
  flex-direction: column;
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
